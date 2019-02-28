import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams }
from '@angular/http';

@Injectable()
export class GetRoutesService {

    constructor(private http: HttpClient) { }
    totalEta= 0;
    apiRoot:string = 'http://localhost:3000/';
    addWalkingTime(step){
        //add walking time to overal eta
        let walkTime = parseInt(step.duration.text.split(' ')[0]);

        this.totalEta+=walkTime;
        console.log('totes', this.totalEta);
    }
    addBusTime(step){
        console.log('bus', step);
        this.getBusStop(step);

    }
    getBusDirection(step){}
    getBusStop(step){
        let line = step.transit;
        let lineId = line.short_name;
        let arrivalName = line.arrival_stop.name;
        let departureName = line.departure_stop.name;
        let http = new HttpClient();

        console.log('http cli', this.http);
       // http://localhost:3000/getStop/50/Damen%20%26%20Milwaukee%2FNorth%20Ave/Damen%20%26%20Montrose
        let promise = new Promise((resolve, reject) => {
            let apiURL =  '${this.apiRoot}/getStop/${lineId}/${+encodeURIComponent(departureName)}/${+encodeURIComponent(arrivalName)}';
            this.http
                .get(apiURL)
                .toPromise()
                .then(
                res => {
                    // Success
                    console.log('api', apiURL);

                    resolve();
                },
                msg => {
                    // Error
                    reject(msg);
                }
            );
        });
        return promise;


       /* let promise = new Promise((resolve, reject) =>{
            let url = '${this.apiRoot}/getStop/${lineId}/${+encodeURIComponent(departureName)}/${+encodeURIComponent(arrivalName)}';
            http.get(url)
                .toPromise()
                .then(
                res => { // Success
                    console.log(res.json());
                    resolve();
                }
            );
        });
        return promise;*/


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
        //console.log('pass', step)

    }
}
