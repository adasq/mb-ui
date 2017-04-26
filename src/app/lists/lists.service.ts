import { Injectable } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { EditPage } from './edit/edit';
import { Trooper } from '../../app/trooper/trooper.interface';

import { List } from './list.interface';

@Injectable()
export class ListsService {

    public lists: List[];

  constructor(
        private events: Events
  ) {

    const troopers: Trooper[] = [];

    for(var i = 0; i < 6; i++) {
      troopers.push({
        name: `list1 trooper${i+1}`
      } as Trooper);
    }

      this.lists = [
          {
            name: 'list1',
            troopers
          },
          {
            name: 'list2',
            troopers: []
          }
      ];
  }

  public create(list: List){
    this.lists.push(list);
    this.events.publish('lists:added', list);
  }
}
