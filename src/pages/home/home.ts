import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlayerPage } from '../player/player';
import { ListTroopersPage } from '../list/troopers/troopers';

import { ListsService } from '../../app/lists/lists.service';
import { List } from '../../app/lists/list.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public lists: List[] = [];
  constructor(
    public af: AngularFireDatabase,
    public navCtrl: NavController,
    private listsService: ListsService
   ) {
     this.lists = this.listsService.lists;  


    //  const items = this.af.list('/results/ziemniaki4');
    //  items.subscribe((result) => {
    //    console.log('ziemniaki4',result);
    //  });
  }

  public onListClick(list: List) {
    if(list.troopers.length === 0) {
      this.navCtrl.setRoot(ListTroopersPage, { list });
    }else {
      this.navCtrl.push(PlayerPage, {list});
    }
  }
}
