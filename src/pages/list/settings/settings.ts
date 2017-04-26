import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
 
@Component({
  selector: 'page-list-settings',
  templateUrl: 'settings.html'
})
export class ListSettingsPage {

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {
  }
}
