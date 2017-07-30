import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { List } from '../list.interface';

export const STATE = {
    DEFAULT: 1,
    UPDATED: 2
};

@Component({
    selector: 'list-edit-component',
    templateUrl: 'edit.component.html'
})
export class ListEditComponent {
    public currentState = STATE.DEFAULT;
    public STATE = STATE;

    @Input() list: List;
    @Input() buttonText: string;
    @Output() onStateChanged: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private toastCtrl: ToastController
    ) { }

    private setState(state: number) {
        this.currentState = state;
        this.onStateChanged.emit(state);
    }

    private showError(message: string) {
        this.toastCtrl
            .create({ message, duration: 3000 })
            .present();
    }

    public onSaveClick() {
        this.setState(STATE.UPDATED);
    }
}
