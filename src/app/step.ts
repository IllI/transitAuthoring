export class Step {
    constructor(step) {

        this.distance = step.distance;
        this.duration = step.duration;
        this.instructions = step.instructions;
        this.steps = step.steps;
        this.travel_mode = step.travel_mode;

    }

    distance= {text: "", value: -1};
    duration= {text: "", value: -1};
    instructions= "";
    steps= [];
    travel_mode= "";

}
