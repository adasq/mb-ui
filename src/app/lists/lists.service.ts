import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';
import { Trooper } from '../../app/trooper/trooper.interface';
import { List } from './list.interface';

@Injectable()
export class ListsService {
    public lists: List[] = [];

    constructor(
        private events: Events,
        private storage: Storage
    ) {
        const troopers: Trooper[] = [];
        this.storage.get('lists').then((lists) => {
            if (lists) {
                this.lists = lists;
                this.events.publish('lists:added', lists[0]);
            }
        }, (err) => {
            console.log('err', err);
        });
    }

    public create(list: List) {
        this.lists.push(list);
        this.events.publish('lists:added', list);
        this.sync();
    }

    public sync() {
        this.storage.set('lists', this.lists);
    }
}
