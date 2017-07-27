import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TrooperService } from '../../app/trooper/trooper.service'
import { AngularFireDatabase } from 'angularfire2/database';

import { STATE } from '../player/player';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public item = null;
  public items = null;

  constructor(
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private trooperService: TrooperService,
    private params: NavParams,
    public af: AngularFireDatabase
  ) {
    this.item = this.params.get('item');
    this.items = this.params.get('items');

    if(this.items) {
      this.selectNextReport();
    }
  }

  private selectNextReport(){
    const items = this.getAvailableForUpgrade();

    if(items[0]) {
      const isFirstTime = !(!!this.item);
      this.item = items[0];
      if(!isFirstTime){
        this.changeDetectorRef.detectChanges();
      }
    }else{
      this.navigatePreviousState();
    }
  }

  private navigatePreviousState() {
    this.navCtrl.pop();
  }

  private getAvailableForUpgrade(){
    return this.items.filter(item => item.state === STATE.UPGRADE_AVAILABLE);
  }

  public onSkillSelected(skillId: number) {
    this.item.state = STATE.SKILL_SELECTING;
    this.af.object(`/queue2/${this.item.trooper.name}`).set({ skillId, pass: this.item.trooper.pass || null });
    if (this.items) {
      this.selectNextReport();
    } else {
      this.navigatePreviousState();
    }
  }
}
