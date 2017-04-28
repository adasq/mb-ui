import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { NavController } from 'ionic-angular';

import { PlayerPage } from '../player/player';

import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
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
    http: Http,
    private listsService: ListsService
   ) {
     this.lists = this.listsService.lists;  
  }

  public onListClick(list: List) {
    if(list.troopers.length === 0) return;
    this.navCtrl.push(PlayerPage, {list});
  }
}
