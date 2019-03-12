import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { AfterViewInit,ElementRef } from '@angular/core';
import { AgmDirectionModule } from 'agm-direction';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {DirectionForm} from './direction-form/direction-form.component';
import {Route } from './route';
import {ETAService } from './etaService';
import { GetRoutesService } from './get-routes.service';

//@Injectable();
//import { DirectionForm } from './direction.form.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title: string = 'CTWaze';
    lat: number = 41.850033;
    lng: number = -87.6500523;
    origin: any;
    destination: any;
    dir = undefined;

    constructor(private getRoutes: GetRoutesService) { }



    getStatus(status){}
    getDirections(change){
        let routes = [];
        let app = this;
        change.routes.forEach(function(route){
           // let routesService = new GetRoutesService();
            let r = new Route(route.legs[0]);
            routes.push(r);
            app.getRoutes.addStep(r);
        });

    }

    setDir= function(location){
        this.dir = {
            origin: location.origin.address,
            destination: location.destination.address
        };
    };

    ngAfterViewInit() {}
}