import { Component, ViewChild, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Slides, ActionSheetController } from 'ionic-angular';
import { Entry } from '../entry.interace';
let itemId = -1;
let dataId = -1;

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
        private actionSheetController: ActionSheetController
    ) { }

    ngOnInit() {
        
    }

    private and() {
        if(this.isLastOperator()) return;
        this.query.push({
            isAnd: true
        });
    }

    private or() {
        if(this.isLastOperator()) return;
        this.query.push({
            isOr: true
        });
    }

    private word() {
        if(this.isLastAWord()) return;
        this.query.push({
            isWord: true,
            word: 'siemanko :D'
        });
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
        if(this.query.length > 0) {
            const lastQueryComponent: QueryComponent = this.query[this.query.length - 1];
            return lastQueryComponent.isAnd || lastQueryComponent.isOr;
        }
        return true;
    }

    private isLastAWord() {
        if(this.query.length > 0) {
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

        if(this.isLastAWord()) {
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