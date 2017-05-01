import { Component, ViewChild } from '@angular/core';

import { NavController, Content, ActionSheetController, NavParams, ModalController } from 'ionic-angular';
import { Trooper } from '../../../app/trooper/trooper.interface';
import { List } from '../../../app/lists/list.interface';

import { ListsService } from '../../../app/lists/lists.service'; 
import { TrooperService } from '../../../app/trooper/trooper.service'; 

import { ListTroopersEditPage } from './edit/edit';
import { ListTroopersAddPage } from './add/add';
import { HomePage } from '../../home/home';
import { ListTroopersImportPage } from './import/import';
import { ListSettingsPage } from '../settings/settings';



const STATE = {
  DEFAULT: 0,
  VALIDATING: 1,
  SUCCESS: 2,
  ERROR: 3
};

const noop = () => {};

interface Item {
  trooper: Trooper;
  state: number;
  error: string;
}

@Component({
  selector: 'page-list-troopers',
  templateUrl: 'troopers.html'
})
export class ListTroopersPage {
  public list: List = null;
  public items: Item[] = [];
  @ViewChild(Content) content: Content;
  
  public STATE = STATE;
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public listsService: ListsService,
    public trooperService: TrooperService,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController
  ) {
    this.list = this.params.get('list') as List;
    if(!this.list) {
      this.list = listsService.lists[0];
    }

    this.items = this.list.troopers.map(trooper => {
      return {
        trooper,
        error: '',
        state: STATE.DEFAULT
      };
    });
  }

  private onEditTrooperClick(item: Item) {
    const trooper = item.trooper;
    const addTrooperModal = this.modalCtrl.create(ListTroopersEditPage, {trooper, domain: this.list.domain });
    addTrooperModal.present();
  }

  public onCreateTrooperClick() {
    const addTrooperModal = this.modalCtrl.create(ListTroopersAddPage, { domain: this.list.domain });
     addTrooperModal
     .onDidDismiss(trooper => {
       if (trooper) {
         this.items.push({
           trooper,
           state: STATE.DEFAULT,
           error: ''
         });
         this.list.troopers.push(trooper as Trooper);
       }
    });
    addTrooperModal.present();
  }

  public onTrooperClick(item) {
    this.presentTrooperActionSheet(item);
  }

  public onCheckClick(item: Item, cb = () => {}) {
     item.state = STATE.VALIDATING;
     this.checkTrooper(item.trooper)
        .subscribe(result => {
          if(result.code === 201){
            item.state = STATE.SUCCESS;
          }else{
            item.state = STATE.ERROR;
            if(result.payload){
                item.error = `${result.message} (shouldn't it be: '${result.payload}'?)`;
            }else{
                item.error = result.message;
            }
          }
          cb();
        }, (err) => {
          item.state = STATE.ERROR;
          item.error = 'Connection issue';
          cb();
        });
  }

  public onOptionsClick(){
    this.presentMoreActionSheet();
  }

  private checkTrooper(trooper: Trooper) {
     return this.trooperService.check(trooper, this.list.domain);
  }

  public onImportClick() {
    const importTroopersModal = this.modalCtrl.create(ListTroopersImportPage, {});
     importTroopersModal
     .onDidDismiss(troopers => {
       if (troopers) {
         this.items = this.items.concat(troopers.map(trooper => {
           return {
            trooper,
            state: STATE.DEFAULT,
            error: ''
          };
         }));
         this.list.troopers = this.list.troopers.concat(troopers);
       }
    });
    importTroopersModal.present();
  }

  public onSettingsClick() {
    const list: List = this.list;
    const addTrooperModal = this.modalCtrl.create(ListSettingsPage, {list});
     addTrooperModal
     .onDidDismiss((isListRemoved) => {
       if(isListRemoved){
           this.navCtrl.setRoot(HomePage);
       }
    });
    addTrooperModal.present();    
  }

  public onCheckAllClick() {
    this.items.map(item => item.state = STATE.DEFAULT);
    let i = -1;
    const length = this.items.length;
    const checkNext = () => {
      i = i + 1;
      if(i == length) return;
      this.onCheckClick(this.items[i], () => {
          this.content.scrollTo(0, i * 67, 400);
          checkNext();
      });
    };
    checkNext();
  }

  private onRemoveTrooperClick(item: Item){
    const index = this.list.troopers.indexOf(item.trooper);
    if (index === -1) { return; }
    this.items.splice(index, 1);
    this.list.troopers.splice(index, 1);
  }

  private presentTrooperActionSheet(item: Item) {
    this.actionSheetController.create({
      title: 'What to do?',
      buttons: [
        { text: 'Check', handler: () => this.onCheckClick(item) },
        { text: 'Edit', handler: () => this.onEditTrooperClick(item) },
        { text: 'Remove', role: 'destructive',
          handler: () => this.onRemoveTrooperClick(item)
        },
        { text: 'Cancel', role: 'cancel', handler: noop }
      ]
    }).present();
  }

  private presentMoreActionSheet() {
    const buttons = [
        { text: 'Import', handler: () => this.onImportClick() },
        { text: 'Add trooper', handler: () => this.onCreateTrooperClick() },
        { text: 'Settings', role: 'destructive', handler: () => this.onSettingsClick() }, 
        { text: 'Cancel', role: 'cancel', handler: noop }
    ];

    if(this.list.troopers.length > 0){
      buttons.unshift({ text: 'Check all', handler: () => this.onCheckAllClick() })
    }

    this.actionSheetController.create({ buttons }).present();
  }
}

