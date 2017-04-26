import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ListTroopersPage } from './troopers/troopers';
import { ListSettingsPage } from './settings/settings';

@Component({
  templateUrl: 'list.html'
})
export class ListPage {

  tab1Root = ListTroopersPage;
  tab2Root = ListSettingsPage;

  public tabParams = null;
  constructor(
    public params: NavParams
  ) {
    this.tabParams = {
      list: this.params.get('list')
    };
  }
}
