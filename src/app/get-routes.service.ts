import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class GetRoutesService {
    constructor(private http: HttpClient) { }
    totalEta= 0;
    apiRoot:string = 'http://localhost:3000/';
    addWalkingTime(step){
        //add walking time to overal eta
        let walkTime = parseInt(step.duration.text.split(' ')[0]);

        this.totalEta+=walkTime;

    }
    addBusTime(step){
        this.getBusStop(step).then(response => {},
            error =>  {
                console.error('An error occurred in retrieving rx list, navigating to login: ', error);
            });

    }
    getBusDirection(step){}
    getBusStop(step){
        let line = step.transit;
        let lineId = line.line.short_name;
        let arrivalName = line.arrival_stop.name;
        let departureName = line.departure_stop.name;
        let promise = new Promise((resolve, reject) => {
            let apiURL =  `http://localhost:3000/getStop/${lineId}/${encodeURIComponent(departureName)}/${encodeURIComponent(arrivalName)}`;
            return  this.http.get(apiURL)
                .toPromise()
                .then(
                res => { // Success
                    resolve();
                },
                msg => {
                    console.log('api error', apiURL, msg);
                }
            );


        });
        return promise;
    }
    getBusETAs(){}
    addStep(step){
        if (step.travel_mode===undefined){
            if (step.steps.length > 0){
                let serve = this;
                step.steps.forEach(function(substep){
                    serve.addStep(substep);
                })
                return;
            }

        }
        if (step.travel_mode === 'WALKING'){
            this.addWalkingTime(step);
            return;
        }
        if (step.travel_mode === 'TRANSIT'){
            if (step.instructions.indexOf('Bus')>-1){
                this.addBusTime(step);
            }
        }

    }
}
