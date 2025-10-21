import express from 'express';
import path from 'path';
import multer from 'multer';
import * as fs from 'node:fs';

import { DBConnection, QUERYS, GRAPH_KEYS } from './graph/graph';
import { TeamMember, Role } from '../../logic/teammember';
import { Illustration } from '../../logic/illustration';
import { Partner } from '../../logic/partner';
import { ProjectRecognition, ProjectInfo, ProjectPeriod } from '../../logic/projectInfo';
import { Config } from '../../logic/config';
import {Project} from '../../logic/project';
import { QAPair, QASet } from '../../logic/question/question';
import {Place, Answer, Observation, Point} from '../../logic/observation';
import onlyUnique from "./graph/utils";

import { Environment, EnvironmentKey } from './config/Environment';
import { PathConfigFactory, ViewTemplate } from './config/PathConstants';
import { RoutePath, RouteParser } from './config/RouteConstants';
import { FileTypeValidator, FileValidationError } from './constants/FileTypes';
import { HttpStatus, HttpMethod, HttpHeader, CorsValue } from './constants/HttpStatus';

// Initialize environment configuration
const env = Environment.getInstance();
env.init();

// Initialize Express app
const app = express();
const port = env.getNumber(EnvironmentKey.PORT, 3000);
const domain = env.get(EnvironmentKey.DOMAIN, 'localhost');

// Initialize path configuration
const paths = PathConfigFactory.create(__dirname);

console.log('ENV:', env.getMode());

// Configure Express middleware
app.use(express.static(paths.getPublicPath()));
app.use(express.static(paths.getStaticUploadsPath()));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', paths.getViewsPath());

// File upload configuration
const fileFilter = (req, file, cb) => {
    if (FileTypeValidator.isAllowedImageExtension(file.originalname)) {
        return cb(null, true);
    } else {
        cb(FileValidationError.UNSUPPORTED_FORMAT);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, paths.getUploadDestination());
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage, fileFilter });

// Ensure uploads directory exists
const uploadsDir = paths.getUploadsPath();
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
  
// Initialize database connection
const db = new DBConnection();
db.init();

// Routes - File upload
app.post(RoutePath.UPLOAD, upload.single('image'), (req, res) => {
    res.send({"content": req.file.filename});
});

// Routes - Landing page
app.get(RoutePath.ROOT, (req, res) => {
    db.read(QUERYS.PROJECTS, {})
    .then(r =>{
        return r.records.map(rec=>{
            let props = rec.get("p").properties;
            let name = props.name;
            let period = new ProjectPeriod(props.start_date, props.end_date);
            let subtitle = props.subtitle;
            let descr = props.description;
            let mappable = props.mappable;
            return new ProjectInfo(name, subtitle, descr, period, mappable,
                [], [], [], []

            );

        })
        
        })
    .then(
        projectInfos=>{
            return res.render(ViewTemplate.LANDING, {data: projectInfos.map(pinfo=>{
                return new Project(pinfo, undefined)
            }), title: "CityLayers"});

        }
    )

});

// Routes - Static pages
app.get(RoutePath.ACCESSIBILITY, (req, res) => {
    res.render(ViewTemplate.ACCESSIBILITY);
});

app.get(RoutePath.PRIVACY, (req, res) => {
    res.render(ViewTemplate.PRIVACY);
});

app.get(RoutePath.IMPRESSUM, (req, res) => {
    res.render(ViewTemplate.IMPRESSUM);
});

app.get(RoutePath.SUCCESS, (req, res) => {
    res.render(ViewTemplate.POST_SUCCESS);
});


// Routes - Team
app.get(RoutePath.TEAM, (req, res) =>{
    let team = [];
    let projects = [];
    db.read(QUERYS.TEAM_PROJECT, {})
        .then(r =>{        
            r.records.forEach(r => {
                if (!r.get('t').properties.external==true){

                
                    let name = r.get('t').properties.name;
                    let link = r.get('t').properties.link;
                    if (team.filter(t=>t.name==name).length==0){
                        team.push(new TeamMember(name, link));
                    }
                    let teamMember = team.filter(t=>t.name==name)[0];
                    teamMember.role.push(new Role(r.get('r').properties.value,
                                                    r.get('p').properties.name))
                }
            }
                );
                return res.render(ViewTemplate.TEAM, {data: team});
            });
});

// Routes - Projects API
app.get(RoutePath.GET_PROJECTS, (req, res) => {
    
    db.read(
        `
          MATCH (p:Project)
          RETURN p, p.name
        `, {}
      ).then(r=>res.send(r));
    }
);

app.get(RoutePath.PROJECT_TEAM, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);
    let team = [];
    db.read(QUERYS.PROJECT_TEAM,  {name: project})
    // session.run(QUERYS.PROJECT_TEAM.replace("$name", `"${project.replaceAll("%20", " ")}"`))
        .then(res =>{
        if (res!=undefined){        
            res.records.forEach(r => {
                let role = r.get('r').properties.value;
                let name = r.get('t').properties.name;
                let link = r.get('t').properties.link;
                team.push(new TeamMember(name, link, role, false));
            }
            );
        }
        }).then(r=>res.send(team));
    }
);

app.get(RoutePath.PROJECT_ILLUSTRATIONS, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);
    let projectImages = [];
    db.read(QUERYS.PROJECT_ILLUSTRATIONS, {name: project})
            .then(res =>{
                if (res!=undefined){        
                    res.records.forEach(r => {
                let name = r.get('illustration').properties.name;
                let caption = r.get('illustration').properties.caption;
                projectImages.push(new Illustration(name, "", caption));
            }
                );
            }
            }).then(r=>res.send(projectImages));
    }
);

app.get(RoutePath.PROJECT_PARTNERS, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);
    let partners = [];
    db.read(QUERYS.PROJECT_PARTNERS, {name: project})
            .then(r1 =>{
                if (r1!=undefined){        
                    r1.records.forEach(r => {
                let image = r.get('partner').properties.logo;
                let name = r.get('partner').properties.name;
                let link = r.get('partner').properties.link;
                partners.push(new Partner(name, image, link));
            }
                );
            }
            }).then(r=>res.send(partners));
    }
);

app.get(RoutePath.PROJECT_RECOGNITIONS, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);
    let awards = [];
    db.read(QUERYS.PROJECT_RECOGNITION, {name: project})
            .then(r =>{
                if (r!=undefined){        
                    r.records.forEach(r => {
                let partner = r.get('partner').properties.value;
                let recognition = r.get('recognition').properties.name;
                awards.push(new ProjectRecognition(recognition, partner));
            }
                );
            }}).then(r=>res.send(awards));
    }
);

app.get(RoutePath.PROJECT_INFO, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);

    db.read(QUERYS.PROJECT_NAME, {name: project})
        .then(r =>{
        let props = r.records[0].get("p").properties;
        let period = new ProjectPeriod(props.start_date, props.end_date);
        let subtitle = props.subtitle;
        let descr = props.description;
        let mappable = props.mappable;
        return new ProjectInfo(project, subtitle, descr, period, mappable);
            }).then(r=>res.send(r));
    }
);

app.get(RoutePath.PROJECT_DETAIL, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);

    let team = [];
    let images = [];
    let awards = [];
    let partners = [];
    let config = new Config("", "", "", []);
    db.read(QUERYS.PROJECT_TEAM,  {name: project})
    // session.run(QUERYS.PROJECT_TEAM.replace("$name", `"${project.replaceAll("%20", " ")}"`))
        .then(r1 =>{
            
        if (r1!=undefined){        
            r1.records.forEach(r => {
                let role = r.get('r').properties.value;
                let name = r.get('t').properties.name;
                let link = r.get('t').properties.link;
                team.push(new TeamMember(name, link, role, false));
            }
            );
        }
        return r1
    })
    .then(d=>{
        return db.read(QUERYS.PROJECT_ILLUSTRATIONS, {"name": project})
            .then(res =>{
            res.records.forEach(r => {
                let name = r.get('illustration').properties.name;
                let caption = r.get('illustration').properties.caption;
                images.push(new Illustration(name, caption));
            }
                );
    })})
    .then(
        d=>{
            return db.read(QUERYS.PROJECT_RECOGNITION, {name: project})
            .then(r =>{
                if (r!=undefined){        
                    r.records.forEach(r => {
                let partner = r.get('partner').properties.value;
                let recognition = r.get('recognition').properties.name;
                awards.push(new ProjectRecognition(recognition, partner));
            }
                );
            }})

        }
    )
    .then(
        d=>{
            return db.read(QUERYS.PROJECT_PARTNERS, {name: project})
            .then(r1 =>{
                if (r1!=undefined){        
                    r1.records.forEach(r => {
                let image = r.get('partner').properties.logo;
                let name = r.get('partner').properties.name;
                let link = r.get('partner').properties.link;
                partners.push(new Partner(name, image, link));
            }
                );
            }
            })
        }
    )
    .then(
        d=>{
            return db.read(QUERYS.PROJECT_NAME, {name: project})
                .then(r =>{
                let props = r.records[0].get("p").properties;
                let period = new ProjectPeriod(props.start_date, props.end_date);
                let subtitle = props.subtitle;
                let descr = props.description;
                let mappable = props.mappable;
                return new ProjectInfo(project, subtitle, descr, period, mappable,
                    awards, images, partners, team
                );
            })
        }
    )
    .then(
        pinfo=>{
            let p = new Project(pinfo, config);
            return res.render(ViewTemplate.PROJECT_CARD, {data: p, title: project});
        }
    )


}
);

// Routes - Map and Pin
app.get(RoutePath.PIN, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);
    db.read(QUERYS.Q1, {"name": project})
            .then(qs =>{
                
                return qs.records.map(r=>{
                    
                    let q = new QASet(r.get(GRAPH_KEYS.RESULT).step, 
                    r.get(GRAPH_KEYS.RESULT).category, 
                    [r.get(GRAPH_KEYS.RESULT).content]); 
                    q.convertContent(); 
                    return q});
                })
        .then(qs=>{
            return db.read(QUERYS.Q2.replace("$ids", [...qs.map(r=>r.content.map(qa=>`"${qa.answer.id}"`)[0])].toString()), {})
                    .then(r1 =>{
                        
                        return qs.map(qaset=>{
                            let followup = r1.records.filter(r=>qaset.content.map(qapair=>qapair.answer.id)
                                .includes(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]));
                            if (followup.length==0){
                                return qaset;
                            }
                            followup.map(r=>{
                                let q = new QAPair(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.QUESTION],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.ANSWER],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]);
                                q.convertContent();
                                return q;
                            }).forEach(
                                q=>{
                                    qaset.add(q);
                                    
                                }
                            );
                            return qaset;
                        })
                    });
        })
        .then(qs=>{
 
            return db.read(QUERYS.Q2.replace("$ids", [...qs.filter(r=>r.content.filter(qa=>qa.prev_id!=undefined).length>0)
            .map(r=>r.content.filter(qa=>qa.prev_id!=undefined)
                                .map(qa=>qa.answer.getIds().map(id=>`"${id}"`).toString()))].toString()), {})
                    .then(r1 =>{
                        return qs.map(qaset=>{
                            if (qaset.content.filter(qa=>qa.prev_id!=undefined).length==0){
                                return qaset;
                            }
                            let followup = r1.records.filter(r=>qaset.content.filter((q,i)=>i>0).map(qapair=>qapair.answer.getIds())[0]
                                .includes(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]));
                            if (followup.length==0){
                                return qaset;
                            }
                            followup.map(r=>{
                                let q = new QAPair(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.QUESTION],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.ANSWER],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]);
                                q.convertContent();
                                return q;
                            }).forEach(
                                q=>{
                                    qaset.add(q);
                                }
                            );

                            return qaset;
                        })
                    });
        })
        .then(qas => {
            res.render(ViewTemplate.ADD_PIN, {data: qas, title: project})
        });
    }
);

app.get(RoutePath.MAP, (req, res) => {
    let project = RouteParser.decodeProjectName(req.params.project);

    db.read(QUERYS.Q1, {"name": project})
            .then(qs =>{
                
                return qs.records.map(r=>{
                    let q = new QASet(r.get(GRAPH_KEYS.RESULT).step,
                    r.get(GRAPH_KEYS.RESULT).category, 
                    [r.get(GRAPH_KEYS.RESULT).content]); 
                    q.convertContent(); 
                    return q});
                })
        .then(qs=>{
            
            return db.read(QUERYS.Q2.replace("$ids", [...qs.map(r=>r.content.map(qa=>`"${qa.answer.id}"`)[0])].toString()), {})
                    .then(r1 =>{
                        return qs.map(qaset=>{
                            let followup = r1.records.filter(r=>qaset.content.map(qapair=>qapair.answer.id)
                                .includes(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]));
                            if (followup.length==0){
                                return qaset;
                            }
                            followup.map(r=>{
                                let q = new QAPair(r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.QUESTION],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.CONTENT][GRAPH_KEYS.ANSWER],
                                                   r.get(GRAPH_KEYS.RESULT)[GRAPH_KEYS.PREV]);
                                q.convertContent();
                                return q;
                            }).forEach(
                                q=>{
                                    qaset.add(q);
                                    
                                }
                            );
                            return qaset;
                        })
                    });
        }).then(qas=>{
            return db.read(QUERYS.OBS, {"name": project})
            .then(qs =>{     
                return qs.records.map(r=>r.get(GRAPH_KEYS.RESULT).id)
                                 .filter(onlyUnique)
                                 .map(p=>{
                                        let records =  qs.records.filter(r=>r.get(GRAPH_KEYS.RESULT).id==p);
                                        let record = records[0].get(GRAPH_KEYS.RESULT);
                                        let place = new Place(p, record.lat, record.lon);
                                        let obs = records.map(r=>{return new Observation(r.get(GRAPH_KEYS.RESULT).obs, r.get(GRAPH_KEYS.RESULT).answer)});
                                        return new Point(place, obs);
                                    });
                })
            .then(obs=>{
                return {qas:qas, obs:obs}
            })
        })
        .then(d => {
            res.render(ViewTemplate.KARTA, {data: d, title: project})
        })
    }
);

// Routes - Data submission
app.post(RoutePath.SUBMIT, (req, res) => {
    res.set(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, CorsValue.ALLOW_ALL_ORIGINS);

    if (req.method === HttpMethod.OPTIONS) {
        res.set(HttpHeader.ACCESS_CONTROL_ALLOW_METHODS, HttpMethod.POST);
        res.set(HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS, HttpHeader.CONTENT_TYPE);
        res.set(HttpHeader.ACCESS_CONTROL_MAX_AGE, CorsValue.MAX_AGE_ONE_HOUR);
        res.status(HttpStatus.NO_CONTENT).send('');
    } else{
        const indata = req.body;
        let query = (indata.image!="" && indata.image!=undefined && indata.image!=null)? QUERYS.SUBMIT_BETA: QUERYS.SUBMIT_NO_IMAGE;
        
        console.log("Query:", query);
        console.log("Data:", indata);
        //return 
        let r = db.write(query, {"lat": indata.coords.lat, "lon": indata.coords.lon, "data": indata.data, "image": indata.image});
        console.log("Result:", r);
        //     .then(obs => {
        return res.render(ViewTemplate.POST_SUCCESS);
    }
});

// Routes - Visualization
app.get(RoutePath.SUNBURST, (req, res)=>{
    return res.render(ViewTemplate.SUNBURST_RESULT)
})

// Middleware - CORS
app.use(function (req, res, next) {
    res.header(HttpHeader.ACCESS_CONTROL_ALLOW_ORIGIN, CorsValue.ALLOW_ALL_ORIGINS);
    res.header(HttpHeader.ACCESS_CONTROL_ALLOW_HEADERS, CorsValue.ALLOW_ALL_ORIGINS);
    res.header(HttpHeader.ACCESS_CONTROL_ALLOW_METHODS, CorsValue.ALLOW_ALL_ORIGINS);
    next();
});

// Routes - Robots and 404
app.get(RoutePath.ROBOTS, function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.use(function(req,res){
    res.status(HttpStatus.NOT_FOUND).render(ViewTemplate.NOT_FOUND);
});

app.listen(port, () => {
  return console.log(`🚀 Express is listening at ${domain}:${port}`);
});