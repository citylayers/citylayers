import { LocalTime } from "neo4j-driver";
import { timeStamp } from "node:console";


interface Answer{
    id: string;
    value: number;
}

class Observation{
    id: string;
    answers: Answer[];
    constructor(id:string, answers: Answer[]){
        this.id = id;
        this.answers = answers;
    }
}

class Place{
    id:string;
    lat:number;
    lon: number;
    constructor(id:string,
        lat:number,
        lon: number){
            this.id = id;
            this.lat = lat;
            this.lon = lon;
        }
}

class Point{
    place: Place;
    obs: Observation[];
    constructor(place:Place, obs:Observation[]){
        this.place = place;
        this.obs = obs;
    }
}

export {Answer, Observation, Place, Point};