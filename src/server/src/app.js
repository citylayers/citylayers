"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var multer_1 = require("multer");
var graph_1 = require("./graph/graph");
var teammember_1 = require("../../logic/teammember");
var illustration_1 = require("../../logic/illustration");
var partner_1 = require("../../logic/partner");
var projectInfo_1 = require("../../logic/projectInfo");
var config_1 = require("../../logic/config");
var project_1 = require("../../logic/project");
var question_1 = require("../../logic/question/question");
var observation_1 = require("../../logic/observation");
var utils_1 = require("./graph/utils");
var fs = require("node:fs");
// import { TeamPanel } from '../ui/panel/teamPanel';
(0, dotenv_1.configDotenv)({ path: ".env" });
var app = (0, express_1["default"])();
var port = process.env["PORT"] || 3000;
var domain = process.env["DOMAIN"] || "localhost";
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../../../public')));
app.use(express_1["default"].static(path_1["default"].join(__dirname, '../../../public/uploads')));
app.use(express_1["default"].json());
app.set('view engine', 'ejs');
app.set('views', path_1["default"].join(__dirname, '../../../public/html'));
var fileFilter = function (req, file, cb) {
    var filetypes = /.png|.jpg|.jpeg/;
    var extname = filetypes.test(path_1["default"].extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    }
    else {
        cb('Error: format is not supported!');
    }
};
// Set up storage for multer
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1["default"].extname(file.originalname)); // Append timestamp to avoid name clashes
    }
});
var upload = (0, multer_1["default"])({ storage: storage, fileFilter: fileFilter });
var uploadsDir = path_1["default"].join(__dirname, '../../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
// Set up a route to handle form submissions
app.post('/upload', upload.single('image'), function (req, res) {
    res.send({ "content": req.file.filename });
});
var db = new graph_1.DBConnection();
db.init();
app.get('/', function (req, res) {
    db.read(graph_1.QUERYS.PROJECTS, {})
        .then(function (r) {
        return r.records.map(function (rec) {
            var props = rec.get("p").properties;
            var name = props.name;
            var period = new projectInfo_1.ProjectPeriod(props.start_date, props.end_date);
            var subtitle = props.subtitle;
            var descr = props.description;
            var mappable = props.mappable;
            return new projectInfo_1.ProjectInfo(name, subtitle, descr, period, mappable, [], [], [], []);
        });
    })
        .then(function (projectInfos) {
        return res.render('landing', { data: projectInfos.map(function (pinfo) {
                return new project_1.Project(pinfo, undefined);
            }), title: "CityLayers" });
    });
});
app.get('/accessibility', function (req, res) {
    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('accessibility');
});
app.get('/privacy', function (req, res) {
    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('privacy');
});
app.get('/impressum', function (req, res) {
    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('impressum');
});
app.get('/success', function (req, res) {
    // The render method takes the name of the HTML
    // page to be rendered as input
    // This page should be in the views folder
    // in the root directory.
    res.render('postSuccess');
});
app.get("/team", function (req, res) {
    var team = [];
    var projects = [];
    db.read(graph_1.QUERYS.TEAM_PROJECT, {})
        .then(function (r) {
        r.records.forEach(function (r) {
            if (!r.get('t').properties.external == true) {
                var name_1 = r.get('t').properties.name;
                var link = r.get('t').properties.link;
                if (team.filter(function (t) { return t.name == name_1; }).length == 0) {
                    team.push(new teammember_1.TeamMember(name_1, link));
                }
                var teamMember = team.filter(function (t) { return t.name == name_1; })[0];
                teamMember.role.push(new teammember_1.Role(r.get('r').properties.value, r.get('p').properties.name));
            }
        });
        return res.render('team', { data: team });
    });
});
app.get("/getprojects", function (req, res) {
    db.read("\n          MATCH (p:Project)\n          RETURN p, p.name\n        ", {}).then(function (r) { return res.send(r); });
});
app.get("/project/team/:project", function (req, res) {
    var project = req.params.project;
    var team = [];
    db.read(graph_1.QUERYS.PROJECT_TEAM, { name: project.replaceAll("%20", " ") })
        // session.run(QUERYS.PROJECT_TEAM.replace("$name", `"${project.replaceAll("%20", " ")}"`))
        .then(function (res) {
        if (res != undefined) {
            res.records.forEach(function (r) {
                var role = r.get('r').properties.value;
                var name = r.get('t').properties.name;
                var link = r.get('t').properties.link;
                team.push(new teammember_1.TeamMember(name, link, role, false));
            });
        }
    }).then(function (r) { return res.send(team); });
});
app.get("/project/illustrations/:project", function (req, res) {
    var project = req.params.project;
    var projectImages = [];
    db.read(graph_1.QUERYS.PROJECT_ILLUSTRATIONS, { name: project.replaceAll("%20", " ") })
        .then(function (res) {
        if (res != undefined) {
            res.records.forEach(function (r) {
                var name = r.get('illustration').properties.name;
                var caption = r.get('illustration').properties.caption;
                projectImages.push(new illustration_1.Illustration(name, "", caption));
            });
        }
    }).then(function (r) { return res.send(projectImages); });
});
app.get("/project/partners/:project", function (req, res) {
    var project = req.params.project;
    var partners = [];
    db.read(graph_1.QUERYS.PROJECT_PARTNERS, { name: project.replaceAll("%20", " ") })
        .then(function (r1) {
        if (r1 != undefined) {
            r1.records.forEach(function (r) {
                var image = r.get('partner').properties.logo;
                var name = r.get('partner').properties.name;
                var link = r.get('partner').properties.link;
                partners.push(new partner_1.Partner(name, image, link));
            });
        }
    }).then(function (r) { return res.send(partners); });
});
app.get("/project/recognitions/:project", function (req, res) {
    var project = req.params.project;
    var awards = [];
    db.read(graph_1.QUERYS.PROJECT_RECOGNITION, { name: project.replaceAll("%20", " ") })
        .then(function (r) {
        if (r != undefined) {
            r.records.forEach(function (r) {
                var partner = r.get('partner').properties.value;
                var recognition = r.get('recognition').properties.name;
                awards.push(new projectInfo_1.ProjectRecognition(recognition, partner));
            });
        }
    }).then(function (r) { return res.send(awards); });
});
app.get("/project/projectinfo/:project", function (req, res) {
    var project = req.params.project;
    db.read(graph_1.QUERYS.PROJECT_NAME, { name: project.replaceAll("%20", " ") })
        .then(function (r) {
        var props = r.records[0].get("p").properties;
        var period = new projectInfo_1.ProjectPeriod(props.start_date, props.end_date);
        var subtitle = props.subtitle;
        var descr = props.description;
        var mappable = props.mappable;
        return new projectInfo_1.ProjectInfo(project, subtitle, descr, period, mappable);
    }).then(function (r) { return res.send(r); });
});
app.get("/project/:project", function (req, res) {
    var project = req.params.project;
    var team = [];
    var images = [];
    var awards = [];
    var partners = [];
    var config = new config_1.Config("", "", "", []);
    db.read(graph_1.QUERYS.PROJECT_TEAM, { name: project.replaceAll("%20", " ") })
        // session.run(QUERYS.PROJECT_TEAM.replace("$name", `"${project.replaceAll("%20", " ")}"`))
        .then(function (r1) {
        if (r1 != undefined) {
            r1.records.forEach(function (r) {
                var role = r.get('r').properties.value;
                var name = r.get('t').properties.name;
                var link = r.get('t').properties.link;
                team.push(new teammember_1.TeamMember(name, link, role, false));
            });
        }
        return r1;
    })
        .then(function (d) {
        return db.read(graph_1.QUERYS.PROJECT_ILLUSTRATIONS, { "name": project.replaceAll("%20", " ") })
            .then(function (res) {
            res.records.forEach(function (r) {
                var name = r.get('illustration').properties.name;
                var caption = r.get('illustration').properties.caption;
                images.push(new illustration_1.Illustration(name, caption));
            });
        });
    })
        .then(function (d) {
        return db.read(graph_1.QUERYS.PROJECT_RECOGNITION, { name: project.replaceAll("%20", " ") })
            .then(function (r) {
            if (r != undefined) {
                r.records.forEach(function (r) {
                    var partner = r.get('partner').properties.value;
                    var recognition = r.get('recognition').properties.name;
                    awards.push(new projectInfo_1.ProjectRecognition(recognition, partner));
                });
            }
        });
    })
        .then(function (d) {
        return db.read(graph_1.QUERYS.PROJECT_PARTNERS, { name: project.replaceAll("%20", " ") })
            .then(function (r1) {
            if (r1 != undefined) {
                r1.records.forEach(function (r) {
                    var image = r.get('partner').properties.logo;
                    var name = r.get('partner').properties.name;
                    var link = r.get('partner').properties.link;
                    partners.push(new partner_1.Partner(name, image, link));
                });
            }
        });
    })
        .then(function (d) {
        return db.read(graph_1.QUERYS.PROJECT_NAME, { name: project.replaceAll("%20", " ") })
            .then(function (r) {
            var props = r.records[0].get("p").properties;
            var period = new projectInfo_1.ProjectPeriod(props.start_date, props.end_date);
            var subtitle = props.subtitle;
            var descr = props.description;
            var mappable = props.mappable;
            return new projectInfo_1.ProjectInfo(project.replaceAll("%20", " "), subtitle, descr, period, mappable, awards, images, partners, team);
        });
    })
        .then(function (pinfo) {
        var p = new project_1.Project(pinfo, config);
        return res.render('projectCard', { data: p, title: project });
    });
});
app.get("/pin/:project", function (req, res) {
    var project = req.params.project;
    db.read(graph_1.QUERYS.Q1, { "name": project.replaceAll("%20", " ") })
        .then(function (qs) {
        return qs.records.map(function (r) {
            var q = new question_1.QASet(r.get(graph_1.GRAPH_KEYS.RESULT).step, r.get(graph_1.GRAPH_KEYS.RESULT).category, [r.get(graph_1.GRAPH_KEYS.RESULT).content]);
            q.convertContent();
            return q;
        });
    })
        .then(function (qs) {
        return db.read(graph_1.QUERYS.Q2.replace("$ids", __spreadArray([], qs.map(function (r) { return r.content.map(function (qa) { return "\"".concat(qa.answer.id, "\""); })[0]; }), true).toString()), {})
            .then(function (r1) {
            return qs.map(function (qaset) {
                var followup = r1.records.filter(function (r) { return qaset.content.map(function (qapair) { return qapair.answer.id; })
                    .includes(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]); });
                if (followup.length == 0) {
                    return qaset;
                }
                followup.map(function (r) {
                    var q = new question_1.QAPair(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.QUESTION], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.ANSWER], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]);
                    q.convertContent();
                    return q;
                }).forEach(function (q) {
                    qaset.add(q);
                });
                return qaset;
            });
        });
    })
        .then(function (qs) {
        return db.read(graph_1.QUERYS.Q2.replace("$ids", __spreadArray([], qs.filter(function (r) { return r.content.filter(function (qa) { return qa.prev_id != undefined; }).length > 0; })
            .map(function (r) { return r.content.filter(function (qa) { return qa.prev_id != undefined; })
            .map(function (qa) { return qa.answer.getIds().map(function (id) { return "\"".concat(id, "\""); }).toString(); }); }), true).toString()), {})
            .then(function (r1) {
            return qs.map(function (qaset) {
                if (qaset.content.filter(function (qa) { return qa.prev_id != undefined; }).length == 0) {
                    return qaset;
                }
                var followup = r1.records.filter(function (r) { return qaset.content.filter(function (q, i) { return i > 0; }).map(function (qapair) { return qapair.answer.getIds(); })[0]
                    .includes(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]); });
                if (followup.length == 0) {
                    return qaset;
                }
                followup.map(function (r) {
                    var q = new question_1.QAPair(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.QUESTION], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.ANSWER], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]);
                    q.convertContent();
                    return q;
                }).forEach(function (q) {
                    qaset.add(q);
                });
                return qaset;
            });
        });
    })
        .then(function (qas) {
        res.render('addPin', { data: qas, title: project });
    });
});
app.get("/map/:project", function (req, res) {
    var project = req.params.project;
    db.read(graph_1.QUERYS.Q1, { "name": project.replaceAll("%20", " ") })
        .then(function (qs) {
        return qs.records.map(function (r) {
            var q = new question_1.QASet(r.get(graph_1.GRAPH_KEYS.RESULT).step, r.get(graph_1.GRAPH_KEYS.RESULT).category, [r.get(graph_1.GRAPH_KEYS.RESULT).content]);
            q.convertContent();
            return q;
        });
    })
        .then(function (qs) {
        return db.read(graph_1.QUERYS.Q2.replace("$ids", __spreadArray([], qs.map(function (r) { return r.content.map(function (qa) { return "\"".concat(qa.answer.id, "\""); })[0]; }), true).toString()), {})
            .then(function (r1) {
            return qs.map(function (qaset) {
                var followup = r1.records.filter(function (r) { return qaset.content.map(function (qapair) { return qapair.answer.id; })
                    .includes(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]); });
                if (followup.length == 0) {
                    return qaset;
                }
                followup.map(function (r) {
                    var q = new question_1.QAPair(r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.QUESTION], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.CONTENT][graph_1.GRAPH_KEYS.ANSWER], r.get(graph_1.GRAPH_KEYS.RESULT)[graph_1.GRAPH_KEYS.PREV]);
                    q.convertContent();
                    return q;
                }).forEach(function (q) {
                    qaset.add(q);
                });
                return qaset;
            });
        });
    }).then(function (qas) {
        return db.read(graph_1.QUERYS.OBS, { "name": project.replaceAll("%20", " ") })
            .then(function (qs) {
            return qs.records.map(function (r) { return r.get(graph_1.GRAPH_KEYS.RESULT).id; })
                .filter(utils_1["default"])
                .map(function (p) {
                var records = qs.records.filter(function (r) { return r.get(graph_1.GRAPH_KEYS.RESULT).id == p; });
                var record = records[0].get(graph_1.GRAPH_KEYS.RESULT);
                var place = new observation_1.Place(p, record.lat, record.lon);
                var obs = records.map(function (r) { return new observation_1.Observation(r.get(graph_1.GRAPH_KEYS.RESULT).obs, r.get(graph_1.GRAPH_KEYS.RESULT).answer); });
                return new observation_1.Point(place, obs);
            });
        })
            .then(function (obs) {
            return { qas: qas, obs: obs };
        });
    })
        .then(function (d) {
        res.render('karta', { data: d, title: project });
    });
});
app.post("/submit", function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    }
    else {
        var indata = req.body;
        var query = (indata.image != "" && indata.image != undefined && indata.image != null) ? graph_1.QUERYS.SUBMIT_BETA : graph_1.QUERYS.SUBMIT_NO_IMAGE;
        //return 
        db.write(query, { "lat": indata.coords.lat, "lon": indata.coords.lon, "data": indata.data, "image": indata.image });
        //     .then(obs => {
        //         return res.render('postSuccess', {data: indata.data})
        //     }
        // );
        return res.render('postSuccess');
    }
});
app.get("/sunburst", function (req, res) {
    return res.render('sunburstResult');
});
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
app.use(function (req, res) {
    res.status(404).render('404');
});
app.listen(port, function () {
    return console.log("\uD83D\uDE80 Express is listening at ".concat(domain, ":").concat(port));
});
