import { GraphKey } from '../constants/GraphKeys';

/**
 * All Cypher queries used in the application.
 * Extracted from graph.ts for better organization.
 *
 * Note: These will gradually be replaced by QueryBuilder usage,
 * but are kept for backward compatibility during Phase 3.
 */
export class QueryConstants {
    // Observation queries
    public static readonly OBSERVATIONS = `
        match (p:Place)<-[r:REGISTERED]-(o:Observation)-[:EVALUATES]->(a:Answer)<-[:ISANSWERED]-()
        <-[:ASKS]-(c:Config)<-[]-(pr:Project {name: "Mobility Dashboard"})
        return {content: {obs: o, obs_id: elementId(o), place_id: elementId(p), place:p}};
    `;

    public static readonly OBS = `
        match (p:Place)<-[]-(o:Observation)-[:EVALUATES]->(a:Answer)<-[]-()<-[]-(c:Config)<-[]-(pr:Project {name: $name})
        with collect(p) as places, collect(elementId(o)) as obs
        match (p)<-[:REGISTERED]-(o:Observation)-[e:EVALUATES]->(a:Answer) where elementId(o) in obs
        with p, o, collect({id: elementId(a), value: e.value}) as answers
        return { ${GraphKey.LON}: p.lon, ${GraphKey.LAT}: p.lat, ${GraphKey.ID}: elementId(p),
        ${GraphKey.OBSERVATION}: elementId(o), ${GraphKey.ANSWER}: answers } AS ${GraphKey.RESULT}
    `;

    // Submit queries
    public static readonly SUBMIT = `
        MERGE (place: Place {lon: $lon, lat: $lat})<-[:REGISTERED]-(o:Observation {date: datetime()})
    `;

    public static readonly SUBMIT_BETA = `
        WITH $data AS data
        UNWIND data AS obs
        MATCH (n)
        WHERE elementId(n) = obs.id
        MERGE (p: Place {lat: $lat, lon: $lon})
        MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})<-[:ILLUSTRATED]-(img: Illustration {name: $image})
        CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs
    `;

    public static readonly SUBMIT_NO_IMAGE = `
        WITH $data AS data
        UNWIND data AS obs
        MATCH (n)
        WHERE elementId(n) = obs.id
        MERGE (p: Place {lat: $lat, lon: $lon})
        MERGE (p)<-[:REGISTERED]-(o:Observation {date: datetime()})
        CREATE (n)<-[r:EVALUATES {value: obs.value}]-(o) RETURN n, r, o, obs
    `;

    // Node queries
    public static readonly ID_QUESTION = `
        MATCH (${GraphKey.NODE}) WHERE elementId(${GraphKey.NODE}) = $name RETURN ${GraphKey.NODE}
    `;

    // Project queries
    public static readonly PROJECTS = `
        MATCH (${GraphKey.PROJECT}:Project) RETURN ${GraphKey.PROJECT}
    `;

    public static readonly PROJECT_NAME = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name}) RETURN ${GraphKey.PROJECT}
    `;

    public static readonly PROJECT_TEAM = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})<-[:WORKEDON]-(${GraphKey.TEAMMEMBER}:TeamMember)-[rel:AS]->(${GraphKey.ROLE}:Role)
        return ${GraphKey.TEAMMEMBER}, rel, ${GraphKey.ROLE}
    `;

    public static readonly PROJECT_RECOGNITION = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})-[:HAS]->(${GraphKey.RECOGNITION}:Recognition)<-[rel:RECOGNIZED]-(${GraphKey.PARTNER}:Partner)
        return ${GraphKey.RECOGNITION}, rel, ${GraphKey.PARTNER}
    `;

    public static readonly PROJECT_PARTNERS = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})<-[:SUPPORTS]-(${GraphKey.PARTNER}:Partner)
        return ${GraphKey.PARTNER}
    `;

    public static readonly PROJECT_ILLUSTRATIONS = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})<-[:ILLUSTRATED]-(${GraphKey.ILLUSTRATION}:Illustration)
        return ${GraphKey.ILLUSTRATION}
    `;

    // Config and Question queries
    public static readonly CONFIG_QUESTIONS_HL = `
        MATCH (${GraphKey.PROJECT}: Project {name : $name})-[:ISSET]->(${GraphKey.CONFIG}:Config)-[${GraphKey.STEP}:ASKS]->
        (${GraphKey.QUESTION}:Question)-[ans:ISANSWERED]->(${GraphKey.ANSWER}:Answer)
        return ${GraphKey.STEP}, ${GraphKey.QUESTION}, ${GraphKey.ANSWER}
    `;

    public static readonly CONFIG_QUESTIONS = `
        MATCH (${GraphKey.PROJECT}: Project {name : $name})-[:ISSET]->(${GraphKey.CONFIG}:Config)-[${GraphKey.STEP}:ASKS]->
        (${GraphKey.QUESTION}:Question)-[ans:ISANSWERED]->(${GraphKey.ANSWER}:Answer)-
        [fb:FOLLOWEDBY]->(${GraphKey.QUESTION1}:Question)-[ans1:ISANSWERED]->(${GraphKey.ANSWER1}:Answer)
        -[:TOCHOOSE]->(${GraphKey.CHOICE}:Answer)
        return ${GraphKey.STEP}, ${GraphKey.QUESTION}, ${GraphKey.ANSWER},
        fb, ${GraphKey.QUESTION1}, ans1, ${GraphKey.ANSWER1}, ${GraphKey.CHOICE}
    `;

    public static readonly QUESTION_ANSWERS = `
        MATCH (${GraphKey.QUESTION}:Question {value: $question})-[ans:ISANSWERED]->(${GraphKey.ANSWER}:Answer)-
        [fb:FOLLOWEDBY]->(${GraphKey.QUESTION1}:Question)-[ans1:ISANSWERED]->(${GraphKey.ANSWER1}:Answer)
        -[:TOCHOOSE]->(${GraphKey.CHOICE}:Answer)
        return ${GraphKey.STEP}, ${GraphKey.QUESTION}, ${GraphKey.ANSWER},
        fb, ${GraphKey.QUESTION1}, ans1, ${GraphKey.ANSWER1}, ${GraphKey.CHOICE}
    `;

    public static readonly FOLLOWUP_QUESTIONS = `
        MATCH (${GraphKey.PROJECT}: Project {name : $name})-[:ISSET]->(${GraphKey.CONFIG}:Config)
        -[${GraphKey.STEP}:ASKS]->(q:Question)-[ans:ISANSWERED]->(${GraphKey.ANSWER}:Answer)
        -[:FOLLOWEDBY]->(${GraphKey.QUESTION}:Question)-[:ISANSWERED]->(${GraphKey.ANSWER1}:Answer)
        -[]->(${GraphKey.CHOICE})
        return ${GraphKey.STEP}, ${GraphKey.ANSWER}, ${GraphKey.QUESTION},
        ${GraphKey.ANSWER1}, ${GraphKey.CHOICE}
    `;

    public static readonly Q_TREE = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})-[:ISSET]->(${GraphKey.CONFIG}:Config)-
        [${GraphKey.STEP}:ASKS]->()
        ((${GraphKey.QUESTION}:Question)-[r1]->(${GraphKey.ANSWER}:Answer)){1,5}(()-[r3]->(${GraphKey.CHOICE})){0,10}
        return ${GraphKey.STEP},  q1, r1, a1, r3, s
    `;

    public static readonly Q1 = `
        MATCH (${GraphKey.PROJECT}:Project {name : $name})-[:ISSET]->(${GraphKey.CONFIG}:Config)-
        [${GraphKey.STEP}:ASKS]->(${GraphKey.QUESTION}:Question)-[:ISANSWERED]->(${GraphKey.ANSWER}:Answer)
        RETURN
        CASE
        WHEN ${GraphKey.ANSWER}.atype="range" THEN { ${GraphKey.CATEGORY}: ${GraphKey.STEP}.name, ${GraphKey.STEP}: ${GraphKey.STEP}.step,
        content: {${GraphKey.QUESTION}: {${GraphKey.ID}: elementId(${GraphKey.QUESTION}), help: ${GraphKey.QUESTION}.help, value:${GraphKey.QUESTION}.value},
        ${GraphKey.ANSWER}: {id: elementId(${GraphKey.ANSWER}), atype: ${GraphKey.ANSWER}.atype,
        value: {min: ${GraphKey.ANSWER}.min, max: ${GraphKey.ANSWER}.max},
        label: {min: ${GraphKey.ANSWER}.minlabel, max: ${GraphKey.ANSWER}.maxlabel}} } }
        WHEN ${GraphKey.ANSWER}.atype="multicategory" THEN { ${GraphKey.CATEGORY}: ${GraphKey.STEP}.name, ${GraphKey.STEP}: ${GraphKey.STEP}.step,
        ${GraphKey.CONTENT}: {${GraphKey.QUESTION}: {id: elementId(${GraphKey.QUESTION}), help: ${GraphKey.QUESTION}.help, value:${GraphKey.QUESTION}.value},
        ${GraphKey.ANSWER}: {id: elementId(${GraphKey.ANSWER}), atype: ${GraphKey.ANSWER}.atype,
        content: COLLECT {
            MATCH (${GraphKey.ANSWER}:Answer)-[r]->(child:Answer)
            return {atype: child.atype, name: child.name}
        }
        } } }
        ELSE { ${GraphKey.CATEGORY}: ${GraphKey.STEP}.name, ${GraphKey.STEP}: ${GraphKey.STEP}.step, content: {${GraphKey.QUESTION}: {${GraphKey.ID}: elementId(${GraphKey.QUESTION}), help: ${GraphKey.QUESTION}.help, value:${GraphKey.QUESTION}.value},
        ${GraphKey.ANSWER}: {id: elementId(${GraphKey.ANSWER}), atype: ${GraphKey.ANSWER}.atype} } }
        END AS ${GraphKey.RESULT}
        order by ${GraphKey.STEP}.step
    `;

    public static readonly Q2 = `
        MATCH (a:Answer)-[r:FOLLOWEDBY]->(q:Question)-[:ISANSWERED]->(${GraphKey.ANSWER1}: Answer)
        where elementId(a) in [$ids]
        with collect(${GraphKey.ANSWER1}) as answers, ${GraphKey.ANSWER1} as ${GraphKey.ANSWER1}, q as q, a as a
        return {${GraphKey.PREV}: elementId(a),
        ${GraphKey.CONTENT}: {
            ${GraphKey.QUESTION}: {
                ${GraphKey.ID}: elementId(q),
                help: q.help,
                value: q.value
            },
            ${GraphKey.ANSWER}: {
                ${GraphKey.ID}: elementId(${GraphKey.ANSWER1}),
                atype: ${GraphKey.ANSWER1}.atype,
                value: {min: ${GraphKey.ANSWER1}.min, max: ${GraphKey.ANSWER1}.max},
                label: {min: ${GraphKey.ANSWER1}.minlabel, max: ${GraphKey.ANSWER1}.maxlabel},
                ${GraphKey.CONTENT}: COLLECT {
                    MATCH (a2:Answer)-[r]->(child:Answer)
                    where a2 in answers
                    return {${GraphKey.ID}: elementId(child), atype: child.atype, name: child.name}
                }
            }
        }
        } as ${GraphKey.RESULT}
    `;

    public static readonly QUESTION_TREES = `
        MATCH (p:Project)-[:ISSET]->(c:Config)-[${GraphKey.STEP}:ASKS]->()
        ((${GraphKey.QUESTION}:Question)-[]->(${GraphKey.ANSWER}:Answer)){1,5}(()-[]->(${GraphKey.CHOICE})){0,100}
        return ${GraphKey.STEP}, ${GraphKey.QUESTION}, ${GraphKey.ANSWER}, ${GraphKey.CHOICE}
    `;

    // Team queries
    public static readonly TEAM = `
        MATCH (${GraphKey.TEAMMEMBER}:TeamMember) RETURN ${GraphKey.TEAMMEMBER}
    `;

    public static readonly TEAM_PROJECT = `
        MATCH (${GraphKey.PROJECT}:Project)<-[w:WORKEDON]-(${GraphKey.TEAMMEMBER}:TeamMember)
        -[rel:AS]->(${GraphKey.ROLE}:Role)<-[:EMPLOYED]-(p:Project)
        return ${GraphKey.PROJECT}, w, ${GraphKey.TEAMMEMBER}, rel, ${GraphKey.ROLE}
    `;
}
