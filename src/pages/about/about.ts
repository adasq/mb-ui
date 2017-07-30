import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";
import { DetailsPage } from './details/details';
import { AngularFireDatabase } from 'angularfire2/database';
import { Entry } from './entry.interace';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {

    public pureData: Entry[] = null;

    constructor(
        private deploy: Deploy,
        public navCtrl: NavController,
        private http: Http,
        public params: NavParams,
        private config: EnvConfigurationProvider<any>,
        private actionSheetController: ActionSheetController,
        private modalCtrl: ModalController,
        public af: AngularFireDatabase
    ) {
        this.pureData = null;
        this.loadDataById(this.params.get('id'));
    }

    loadDataById(id: number) {
        this.af.list(`/entries/${id}`, {
            preserveSnapshot: true,
            query: {
                orderByChild: 'date',
                limitToFirst: 20
            }
        }).subscribe((result) => {
            this.pureData = result.map(item => item.val()).reverse();
        });
    }

    showDetails(item) {
        const showOptionsModal = this.modalCtrl.create(DetailsPage, { item });
        showOptionsModal.present();
    }

    onItemPress(item) {
        this.actionSheetController.create({
            title: 'What to do?',
            buttons: [
                { text: 'Check', handler: () => this.showDetails(item) },
                { text: 'Cancel', role: 'cancel', handler: () => { } }
            ]
        }).present();
    }
}
