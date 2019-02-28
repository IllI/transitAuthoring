import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { AfterViewInit,ElementRef } from '@angular/core';
import { AgmDirectionModule } from 'agm-direction';
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
    title: string = 'My first AGM project';
    lat: number = 41.850033;
    lng: number = -87.6500523;
    origin: any;
    destination: any;
    dir = undefined;

    constructor(private getRoutes: GetRoutesService) { }



    getStatus(status){
        console.log('status', status);
    }
    getDirections(change){
       // console.log('change', change.routes);
        let routes = [];
        change.routes.forEach(function(route){
            let routesService = new GetRoutesService();
            let r = new Route(route.legs[0]);
            //r = route;
            routes.push(r);
            routesService.addStep(r);
            console.log('route', r);
        });

    }

    setDir= function(location){
        console.log('deerrrr', location)
        this.dir = {
            origin: location.origin.address,
            destination: location.destination.address
        };
        /*this.addListener('directions_changed', () => {
            //this.onChange.emit(this.directionsDisplay.getDirections());
            console.log('directions changed')
        });*/
    };
   // @ViewChild(DirectionForm) origin: ElementRef;

    ngAfterViewInit() {
        //this.origin.nativeElement.value = "1223 N Cleaver";
        console.log('after init', this);
    }
}