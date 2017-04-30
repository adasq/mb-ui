import { Component, Input } from '@angular/core';
import { Trooper } from '../../trooper/trooper.interface';

@Component({
  selector: 'trooper-edit-component',
  templateUrl: 'edit.component.html'
})
export class TrooperEditComponent {
 
    @Input() trooper: Trooper;
    constructor() { }


}
