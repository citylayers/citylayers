import express from 'express';
import {config, configDotenv} from 'dotenv';
import neo4j, { DateTime } from 'neo4j-driver';
import path from 'path';
import multer from 'multer';

import { DBConnection, QUERYS, GRAPH_KEYS } from './graph/graph';
import { TeamMember, Role } from '../../logic/teammember';
import { Illustration } from '../../logic/illustration';
import { Partner } from '../../logic/partner';
import { ProjectRecognition, ProjectInfo, ProjectPeriod } from '../../logic/projectInfo';
import { Config } from '../../logic/config';
import {Project} from '../../logic/project';
import { QAPair, QASet } from '../../logic/question/question';
import * as fs from 'node:fs';
// import { TeamPanel } from '../ui/panel/teamPanel';


configDotenv({path:".env"});
const app = express();
const port = process.env["PORT"] || 3000;
const domain = process.env["DOMAIN"] || "localhost"; 

app.use(express.static(path.join(__dirname, '../../../public')));
app.use(express.static(path.join(__dirname, '../../../public/uploads')));
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../../public/html'));

const fileFilter = (req, file, cb) => {
    const filetypes = /.png|.jpg|.jpeg/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  
    if (extname) {
      return cb(null, true);
    } else {
      cb('Error: format is not supported!');
    }
  };
// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name clashes
    },
    
  });
  
const upload = multer({ storage, fileFilter });
  
  
const uploadsDir = path.join(__dirname, '../../../public/uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}
  
// Set up a route to handle form submissions
app.post('/upload', upload.single('image'), (req, res) => {
    res.send({"content": req.file.filename});
});


const db = new DBConnection();
db.init();


app.get('/', (req, res) => {
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
            return res.render('landing', {data: projectInfos.map(pinfo=>{
                return new Project(pinfo, undefined)
            }), title: "CityLayers"});
            
        }
    )
    
});

app.get('/accessibility', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('accessibility');

});

app.get('/accessibility1', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('layout', {module: "accessibility"});

});

app.get('/privacy', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('privacy');

});

app.get('/impressum', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('impressum');

});

app.get('/success', (req, res) => {

    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('postSuccess');

});


app.get("/team", (req, res) =>{
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
                return res.render('team', {data: team});
            });
});

app.get("/getprojects", (req, res) => {
    
    db.read(
        `
          MATCH (p:Project)
          RETURN p, p.name
        `, {}
      ).then(r=>res.send(r));
    }
);

app.get("/project/team/:project", (req, res) => {
    let project = req.params.project;
    let team = [];
    db.read(QUERYS.PROJECT_TEAM,  {name: project.replaceAll("%20", " ")})
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

app.get("/project/illustrations/:project", (req, res) => {
    let project = req.params.project;
    let projectImages = [];
    db.read(QUERYS.PROJECT_ILLUSTRATIONS, {name: project.replaceAll("%20", " ")})
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

app.get("/project/partners/:project", (req, res) => {
    let project = req.params.project;
    let partners = [];
    db.read(QUERYS.PROJECT_PARTNERS, {name: project.replaceAll("%20", " ")})
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

app.get("/project/recognitions/:project", (req, res) => {
    let project = req.params.project;
    let awards = [];
    db.read(QUERYS.PROJECT_RECOGNITION, {name: project.replaceAll("%20", " ")})
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

app.get("/project/projectinfo/:project", (req, res) => {
    let project = req.params.project;
    
    db.read(QUERYS.PROJECT_NAME, {name: project.replaceAll("%20", " ")})
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

app.get("/project/:project", (req, res) => {
    let project = req.params.project;

    let team = [];
    let images = [];
    let awards = [];
    let partners = [];
    let config = new Config("", "", "", []);
    db.read(QUERYS.PROJECT_TEAM,  {name: project.replaceAll("%20", " ")})
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
        return db.read(QUERYS.PROJECT_ILLUSTRATIONS, {"name": project.replaceAll("%20", " ")})
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
            return db.read(QUERYS.PROJECT_RECOGNITION, {name: project.replaceAll("%20", " ")})
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
            return db.read(QUERYS.PROJECT_PARTNERS, {name: project.replaceAll("%20", " ")})
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
            return db.read(QUERYS.PROJECT_NAME, {name: project.replaceAll("%20", " ")})
                .then(r =>{
                let props = r.records[0].get("p").properties;
                let period = new ProjectPeriod(props.start_date, props.end_date);
                let subtitle = props.subtitle;
                let descr = props.description;
                let mappable = props.mappable;
                return new ProjectInfo(project.replaceAll("%20", " "), subtitle, descr, period, mappable,
                    awards, images, partners, team

                );
                    })

        }
    )
    .then(
        pinfo=>{
            let p = new Project(
                pinfo,
                config
                );
            return res.render('projectCard', {data: p, title: project});
            
        }
    )


}
);

app.get("/pin/:project", (req, res) => {
    
    let project = req.params.project;
    db.read(QUERYS.Q1, {"name": project.replaceAll("%20", " ")})
            .then(qs =>{
                
                return qs.records.map(r=>{
                    let q = new QASet(r.get(GRAPH_KEYS.RESULT).step, 
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
            
            res.render('addPin', {data: qas, title: project})
        }
        );
    }
);

app.get("/map/:project", (req, res) => {
    
    let project = req.params.project;
    res.render("map", {project: project});
    }
);

app.post("/submit", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        } 
    else{
        const indata = req.body;
        return db.write(QUERYS.SUBMIT_BETA, {"lat": indata.coords.lat, "lon": indata.coords.lon, "data": indata.data, "image": indata.image})
            .then(obs => {
                return res.render('postSuccess', {data: indata.data})
            }
        );
        }
    }
);

app.get("/sunburst", (req, res)=>{
    return res.render('sunburstResult')
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    // res.header(
    //     'Access-Control-Allow-Headers',
    //     'Origin, X-Requested-With, Content-Type, Accept'
    // );

    next();
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

app.use(function(req,res){
    res.status(404).render('404');
});

app.listen(port, () => {
  return console.log(`🚀 Express is listening at ${domain}:${port}`);
});