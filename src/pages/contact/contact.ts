import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { STATE } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public item = null;
  public items = null;

  constructor(
    private navCtrl: NavController,
    private params: NavParams
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
      this.item = items[0];
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
    if(this.items){
      this.selectNextReport();
    }else {
      this.navigatePreviousState();
    }
  }
}
