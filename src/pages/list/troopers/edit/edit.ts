import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Trooper } from '../../../../app/trooper/trooper.interface';
import { Domain } from '../../../../app/lists/list.interface';
import { ListsService } from '../../../../app/lists/lists.service';
import { STATE } from '../../../../app/trooper/edit/edit.component';

@Component({
  selector: 'page-list-troopers-edit',
  templateUrl: 'edit.html'
})
export class ListTroopersEditPage {
  public trooper: Trooper;
  public domain: Domain;
  public tempTrooper: Trooper;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    private listsService: ListsService
  ) {
    this.trooper = this.params.get('trooper');
    this.domain = this.params.get('domain');
    const { name, pass } = this.trooper;
    this.tempTrooper = { name, pass } as Trooper;
  }

  public onStateChanged(state) {
    if (state === STATE.SUCCESS) {
      this.closeEditPage();
    }
  }

  public onDismissClick() {
    this.viewCtrl.dismiss();
  }

  private closeEditPage() {
    this.trooper.name = this.tempTrooper.name;
    this.trooper.pass = this.tempTrooper.pass;
    this.listsService.sync();
    this.viewCtrl.dismiss();
  }
}
