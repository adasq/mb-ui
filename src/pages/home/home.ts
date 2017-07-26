import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { PlayerPage } from '../player/player';
import { ListTroopersPage } from '../list/troopers/troopers';

import { ListsService } from '../../app/lists/lists.service';
import { List } from '../../app/lists/list.interface';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public lists: List[] = [];
    constructor(
        public navCtrl: NavController,
        private events: Events,
        private listsService: ListsService
    ) {
        this.lists = this.listsService.lists;
        this.events.subscribe('lists:added', () => {
            this.lists = this.listsService.lists;
        });
    }

    public onListClick(list: List) {
        if (list.troopers.length === 0) {
            this.navCtrl.setRoot(ListTroopersPage, { list });
        } else {
            this.navCtrl.push(PlayerPage, { list });
        }
    }
}
