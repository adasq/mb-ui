import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
import { Trooper } from '../../../../app/trooper/trooper.interface';

@Component({
  selector: 'page-list-troopers-edit',
  templateUrl: 'edit.html'
})
export class ListTroopersEditPage {
  public trooper: Trooper;
  public tempTrooper: Trooper;

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {
      this.trooper = this.params.get('trooper');
      const {name, pass} = this.trooper;
      this.tempTrooper = {name, pass} as Trooper;
  }

  public onUpdateClick() {
    this.trooper.name = this.tempTrooper.name;
    this.trooper.pass = this.tempTrooper.pass;
    this.navCtrl.pop();
  }
}
