import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { List } from '../../../app/lists/list.interface';
 
@Component({
  selector: 'page-list-settings',
  templateUrl: 'settings.html'
})
export class ListSettingsPage {
  public list: List;

  constructor(
    public navCtrl: NavController,
    private viewController: ViewController,
    public params: NavParams
  ) {
    this.list = this.params.get('list');
  }

  aaa () {
    this.viewController.dismiss();
  }
}
