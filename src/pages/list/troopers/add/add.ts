import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
 
import { Trooper } from '../../../../app/trooper/trooper.interface';

@Component({
  selector: 'page-list-troopers-add',
  templateUrl: 'add.html'
})
export class ListTroopersAddPage {
  public trooper: Trooper = {
    name: 'trooper1'  ,
    pass: '' 
  };

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController
  ) { }

  public onDismissClick() {
    this.viewCtrl.dismiss();
  }

  public onAddClick() {
    this.viewCtrl.dismiss({
        name: this.trooper.name,
        pass: this.trooper.pass
    } as Trooper);
  }
}
