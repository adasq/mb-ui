import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Trooper } from '../../../app/trooper/trooper.interface';
import { List } from '../../../app/lists/list.interface';

import { ListsService } from '../../../app/lists/lists.service'; 

import { ListTroopersEditPage } from './edit/edit';
import { ListTroopersAddPage } from './add/add';

@Component({
  selector: 'page-list-troopers',
  templateUrl: 'troopers.html'
})
export class ListTroopersPage {
  public list: List = null;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public listsService: ListsService,
    private modalCtrl: ModalController
  ) {
    this.list = this.params.get('list') as List;   
  }

  public onCreateTrooperClick() {
    this.openAddTrooperModal();
  }

  public onTrooperClick(trooper) {
    this.navCtrl.push(ListTroopersEditPage, {
      trooper
    }); 
  }

  private openAddTrooperModal() {
    const addTrooperModal = this.modalCtrl.create(ListTroopersAddPage, {});
     addTrooperModal
     .onDidDismiss(trooper => {
       if (trooper) {
         this.list.troopers.push(trooper as Trooper);
       }
    });
    addTrooperModal.present();
  }

}
