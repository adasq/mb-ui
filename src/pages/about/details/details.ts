import { NavController, NavParams, Slides, ActionSheetController, ViewController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
    public item;
  constructor(
    public viewCtrl: ViewController,
    public params: NavParams
  ){
      this.item = this.params.get('item');
  }
}
