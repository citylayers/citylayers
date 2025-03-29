"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GRAPH_KEYS = exports.QUERYS = exports.DBConnection = void 0;
var dotenv_1 = require("dotenv");
var neo4j_driver_1 = require("neo4j-driver");
if (process.env["NEO4J_URI"] == undefined) {
    (0, dotenv_1.configDotenv)({ path: ".env" });
}
var URI = process.env["NEO4J_URI"];
var USER = process.env["NEO4J_USER"];
var PASSWORD = process.env["NEO4J_PWD"];

var MODE = {
    READ: 0,
    WRITE: 1
};
var GRAPH_KEYS = {
    ANSWER: "answer",
    ANSWER1: "answer1",
    CATEGORY: "category",
    CHOICE: "choice",
    CONFIG: "c",
    CONTENT: "content",
    ID: "id",
    ILLUSTRATION: "illustration",
    LAT: "lat",
    LON: "lon",
    NODE: "node",
    OBSERVATION: "obs",
    PARTNER: "partner",
    PLACE: "place",
    PREV: "prev",
    PROJECT: "p",
    RECOGNITION: "recognition",
    RESULT: "result",
    ROLE: "r",
    QUESTION: "question",
    QUESTION1: "question1",
    STEP: "step",
    TEAMMEMBER: "t"
};
exports.GRAPH_KEYS = GRAPH_KEYS;
var QUERYS = {
    OBSERVATIONS: "match (p:Place)<-[r:REGISTERED]-(o:Observation)-[:EVALUATES]->(a:Answer)<-[:ISANSWERED]-()\n                    <-[:ASKS]-(c:Config)<-[]-(pr:Project {name: \"Mobility Dashboard\"}) \n                    return {content: {obs: o, obs_id: elementId(o), place_id: elementId(p), place:p}};",
    OBS: "match (p:Place)<-[]-(o:Observation)-[:EVALUATES]->(a:Answer)<-[]-()<-[]-(c:Config)<-[]-(pr:Project {name: $name}) \n            with collect(p) as places, collect(elementId(o)) as obs\n            match (p)<-[:REGISTERED]-(o:Observation)-[e:EVALUATES]->(a:Answer) where elementId(o) in obs\n            with p, o, collect({id: elementId(a), value: e.value}) as answers\n            return { ".concat(GRAPH_KEYS.LON, ": p.lon, ").concat(GRAPH_KEYS.LAT, ": p.lat, ").concat(GRAPH_KEYS.ID, ": elementId(p), \n            ").concat(GRAPH_KEYS.OBSERVATION, ": elementId(o), ").concat(GRAPH_KEYS.ANSWER, ": answers } AS ").concat(GRAPH_KEYS.RESULT),
    SUBMIT: "MERGE (place: Place {lon: $lon, lat: $lat})<-[:REGISTERED]-(o:Observation {date: datetime()})",
    SUBMIT_BETA: "WITH $data AS data \n            UNWIND data AS obs\n            MATCH (n) \n            WHERE elementId(n) = obs.id \n            MERGE (p: Place {lat: $lat, lon: $lon})\n            MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})<-[:ILLUSTRATED]-(img: Illustration {name: $image}) \n            CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs",
    SUBMIT_NO_IMAGE: "WITH $data AS data \n            UNWIND data AS obs\n            MATCH (n) \n            WHERE elementId(n) = obs.id \n            MERGE (p: Place {lat: $lat, lon: $lon})\n            MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})\n            CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs",
    ID_QUESTION: "MATCH (".concat(GRAPH_KEYS.NODE, ") WHERE elementId(").concat(GRAPH_KEYS.NODE, ") = $name RETURN ").concat(GRAPH_KEYS.NODE),
    PROJECTS: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project) RETURN ").concat(GRAPH_KEYS.PROJECT),
    PROJECT_NAME: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name}) RETURN ").concat(GRAPH_KEYS.PROJECT),
    PROJECT_TEAM: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})<-[:WORKEDON]-(").concat(GRAPH_KEYS.TEAMMEMBER, ":TeamMember)-[rel:AS]->(").concat(GRAPH_KEYS.ROLE, ":Role) return ").concat(GRAPH_KEYS.TEAMMEMBER, ", rel, ").concat(GRAPH_KEYS.ROLE),
    PROJECT_RECOGNITION: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})-[:HAS]->                        (").concat(GRAPH_KEYS.RECOGNITION, ":Recognition)<-[rel:RECOGNIZED]-(").concat(GRAPH_KEYS.PARTNER, ":Partner)                         return ").concat(GRAPH_KEYS.RECOGNITION, ", rel, ").concat(GRAPH_KEYS.PARTNER),
    PROJECT_PARTNERS: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})<-[:SUPPORTS]-                        (").concat(GRAPH_KEYS.PARTNER, ":Partner) return ").concat(GRAPH_KEYS.PARTNER),
    PROJECT_ILLUSTRATIONS: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})<-[:ILLUSTRATED]-                            (").concat(GRAPH_KEYS.ILLUSTRATION, ":Illustration) return ").concat(GRAPH_KEYS.ILLUSTRATION),
    CONFIG_QUESTIONS_HL: "MATCH (".concat(GRAPH_KEYS.PROJECT, ": Project {name : $name})-[:ISSET]->(").concat(GRAPH_KEYS.CONFIG, ":Config)-[").concat(GRAPH_KEYS.STEP, ":ASKS]->\n                         (").concat(GRAPH_KEYS.QUESTION, ":Question)-[ans:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)\n                            return ").concat(GRAPH_KEYS.STEP, ", ").concat(GRAPH_KEYS.QUESTION, ", ").concat(GRAPH_KEYS.ANSWER),
    CONFIG_QUESTIONS: "MATCH (".concat(GRAPH_KEYS.PROJECT, ": Project {name : $name})-[:ISSET]->(").concat(GRAPH_KEYS.CONFIG, ":Config)-[").concat(GRAPH_KEYS.STEP, ":ASKS]                    ->(").concat(GRAPH_KEYS.QUESTION, ":Question)-[ans:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)-                    [fb:FOLLOWEDBY]->(").concat(GRAPH_KEYS.QUESTION1, ":Question)-[ans1:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER1, ":Answer)                    -[:TOCHOOSE]->(").concat(GRAPH_KEYS.CHOICE, ":Answer)\n                    return ").concat(GRAPH_KEYS.STEP, ", ").concat(GRAPH_KEYS.QUESTION, ", ").concat(GRAPH_KEYS.ANSWER, ",                     fb, ").concat(GRAPH_KEYS.QUESTION1, ", ans1, ").concat(GRAPH_KEYS.ANSWER1, ", ").concat(GRAPH_KEYS.CHOICE),
    QUESTION_ANSWERS: "MATCH (".concat(GRAPH_KEYS.QUESTION, ":Question {value: $question})-[ans:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)-                    [fb:FOLLOWEDBY]->(").concat(GRAPH_KEYS.QUESTION1, ":Question)-[ans1:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER1, ":Answer)                    -[:TOCHOOSE]->(").concat(GRAPH_KEYS.CHOICE, ":Answer)\n                    return ").concat(GRAPH_KEYS.STEP, ", ").concat(GRAPH_KEYS.QUESTION, ", ").concat(GRAPH_KEYS.ANSWER, ",                     fb, ").concat(GRAPH_KEYS.QUESTION1, ", ans1, ").concat(GRAPH_KEYS.ANSWER1, ", ").concat(GRAPH_KEYS.CHOICE),
    FOLLOWUP_QUESTIONS: "MATCH (".concat(GRAPH_KEYS.PROJECT, ": Project {name : $name})-[:ISSET]->(").concat(GRAPH_KEYS.CONFIG, ":Config)\n                    -[").concat(GRAPH_KEYS.STEP, ":ASKS]->(q:Question)-[ans:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)                    -[:FOLLOWEDBY]->(").concat(GRAPH_KEYS.QUESTION, ":Question)-[:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER1, ":Answer)                    -[]->(").concat(GRAPH_KEYS.CHOICE, ")\n                    return ").concat(GRAPH_KEYS.STEP, ", ").concat(GRAPH_KEYS.ANSWER, ", ").concat(GRAPH_KEYS.QUESTION, ", \n                        ").concat(GRAPH_KEYS.ANSWER1, ", ").concat(GRAPH_KEYS.CHOICE),
    Q_TREE: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})-[:ISSET]->(").concat(GRAPH_KEYS.CONFIG, ":Config)-            [").concat(GRAPH_KEYS.STEP, ":ASKS]->()             ((").concat(GRAPH_KEYS.QUESTION, ":Question)-[r1]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)){1,5}(()-[r3]->(").concat(GRAPH_KEYS.CHOICE, ")){0,10}              return ").concat(GRAPH_KEYS.STEP, ",  q1, r1, a1, r3, s"),
    Q1: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project {name : $name})-[:ISSET]->(").concat(GRAPH_KEYS.CONFIG, ":Config)-            [").concat(GRAPH_KEYS.STEP, ":ASKS]->(").concat(GRAPH_KEYS.QUESTION, ":Question)-[:ISANSWERED]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)\n                RETURN \n                CASE \n                WHEN ").concat(GRAPH_KEYS.ANSWER, ".atype=\"range\" THEN { ").concat(GRAPH_KEYS.CATEGORY, ": ").concat(GRAPH_KEYS.STEP, ".name, ").concat(GRAPH_KEYS.STEP, ": ").concat(GRAPH_KEYS.STEP, ".step,                 content: {").concat(GRAPH_KEYS.QUESTION, ": {").concat(GRAPH_KEYS.ID, ": elementId(").concat(GRAPH_KEYS.QUESTION, "), help: ").concat(GRAPH_KEYS.QUESTION, ".help, value:").concat(GRAPH_KEYS.QUESTION, ".value}, \n                                        ").concat(GRAPH_KEYS.ANSWER, ": {id: elementId(").concat(GRAPH_KEYS.ANSWER, "), atype: ").concat(GRAPH_KEYS.ANSWER, ".atype, \n                                        value: {min: ").concat(GRAPH_KEYS.ANSWER, ".min, max: ").concat(GRAPH_KEYS.ANSWER, ".max}, \n                                        label: {min: ").concat(GRAPH_KEYS.ANSWER, ".minlabel, max: ").concat(GRAPH_KEYS.ANSWER, ".maxlabel}} } }\n                WHEN ").concat(GRAPH_KEYS.ANSWER, ".atype=\"multicategory\" THEN { ").concat(GRAPH_KEYS.CATEGORY, ": ").concat(GRAPH_KEYS.STEP, ".name, ").concat(GRAPH_KEYS.STEP, ": ").concat(GRAPH_KEYS.STEP, ".step,\n                ").concat(GRAPH_KEYS.CONTENT, ": {").concat(GRAPH_KEYS.QUESTION, ": {id: elementId(").concat(GRAPH_KEYS.QUESTION, "), help: ").concat(GRAPH_KEYS.QUESTION, ".help, value:").concat(GRAPH_KEYS.QUESTION, ".value}, \n                        ").concat(GRAPH_KEYS.ANSWER, ": {id: elementId(").concat(GRAPH_KEYS.ANSWER, "), atype: ").concat(GRAPH_KEYS.ANSWER, ".atype, \n                        content: COLLECT {\n                                    MATCH (").concat(GRAPH_KEYS.ANSWER, ":Answer)-[r]->(child:Answer)\n                                        return {atype: child.atype, name: child.name}\n                                }\n                } } }\n                ELSE { ").concat(GRAPH_KEYS.CATEGORY, ": ").concat(GRAPH_KEYS.STEP, ".name, ").concat(GRAPH_KEYS.STEP, ": ").concat(GRAPH_KEYS.STEP, ".step, content: {").concat(GRAPH_KEYS.QUESTION, ": {").concat(GRAPH_KEYS.ID, ": elementId(").concat(GRAPH_KEYS.QUESTION, "), help: ").concat(GRAPH_KEYS.QUESTION, ".help, value:").concat(GRAPH_KEYS.QUESTION, ".value}, \n                                        ").concat(GRAPH_KEYS.ANSWER, ": {id: elementId(").concat(GRAPH_KEYS.ANSWER, "), atype: ").concat(GRAPH_KEYS.ANSWER, ".atype} } }\n                END AS ").concat(GRAPH_KEYS.RESULT, "\n                order by ").concat(GRAPH_KEYS.STEP, ".step"),
    Q2: "MATCH (a:Answer)-[r:FOLLOWEDBY]->(q:Question)-[:ISANSWERED]->(".concat(GRAPH_KEYS.ANSWER1, ": Answer)\n        where elementId(a) in [$ids]\n        with collect(").concat(GRAPH_KEYS.ANSWER1, ") as answers, ").concat(GRAPH_KEYS.ANSWER1, " as ").concat(GRAPH_KEYS.ANSWER1, ", q as q, a as a\n\n        return {").concat(GRAPH_KEYS.PREV, ": elementId(a), \n                ").concat(GRAPH_KEYS.CONTENT, ": {\n                        ").concat(GRAPH_KEYS.QUESTION, ": {\n                                ").concat(GRAPH_KEYS.ID, ": elementId(q), \n                                help: q.help, \n                                value: q.value\n                            }, \n                        ").concat(GRAPH_KEYS.ANSWER, ": {\n                            ").concat(GRAPH_KEYS.ID, ": elementId(").concat(GRAPH_KEYS.ANSWER1, "),\n                            atype: ").concat(GRAPH_KEYS.ANSWER1, ".atype, \n                            value: {min: ").concat(GRAPH_KEYS.ANSWER1, ".min, max: ").concat(GRAPH_KEYS.ANSWER1, ".max}, \n                            label: {min: ").concat(GRAPH_KEYS.ANSWER1, ".minlabel, max: ").concat(GRAPH_KEYS.ANSWER1, ".maxlabel},\n                            ").concat(GRAPH_KEYS.CONTENT, ": COLLECT {\n                                    MATCH (a2:Answer)-[r]->(child:Answer)\n                                        where a2 in answers\n                                        return {").concat(GRAPH_KEYS.ID, ": elementId(child), atype: child.atype, name: child.name}\n                }\n}}\n        } as ").concat(GRAPH_KEYS.RESULT),
    QUESTION_TREES: "MATCH (p:Project)-[:ISSET]->(c:Config)-[".concat(GRAPH_KEYS.STEP, ":ASKS]->()                        ((").concat(GRAPH_KEYS.QUESTION, ":Question)-[]->(").concat(GRAPH_KEYS.ANSWER, ":Answer)){1,5}(()-[]->(").concat(GRAPH_KEYS.CHOICE, ")){0,100}                         return ").concat(GRAPH_KEYS.STEP, ", ").concat(GRAPH_KEYS.QUESTION, ", ").concat(GRAPH_KEYS.ANSWER, ", ").concat(GRAPH_KEYS.CHOICE),
    TEAM: "MATCH (".concat(GRAPH_KEYS.TEAMMEMBER, ":TeamMember) RETURN ").concat(GRAPH_KEYS.TEAMMEMBER),
    TEAM_PROJECT: "MATCH (".concat(GRAPH_KEYS.PROJECT, ":Project)<-[w:WORKEDON]-(").concat(GRAPH_KEYS.TEAMMEMBER, ":TeamMember)                    -[rel:AS]->(").concat(GRAPH_KEYS.ROLE, ":Role)<-[:EMPLOYED]-(p:Project)                     return ").concat(GRAPH_KEYS.PROJECT, ", w, ").concat(GRAPH_KEYS.TEAMMEMBER, ", rel, ").concat(GRAPH_KEYS.ROLE)
};
exports.QUERYS = QUERYS;
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        this.driver = undefined;
        this.session = undefined;
    }
    DBConnection.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serverInfo, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(URI, USER, PASSWORD);
                        if (!(this.driver == undefined)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.driver = neo4j_driver_1["default"].driver(URI, neo4j_driver_1["default"].auth.basic(USER, PASSWORD), { disableLosslessIntegers: true });
                        return [4 /*yield*/, this.driver.getServerInfo()];
                    case 2:
                        serverInfo = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Connection error\n".concat(err_1, "\nCause: ").concat(err_1.cause));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DBConnection.prototype.initSession = function (mode) {
        if (mode === void 0) { mode = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.init().then(function (k) {
                        return _this.session = mode == MODE.WRITE ? _this.driver.session({ defaultAccessMode: neo4j_driver_1["default"].session.WRITE }) : _this.driver.session({ defaultAccessMode: neo4j_driver_1["default"].session.READ });
                    })];
            });
        });
    };
    DBConnection.prototype.read = function (query, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.initSession(MODE.READ).then(function (k) {
                        return _this.session.run(query, param, { timeout: 3000 })
                            .then(function (result) {
                            _this.reset();
                            return result;
                        });
                    })];
            });
        });
    };
    DBConnection.prototype.reset = function () {
        if (this.session != undefined) {
            this.session.close();
            this.session = undefined;
        }
    };
    DBConnection.prototype.write = function (query, param) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                /*
                'MERGE (james:Person {name : $nameParam}) RETURN james.name AS name', {
                            nameParam: 'James'
                        }
                 */
                this.reset();
                return [2 /*return*/, this.initSession(MODE.WRITE).then(function (k) {
                        return _this.session.run(query, param, { timeout: 3000 }).then(function (result) {
                            _this.reset();
                            return result;
                        });
                    })];
            });
        });
    };
    return DBConnection;
}());
exports.DBConnection = DBConnection;
