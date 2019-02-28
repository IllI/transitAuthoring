import { Component, OnInit, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Location } from '../location';
import { GetRoutesService } from '../get-routes.service';
import { AppComponent } from "../app.component";

@Component({
  selector: 'direction-form',
  templateUrl: './direction-form.component.html',
  styleUrls: ['./direction-form.component.sass']
})
export class DirectionForm implements OnInit {
    @Output()
    emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  constructor(){
        console.log('initiated', this);
  }
   // @Input() setDirection: setDir;
 origin = new Location();
  destination = new Location();
  submitRoute(){
      console.log('submit');
      this.emitFunctionOfParent.emit({origin:this.origin, destination:this.destination});
      // console.log(this.origin, this.destination, this.appCom);
      //AppComponent.setDir(this.origin, this.destination);

      /*AppComponent.dir = {

        origin: this.origin,
        destination: this.destination
      }*/
     // let appC= new AppComponent();
      //this.appCom.setDir(this.origin, this.destination);
     // console.log('app', AppComponent);
  }

  ngOnInit() {
  }

}
