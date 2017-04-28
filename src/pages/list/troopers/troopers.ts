import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ActionSheetController, NavParams, ModalController } from 'ionic-angular';
import { Trooper } from '../../../app/trooper/trooper.interface';
import { List } from '../../../app/lists/list.interface';

import { ListsService } from '../../../app/lists/lists.service'; 

import { ListTroopersEditPage } from './edit/edit';
import { ListTroopersAddPage } from './add/add';
import { ListTroopersImportPage } from './import/import';


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
    private modalCtrl: ModalController,
    private http: Http,
    private actionSheetController: ActionSheetController
  ) {
    this.list = this.params.get('list') as List;
    if(!this.list) {
      this.list = listsService.lists[1];
    }
  }

  public onCreateTrooperClick() {
    const addTrooperModal = this.modalCtrl.create(ListTroopersAddPage, {});
     addTrooperModal
     .onDidDismiss(trooper => {
       if (trooper) {
         this.list.troopers.push(trooper as Trooper);
       }
    });
    addTrooperModal.present();
  }

  public onTrooperClick(trooper) {
    this.presentActionSheet(trooper);
  }

  public onImportClick() {
    const importTroopersModal = this.modalCtrl.create(ListTroopersImportPage, {});
     importTroopersModal
     .onDidDismiss(troopers => {
       if (troopers) {
         this.list.troopers = this.list.troopers.concat(troopers);
       }
    });
    importTroopersModal.present();
  }

  private onEditTrooperClick(trooper: Trooper){
    this.navCtrl.push(ListTroopersEditPage, { trooper });
  }

  private onRemoveTrooperClick(trooper: Trooper){
    const index = this.list.troopers.indexOf(trooper);
    if(index === -1){
      return;
    }
    this.list.troopers.splice(index, 1);
  }

  public presentActionSheet(trooper) {
    this.actionSheetController.create({
      title: 'What to do?',
      buttons: [
        {
          text: 'Edit',
          handler: () => this.onEditTrooperClick(trooper)
        },{
          text: 'Remove',
          role: 'destructive',
          handler: () => this.onRemoveTrooperClick(trooper)
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    }).present();
  }
}

