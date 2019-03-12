import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClient, HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { DirectionForm } from './direction-form/direction-form.component';
import { AgmDirectionModule } from 'agm-direction';
import { ETAService }   from './etaService';
import { GetRoutesService } from './get-routes.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule ,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAGblljBdom8fuPLd7J2dolsnHFGs0zvvE'
        }),
        AgmDirectionModule
    ],
    declarations: [ AppComponent, DirectionForm ],
    bootstrap: [ AppComponent ],
    providers: [GetRoutesService]

})
export class AppModule {
    constructor(){}
}