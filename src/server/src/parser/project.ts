
// import { Parser } from "./parser";
// import { ProjectPeriod, ProjectInfo } from "../logic/projectInfo";
// import { Project } from "../logic/project";

// class ProjectParser extends Parser{
    

//     static getPeriod(projectInput){
//         return new ProjectPeriod(projectInput.start_date, projectInput.end_date);
//     }

//     static make(projectInput, config, awards, projectImages, partners, team){
//         let projectInfo = new ProjectInfo(projectInput.id, projectInput.name, 
//             projectInput.subtitle, projectInput.description, 
//             ProjectParser.getPeriod(projectInput), 
//             awards ? awards : [],
//             projectImages ? projectImages : [], 
//             partners ? partners : [], 
//             team ? team : []);


//         let project = new Project(projectInput.id, 
//             projectInfo,
//             config
//             );
//         return project;
//     }
// }

// export {ProjectParser}