import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from 'ionic-angular';
import { AddWordPage } from './word/add-word';
import { AngularFireDatabase } from 'angularfire2/database';


interface QueryComponent {
    isOr?: boolean,
    isAnd?: boolean,
    isWord?: boolean,
    word?: string
};


@Component({
    selector: 'add-component',
    templateUrl: 'add.component.html'
})
export class AddComponent implements OnInit {

    public query: QueryComponent[] = [];

    constructor(
        private modalCtrl: ModalController,
        private actionSheetController: ActionSheetController,
        private af: AngularFireDatabase
    ) { }

    ngOnInit() {
        this.word();
    }

    private and() {
        if (this.isLastOperator()) return;
        this.query.push({
            isAnd: true
        });
    }

    private or() {
        if (this.isLastOperator()) return;
        this.query.push({
            isOr: true
        });
    }

    private word() {
        if (this.isLastAWord()) return;
        const word = '';
        const showOptionsModal = this.modalCtrl.create(AddWordPage, { word });
        showOptionsModal.onDidDismiss((result) => {
            if (!result) return;
            this.query.push({
                isWord: true,
                word: result
            });
        });
        showOptionsModal.present();
    }

    private buildQuery(): string {
        return this.query.map(qc => {
            if (qc.isAnd) {
                return 'AND';
            }
            if (qc.isOr) {
                return 'OR';
            }
            if (qc.isWord) {
                return `"${qc.word}"`;
            }
        }).join(' ');
    }

    public saveQuery() {
        const query = this.buildQuery();
        this.af.object(`/subscriptions/${query}`)
            .set({ aaa: 'aaa' });
    }

    public add() {
        this.showOptions();
    }

    public onOperatorClick(queryComponent: QueryComponent) {
        this.query = this.query.filter(qc => qc != queryComponent);
    }

    public onWordClick(queryComponent: QueryComponent) {
        this.onOperatorClick(queryComponent);
    }

    private isLastOperator() {
        if (this.query.length > 0) {
            const lastQueryComponent: QueryComponent = this.query[this.query.length - 1];
            return lastQueryComponent.isAnd || lastQueryComponent.isOr;
        }
        return true;
    }

    private isLastAWord() {
        if (this.query.length > 0) {
            return !!this.query[this.query.length - 1].word
        }
        return false;
    }

    showOptions() {
        const add = { text: 'AND', handler: () => this.and() };
        const word = { text: 'Word', handler: () => this.word() };
        const or = { text: 'OR', handler: () => this.or() };
        const cancel = { text: 'Cancel', role: 'cancel', handler: () => { } };

        let buttons = [];

        if (this.isLastAWord()) {
            buttons = [or, add];
        } else if (this.isLastOperator()) {
            buttons = [word];
        }

        buttons.push(cancel)

        this.actionSheetController.create({
            title: 'What to add?', buttons
        }).present();
    }

}