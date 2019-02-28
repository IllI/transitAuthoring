export class Route {
    constructor(route) {

        this.distance = route.distance;
        this.duration = route.duration;
        this.instructions = route.instructions;
        if (route.steps){
           // console.log(route.steps);
           // this.steps.push(route.steps);
            this.getSteps(route.steps);

        }
        this.travel_mode = route.travel_mode;
        this.transit = route.transit;

    }
    distance= {
        text: '',
        value: undefined
    };
    duration= {text: undefined, value: undefined};
    instructions: any;
    steps=[];
    transit={};
    getSteps= function(steps){

        steps.forEach((step)=>{

            let route = new Route(step);
            this.steps.push(route);
        });

    };
    travel_mode: any;

}
