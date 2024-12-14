
import neo4j from 'neo4j-driver';
import {Driver, Session, QueryResult, RecordShape} from 'neo4j-driver';

const URI = process.env.NEO4J_URI; 
const USER = process.env.NEO4J_USER; 
const PASSWORD = process.env.NEO4J_PWD; 

const MODE = {
    READ: 0,
    WRITE: 1,
}

const GRAPH_KEYS = {
    ANSWER: "answer",
    ANSWER1: "answer1",
    CATEGORY: "category",
    CHOICE: "choice",
    CONFIG: "c",
    CONTENT: "content",
    ID: "id",
    ILLUSTRATION: "illustration",
    NODE: "node",
    PARTNER: "partner",
    PREV: "prev",
    PROJECT: "p",
    RECOGNITION: "recognition",
    RESULT: "result",
    ROLE: "r",
    QUESTION: "question",
    QUESTION1: "question1",
    STEP: "step",
    TEAMMEMBER: "t",
}

const QUERYS = {
    OBSERVATIONS: `match (p: Place)<-[r:REGISTERED]-(o:Observation)-
                    [e:EVALUATES]->(a:Answer)(()<-[]-()){0,4}(:Question)-
                    [s]-()-[]-(pr:Project {name: $name}) return p,o;`,
    SUBMIT: `MERGE (place: Place {lon: $lon, lat: $lat})<-[:REGISTERED]-(o:Observation {date: datetime()})`,
    SUBMIT_BETA: `WITH $data AS data 
            UNWIND data AS obs
            MATCH (n) 
            WHERE elementId(n) = obs.id 
            MERGE (p: Place {lat: $lat, lon: $lon})
            MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})<-[:ILLUSTRATED]-(img: Illustration {name: $image}) 
            CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs`,
    SUBMIT_NO_IMAGE: `WITH $data AS data 
            UNWIND data AS obs
            MATCH (n) 
            WHERE elementId(n) = obs.id 
            MERGE (p: Place {lat: $lat, lon: $lon})
            MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})
            CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs`,
    ID_QUESTION: `MATCH (${GRAPH_KEYS.NODE}) WHERE elementId(${GRAPH_KEYS.NODE}) = $name RETURN ${GRAPH_KEYS.NODE}`,
    PROJECTS: `MATCH (${GRAPH_KEYS.PROJECT}:Project) RETURN ${GRAPH_KEYS.PROJECT}`,
    PROJECT_NAME: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name}) RETURN ${GRAPH_KEYS.PROJECT}`,
    PROJECT_TEAM: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})<-[:WORKEDON]-(${GRAPH_KEYS.TEAMMEMBER}:TeamMember)-[rel:AS]->(${GRAPH_KEYS.ROLE}:Role) return ${GRAPH_KEYS.TEAMMEMBER}, rel, ${GRAPH_KEYS.ROLE}`,
    PROJECT_RECOGNITION: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})-[:HAS]->\
                        (${GRAPH_KEYS.RECOGNITION}:Recognition)<-[rel:RECOGNIZED]-(${GRAPH_KEYS.PARTNER}:Partner)\
                         return ${GRAPH_KEYS.RECOGNITION}, rel, ${GRAPH_KEYS.PARTNER}`,
    PROJECT_PARTNERS: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})<-[:SUPPORTS]-\
                        (${GRAPH_KEYS.PARTNER}:Partner) return ${GRAPH_KEYS.PARTNER}`,
    PROJECT_ILLUSTRATIONS: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})<-[:ILLUSTRATED]-\
                            (${GRAPH_KEYS.ILLUSTRATION}:Illustration) return ${GRAPH_KEYS.ILLUSTRATION}`,

    CONFIG_QUESTIONS_HL: `MATCH (${GRAPH_KEYS.PROJECT}: Project {name : $name})-[:ISSET]->(${GRAPH_KEYS.CONFIG}:Config)-[${GRAPH_KEYS.STEP}:ASKS]->
                         (${GRAPH_KEYS.QUESTION}:Question)-[ans:ISANSWERED]->(${GRAPH_KEYS.ANSWER}:Answer)
                            return ${GRAPH_KEYS.STEP}, ${GRAPH_KEYS.QUESTION}, ${GRAPH_KEYS.ANSWER}`,

    CONFIG_QUESTIONS: `MATCH (${GRAPH_KEYS.PROJECT}: Project {name : $name})-[:ISSET]->(${GRAPH_KEYS.CONFIG}:Config)-[${GRAPH_KEYS.STEP}:ASKS]\
                    ->(${GRAPH_KEYS.QUESTION}:Question)-[ans:ISANSWERED]->(${GRAPH_KEYS.ANSWER}:Answer)-\
                    [fb:FOLLOWEDBY]->(${GRAPH_KEYS.QUESTION1}:Question)-[ans1:ISANSWERED]->(${GRAPH_KEYS.ANSWER1}:Answer)\
                    -[:TOCHOOSE]->(${GRAPH_KEYS.CHOICE}:Answer)
                    return ${GRAPH_KEYS.STEP}, ${GRAPH_KEYS.QUESTION}, ${GRAPH_KEYS.ANSWER}, \
                    fb, ${GRAPH_KEYS.QUESTION1}, ans1, ${GRAPH_KEYS.ANSWER1}, ${GRAPH_KEYS.CHOICE}`,

    QUESTION_ANSWERS: `MATCH (${GRAPH_KEYS.QUESTION}:Question {value: $question})-[ans:ISANSWERED]->(${GRAPH_KEYS.ANSWER}:Answer)-\
                    [fb:FOLLOWEDBY]->(${GRAPH_KEYS.QUESTION1}:Question)-[ans1:ISANSWERED]->(${GRAPH_KEYS.ANSWER1}:Answer)\
                    -[:TOCHOOSE]->(${GRAPH_KEYS.CHOICE}:Answer)
                    return ${GRAPH_KEYS.STEP}, ${GRAPH_KEYS.QUESTION}, ${GRAPH_KEYS.ANSWER}, \
                    fb, ${GRAPH_KEYS.QUESTION1}, ans1, ${GRAPH_KEYS.ANSWER1}, ${GRAPH_KEYS.CHOICE}`,

    FOLLOWUP_QUESTIONS: `MATCH (${GRAPH_KEYS.PROJECT}: Project {name : $name})-[:ISSET]->(${GRAPH_KEYS.CONFIG}:Config)
                    -[${GRAPH_KEYS.STEP}:ASKS]->(q:Question)-[ans:ISANSWERED]->(${GRAPH_KEYS.ANSWER}:Answer)\
                    -[:FOLLOWEDBY]->(${GRAPH_KEYS.QUESTION}:Question)-[:ISANSWERED]->(${GRAPH_KEYS.ANSWER1}:Answer)\
                    -[]->(${GRAPH_KEYS.CHOICE})
                    return ${GRAPH_KEYS.STEP}, ${GRAPH_KEYS.ANSWER}, ${GRAPH_KEYS.QUESTION}, 
                        ${GRAPH_KEYS.ANSWER1}, ${GRAPH_KEYS.CHOICE}`,

    Q_TREE: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})-[:ISSET]->(${GRAPH_KEYS.CONFIG}:Config)-\
            [${GRAPH_KEYS.STEP}:ASKS]->() \
            ((${GRAPH_KEYS.QUESTION}:Question)-[r1]->(${GRAPH_KEYS.ANSWER}:Answer)){1,5}(()-[r3]->(${GRAPH_KEYS.CHOICE})){0,10}  \
            return ${GRAPH_KEYS.STEP},  q1, r1, a1, r3, s`,

    Q1: `MATCH (${GRAPH_KEYS.PROJECT}:Project {name : $name})-[:ISSET]->(${GRAPH_KEYS.CONFIG}:Config)-\
            [${GRAPH_KEYS.STEP}:ASKS]->(${GRAPH_KEYS.QUESTION}:Question)-[:ISANSWERED]->(${GRAPH_KEYS.ANSWER}:Answer)
                RETURN 
                CASE 
                WHEN ${GRAPH_KEYS.ANSWER}.atype="range" THEN { ${GRAPH_KEYS.CATEGORY}: ${GRAPH_KEYS.STEP}.name, ${GRAPH_KEYS.STEP}: ${GRAPH_KEYS.STEP}.step, \
                content: {${GRAPH_KEYS.QUESTION}: {${GRAPH_KEYS.ID}: elementId(${GRAPH_KEYS.QUESTION}), help: ${GRAPH_KEYS.QUESTION}.help, value:${GRAPH_KEYS.QUESTION}.value}, 
                                        ${GRAPH_KEYS.ANSWER}: {id: elementId(${GRAPH_KEYS.ANSWER}), atype: ${GRAPH_KEYS.ANSWER}.atype, 
                                        value: {min: ${GRAPH_KEYS.ANSWER}.min, max: ${GRAPH_KEYS.ANSWER}.max}, 
                                        label: {min: ${GRAPH_KEYS.ANSWER}.minlabel, max: ${GRAPH_KEYS.ANSWER}.maxlabel}} } }
                WHEN ${GRAPH_KEYS.ANSWER}.atype="multicategory" THEN { ${GRAPH_KEYS.CATEGORY}: ${GRAPH_KEYS.STEP}.name, ${GRAPH_KEYS.STEP}: ${GRAPH_KEYS.STEP}.step,
                ${GRAPH_KEYS.CONTENT}: {${GRAPH_KEYS.QUESTION}: {id: elementId(${GRAPH_KEYS.QUESTION}), help: ${GRAPH_KEYS.QUESTION}.help, value:${GRAPH_KEYS.QUESTION}.value}, 
                        ${GRAPH_KEYS.ANSWER}: {id: elementId(${GRAPH_KEYS.ANSWER}), atype: ${GRAPH_KEYS.ANSWER}.atype, 
                        content: COLLECT {
                                    MATCH (${GRAPH_KEYS.ANSWER}:Answer)-[r]->(child:Answer)
                                        return {atype: child.atype, name: child.name}
                                }
                } } }
                ELSE { ${GRAPH_KEYS.CATEGORY}: ${GRAPH_KEYS.STEP}.name, ${GRAPH_KEYS.STEP}: ${GRAPH_KEYS.STEP}.step, content: {${GRAPH_KEYS.QUESTION}: {${GRAPH_KEYS.ID}: elementId(${GRAPH_KEYS.QUESTION}), help: ${GRAPH_KEYS.QUESTION}.help, value:${GRAPH_KEYS.QUESTION}.value}, 
                                        ${GRAPH_KEYS.ANSWER}: {id: elementId(${GRAPH_KEYS.ANSWER}), atype: ${GRAPH_KEYS.ANSWER}.atype} } }
                END AS ${GRAPH_KEYS.RESULT}
                order by ${GRAPH_KEYS.STEP}.step`,

    Q2: `MATCH (a:Answer)-[r:FOLLOWEDBY]->(q:Question)-[:ISANSWERED]->(${GRAPH_KEYS.ANSWER1}: Answer)
        where elementId(a) in [$ids]
        with collect(${GRAPH_KEYS.ANSWER1}) as answers, ${GRAPH_KEYS.ANSWER1} as ${GRAPH_KEYS.ANSWER1}, q as q, a as a

        return {${GRAPH_KEYS.PREV}: elementId(a), 
                ${GRAPH_KEYS.CONTENT}: {
                        ${GRAPH_KEYS.QUESTION}: {
                                ${GRAPH_KEYS.ID}: elementId(q), 
                                help: q.help, 
                                value: q.value
                            }, 
                        ${GRAPH_KEYS.ANSWER}: {
                            ${GRAPH_KEYS.ID}: elementId(${GRAPH_KEYS.ANSWER1}),
                            atype: ${GRAPH_KEYS.ANSWER1}.atype, 
                            value: {min: ${GRAPH_KEYS.ANSWER1}.min, max: ${GRAPH_KEYS.ANSWER1}.max}, 
                            label: {min: ${GRAPH_KEYS.ANSWER1}.minlabel, max: ${GRAPH_KEYS.ANSWER1}.maxlabel},
                            ${GRAPH_KEYS.CONTENT}: COLLECT {
                                    MATCH (a2:Answer)-[r]->(child:Answer)
                                        where a2 in answers
                                        return {${GRAPH_KEYS.ID}: elementId(child), atype: child.atype, name: child.name}
                }
}}
        } as ${GRAPH_KEYS.RESULT}`,

    QUESTION_TREES: `MATCH (p:Project)-[:ISSET]->(c:Config)-[${GRAPH_KEYS.STEP}:ASKS]->()\
                        ((${GRAPH_KEYS.QUESTION}:Question)-[]->(${GRAPH_KEYS.ANSWER}:Answer)){1,5}(()-[]->(${GRAPH_KEYS.CHOICE})){0,100} \
                        return ${GRAPH_KEYS.STEP}, ${GRAPH_KEYS.QUESTION}, ${GRAPH_KEYS.ANSWER}, ${GRAPH_KEYS.CHOICE}`,

    TEAM: `MATCH (${GRAPH_KEYS.TEAMMEMBER}:TeamMember) RETURN ${GRAPH_KEYS.TEAMMEMBER}`,
    TEAM_PROJECT: `MATCH (${GRAPH_KEYS.PROJECT}:Project)<-[w:WORKEDON]-(${GRAPH_KEYS.TEAMMEMBER}:TeamMember)\
                    -[rel:AS]->(${GRAPH_KEYS.ROLE}:Role)<-[:EMPLOYED]-(p:Project) \
                    return ${GRAPH_KEYS.PROJECT}, w, ${GRAPH_KEYS.TEAMMEMBER}, rel, ${GRAPH_KEYS.ROLE}`,
}



class DBConnection{
    driver: Driver;
    session: Session;

    constructor(){
        this.driver = undefined;
        this.session = undefined;
    }
    async init(){
        try {
            this.driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD),  { disableLosslessIntegers: true });
            const serverInfo = await this.driver.getServerInfo();
            // this.initSession();
          } catch(err) {
                console.log(`Connection error\n${err}\nCause: ${err.cause}`)
          }
        //   await this.driver.close();
    } 

    initSession(mode:number=0){
        this.session = mode==MODE.WRITE ? this.driver.session({ defaultAccessMode: neo4j.session.WRITE }) : this.driver.session({ defaultAccessMode: neo4j.session.READ });
        
    }

    async read(query:string, param:any):Promise<undefined | QueryResult<RecordShape>>{
        if (this.session==undefined){
            this.initSession(MODE.READ);
        }
        
        return this.session.run(query, param, { timeout: 3000 } )
                .then(result => {
                    this.reset();
                    return result;
                })
                    
        }
    reset(){
        if (this.session!=undefined){
            this.session.close();
            this.session = undefined;
        }
    }

    async write(query:string, param:any):Promise<undefined | QueryResult<RecordShape>>{
        /*
        'MERGE (james:Person {name : $nameParam}) RETURN james.name AS name', {
                    nameParam: 'James'
                }
         */
        this.reset()
        
        if (this.session==undefined){
            this.initSession(MODE.WRITE);
        }
        return this.session.run(query, param, { timeout: 3000 } ).then(result => {
                    this.reset();
                    return result;
                })
                    
        }
        
    }

export {DBConnection, QUERYS, GRAPH_KEYS};