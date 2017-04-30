import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlayerPage } from '../player/player';

import { ListsService } from '../../app/lists/lists.service';
import { List } from '../../app/lists/list.interface';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public lists: List[] = [];
  constructor(
    public navCtrl: NavController,
    private listsService: ListsService
   ) {
     this.lists = this.listsService.lists;  
  }

  public onListClick(list: List) {
    if(list.troopers.length === 0) return;
    this.navCtrl.push(PlayerPage, {list});
  }
}
