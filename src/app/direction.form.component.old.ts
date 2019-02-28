import { Component } from '@angular/core';

@Component({
    selector: 'direction-form',
    templateUrl: 'direction.form.component.html',
    styleUrls: ['direction.form.component.css']
})
export class DirectionForm {
    origin: any;
    destination: any;
    submitRoute(){
        console.log(this.origin, this.destination);
    }
}