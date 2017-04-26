import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public item = null;

  constructor(
    private navCtrl: NavController,
    private params: NavParams

  ) {
    const item = this.params.get('item');
    this.item = item;
    console.log(item);
  }

  public onSkillSelected(skillId: number){
    console.log(skillId);
  }
}
