import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Trooper } from '../../../../app/trooper/trooper.interface';
import { STATE } from '../../../../app/trooper/edit/edit.component';
import { Domain } from '../../../../app/lists/list.interface';

@Component({
    selector: 'page-list-troopers-add',
    templateUrl: 'add.html'
})
export class ListTroopersAddPage {
    public domain: Domain;
    public trooper: Trooper = {
        name: 'trooper1',
        pass: ''
    };

    constructor(
        public params: NavParams,
        public viewCtrl: ViewController
    ) {
        this.domain = this.params.get('domain');
    }

    public onStateChanged(state) {
        if (state === STATE.SUCCESS) {
            this.closePopup();
        }
    }

    public onDismissClick() {
        this.viewCtrl.dismiss();
    }

    private closePopup() {
        this.viewCtrl.dismiss({
            name: this.trooper.name,
            pass: this.trooper.pass
        } as Trooper);
    }
}
