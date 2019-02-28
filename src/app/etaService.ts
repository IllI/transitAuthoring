export class ETAService {
    constructor() { }
    totalEta: number;
    addWalkingTime(step){
        //add walking time to overal eta
        let walkTime = parseInt(step.duration.text.split(' ')[0]);
        this.totalEta+=walkTime;
    }
    addBusTime(step){}
    addStep(step){
        if (step.travelMode === 'WALKING'){
            this.addWalkingTime(step);
        }
    }


}