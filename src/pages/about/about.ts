import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Slides, ActionSheetController, ViewController, ModalController } from 'ionic-angular';
import {Deploy} from '@ionic/cloud-angular';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";
import { DetailsPage } from './details/details';

let TENSION = '';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public pureData: any[] = null;
  private currentData: any;
  
  constructor(
    private cd: ChangeDetectorRef,
    private deploy: Deploy,
    public navCtrl: NavController,
    private http: Http,
    private config: EnvConfigurationProvider<any>,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
  ) {
    TENSION = this.config.getConfig().TENSION;
    this.fetch();
  }

  showDetails(item) {
    const showOptionsModal = this.modalCtrl.create(DetailsPage, {item});
    showOptionsModal.present();
  }

  onItemPress(item) {
    this.actionSheetController.create({
          title: 'What to do?',
          buttons: [
            { text: 'Check', handler: () => this.showDetails(item) },
            { text: 'Cancel', role: 'cancel', handler: () => {} }
          ]
      }).present();
  }

  fetch() {
        this.http.get(TENSION + '/test')
          .map(res => res.json())
          .subscribe(response => {
            this.pureData = response;
          });
  }
}
