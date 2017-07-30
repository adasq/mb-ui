import { Component } from '@angular/core';
import { NavParams, ViewController, Events } from 'ionic-angular';
import { List } from '../../../app/lists/list.interface';
import { ListsService } from '../../../app/lists/lists.service';
import { STATE } from '../../../app/lists/edit/edit.component';

@Component({
    selector: 'page-list-settings',
    templateUrl: 'settings.html'
})
export class ListSettingsPage {
    public list: List;
    public tempList: List;

    constructor(
        private viewController: ViewController,
        private listsService: ListsService,
        private events: Events,
        public params: NavParams
    ) {
        this.list = this.params.get('list');
        const { name, domain } = this.list;
        this.tempList = {
            name,
            domain,
            troopers: []
        };
    }

    public onStateChanged(state) {
        if (state === STATE.UPDATED) {
            this.list.name = this.tempList.name;
            this.list.domain = this.tempList.domain;
            this.events.publish('lists:added');
            this.listsService.sync();
            this.viewController.dismiss();
        }
    }

    public onRemoveClick() {
        const index = this.listsService.lists.indexOf(this.list);
        this.listsService.lists.splice(index, 1);
        this.events.publish('lists:added');
        this.listsService.sync();
        this.viewController.dismiss(true);
    }

    onDismissClick() {
        this.viewController.dismiss();
    }
}
