import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Trooper } from '../../trooper/trooper.interface';

@Component({
  selector: 'trooper-edit-component',
  templateUrl: 'edit.component.html'
})
export class TrooperEditComponent {
 
    @Input() trooper: Trooper;
    constructor() { }


}
