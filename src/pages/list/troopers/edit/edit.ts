import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
import { Trooper } from '../../../../app/trooper/trooper.interface';


@Component({
  selector: 'page-list-troopers-edit',
  templateUrl: 'edit.html'
})
export class ListTroopersEditPage {
  public trooper: Trooper;

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {
      this.trooper = this.params.get('trooper');
  }
}
