import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
 
import { List } from '../../../app/lists/list.interface';
import { ListsService } from '../../../app/lists/lists.service';
import { ListTroopersPage } from '../troopers/troopers'

@Component({
  selector: 'page-list-new',
  templateUrl: 'new.html'
})
export class ListNewPage {

    public list: List = {
        name: 'MyNewListName',
        domain: 'en',
        troopers: []
    };

  constructor(      
    public navCtrl: NavController,
    private listsService: ListsService,
    private toastCtrl: ToastController,
    public params: NavParams,
  ) {}

  public onCreateClick() {
      const list = {
          name: this.list.name,
          domain: this.list.domain,
          troopers: []
      };
      this.listsService.create(list);
      this.navCtrl.setRoot(ListTroopersPage, { list });
      this.showSuccessfullyToast(list);
  }

  private showSuccessfullyToast(list: List) {
    let toast = this.toastCtrl.create({
      message: `
        Great! Your list ${list.name} has been created. Fill it with some troopers!
      `,
      duration: 3000
    });
    toast.present();
  }
}
