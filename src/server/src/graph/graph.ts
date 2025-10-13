import neo4j from 'neo4j-driver';
import {Driver, Session, QueryResult, RecordShape} from 'neo4j-driver';
import { DatabaseConfig, DatabaseMode } from '../config/DatabaseConfig';
import { GraphKey } from '../constants/GraphKeys';
import { QueryConstants } from '../database/QueryConstants';

// Legacy export for backward compatibility - will be removed after full migration
const GRAPH_KEYS = {
    ANSWER: GraphKey.ANSWER,
    ANSWER1: GraphKey.ANSWER1,
    CATEGORY: GraphKey.CATEGORY,
    CHOICE: GraphKey.CHOICE,
    CONFIG: GraphKey.CONFIG,
    CONTENT: GraphKey.CONTENT,
    ID: GraphKey.ID,
    ILLUSTRATION: GraphKey.ILLUSTRATION,
    LAT: GraphKey.LAT,
    LON: GraphKey.LON,
    NODE: GraphKey.NODE,
    OBSERVATION: GraphKey.OBSERVATION,
    PARTNER: GraphKey.PARTNER,
    PLACE: GraphKey.PLACE,
    PREV: GraphKey.PREV,
    PROJECT: GraphKey.PROJECT,
    RECOGNITION: GraphKey.RECOGNITION,
    RESULT: GraphKey.RESULT,
    ROLE: GraphKey.ROLE,
    QUESTION: GraphKey.QUESTION,
    QUESTION1: GraphKey.QUESTION1,
    STEP: GraphKey.STEP,
    TEAMMEMBER: GraphKey.TEAMMEMBER,
}

// Legacy export - queries moved to QueryConstants for better organization
const QUERYS = {
    OBSERVATIONS: QueryConstants.OBSERVATIONS,
    OBS: QueryConstants.OBS,
    SUBMIT: QueryConstants.SUBMIT,
    SUBMIT_BETA: QueryConstants.SUBMIT_BETA,
    SUBMIT_NO_IMAGE: QueryConstants.SUBMIT_NO_IMAGE,
    ID_QUESTION: QueryConstants.ID_QUESTION,
    PROJECTS: QueryConstants.PROJECTS,
    PROJECT_NAME: QueryConstants.PROJECT_NAME,
    PROJECT_TEAM: QueryConstants.PROJECT_TEAM,
    PROJECT_RECOGNITION: QueryConstants.PROJECT_RECOGNITION,
    PROJECT_PARTNERS: QueryConstants.PROJECT_PARTNERS,
    PROJECT_ILLUSTRATIONS: QueryConstants.PROJECT_ILLUSTRATIONS,
    CONFIG_QUESTIONS_HL: QueryConstants.CONFIG_QUESTIONS_HL,
    CONFIG_QUESTIONS: QueryConstants.CONFIG_QUESTIONS,
    QUESTION_ANSWERS: QueryConstants.QUESTION_ANSWERS,
    FOLLOWUP_QUESTIONS: QueryConstants.FOLLOWUP_QUESTIONS,
    Q_TREE: QueryConstants.Q_TREE,
    Q1: QueryConstants.Q1,
    Q2: QueryConstants.Q2,
    QUESTION_TREES: QueryConstants.QUESTION_TREES,
    TEAM: QueryConstants.TEAM,
    TEAM_PROJECT: QueryConstants.TEAM_PROJECT,
}

class DBConnection{
    driver: Driver;
    session: Session;
    private config: DatabaseConfig;

    constructor(){
        this.driver = undefined;
        this.session = undefined;
        this.config = DatabaseConfig.fromEnvironment();
    }

    async init(){
        if (this.driver==undefined){
            try {
                this.driver = neo4j.driver(
                    this.config.getUri(),
                    neo4j.auth.basic(this.config.getUser(), this.config.getPassword()),
                    { disableLosslessIntegers: this.config.shouldDisableLosslessIntegers() }
                );
                const serverInfo = await this.driver.getServerInfo();
                console.log(`Connected to Neo4j: ${this.config.getConnectionStringMasked()}`);
            } catch(err) {
                console.log(`Connection error\n${err}\nCause: ${err.cause}`)
            }
        }
    }

    async initSession(mode: DatabaseMode = DatabaseMode.READ){
        return this.init().then(k=>
            this.session = mode === DatabaseMode.WRITE
                ? this.driver.session({ defaultAccessMode: neo4j.session.WRITE })
                : this.driver.session({ defaultAccessMode: neo4j.session.READ })
        )
    }

    async read(query:string, param:any):Promise<undefined | QueryResult<RecordShape>>{
        return this.initSession(DatabaseMode.READ).then(k=>{
            return this.session.run(query, param, { timeout: this.config.getDefaultTimeout() } )
                .then(result => {
                    this.reset();
                    return result;
                })
        })
    }

    reset(){
        if (this.session!=undefined){
            this.session.close();
            this.session = undefined;
        }
    }

    async write(query:string, param:any):Promise<undefined | QueryResult<RecordShape>>{
        this.reset()

        return  this.initSession(DatabaseMode.WRITE).then(k=>{
            return this.session.run(query, param, { timeout: this.config.getDefaultTimeout() } )
                .then(result => {
                    this.reset();
                    return result;
                })
        })
    }
}

export {DBConnection, QUERYS, GRAPH_KEYS};
