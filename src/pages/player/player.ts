import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';


import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
import { TrooperService } from '../../app/trooper/trooper.service';
import { ContactPage } from '../contact/contact';
import { List } from '../../app/lists/list.interface';
import { AngularFireDatabase } from 'angularfire2/database';

import 'rxjs/add/operator/map';

export const STATE = {
  DEFAULT: 0,
  PLAYING: 1,
  UPGRADE_AVAILABLE: 2,
  UPGRADE_NOT_AVAILABLE: 3,
  SKILL_SELECTING: 4,
  SKILL_SELECTED: 5,
  ERROR: 6
};

export const REQUEST_STATE = {
  PLAY: 1,
  SELECT_SKILL: 2
};

interface Item {
  state: number;
  error: string;
  report: Report;
  trooper: Trooper;
}

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  
  public list: List = null;
  public STATE = STATE;
  public items: Item[] = null;
  @ViewChild(Content) content: Content;
  public statistics: any = {};
  constructor(
    public navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef,
    private trooperService: TrooperService,
    private params: NavParams,
    public af: AngularFireDatabase,
   ) {
    this.list = this.params.get('list');

    this.items = this.list.troopers.map(trooper => {
      return {
        report: null,
        error: null,
        trooper,
        state: STATE.DEFAULT
      } as Item;
    });

    this.registerForChanges();
    
    this.statistics.totalItems = this.items.length;
    this.statistics.finished = 0;
  }

  public isPlayingMode() {
    return this.statistics.finished > 0;
  }

  private onItemStateUpdated(item, result) {
      const report = result.val();
      if(!report) return;
      
      //item.lastUpdated = report.lastUpdated;
      const date = new Date(report.lastUpdated);
      var datewithouttimezone = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      item.lastUpdated = datewithouttimezone;
      console.log(datewithouttimezone);

      if(item.state === STATE.PLAYING) {
        this.statistics.finished = this.statistics.finished + 1;
      }

      item.state = report.state;

      if (report.state === STATE.ERROR){
          item.error = report.error;
      } else {
          if( report.state === STATE.SKILL_SELECTED ) {
            item.report = null;
          } else {
            item.report = this.createReport(report);
          }          
      }
  }

  public registerForChanges() {
        this.items.forEach((item) => {
          this.af.object(`/results/${item.trooper.name}`, { preserveSnapshot: true })
          .subscribe(result => this.onItemStateUpdated(item, result));
    });
  }

  public forcePlay() {
    this.statistics.totalItems = this.items.length;
    this.statistics.finished = 0;
    this.items.forEach((item) => {
      this.af.object(`/queue/${item.trooper.name}`).set({
        aaa: 'REQUEST_STATE.PLAY'
      });
      item.state = STATE.PLAYING;
    });
  }


  public getAvailableForUpgradeCount() {
    return this.items.filter(item => item.state === STATE.UPGRADE_AVAILABLE).length;
  }

  public onUpgradesAvailableClick() {
    const items = this.items;
    this.navCtrl.push(ContactPage, {items});
  }

  private createReport(report: any): Report {
        return {
              availableSkills: report.upgrade ? [
                ...report.upgrade.map(upgrade => {
                  return {
                    id: upgrade.skillId,
                    name: upgrade.name,
                    icon: upgrade.style.replace('/img', 'assets').substr(13),
                    description: upgrade.description
                  }
                })
              ] : null,
              battles: [true, false, true],
              missions: [true, false, false],
              raid: report.fight[2] && report.fight[2][0],
              skills: [],
              totalMoney: report.skills.money,
              requiredMoney: report.skills.needToUpgrade
            };
  }

  public toPercentage (value) {
    if(this.statistics.finished === this.statistics.totalItems){
      return 'Done!';
    }
    return Math.floor(this.statistics.finished / this.statistics.totalItems * 100)+'%';
  }

  public onUpgradeClicked (item: Item){
    this.navCtrl.push(ContactPage, {item});
  }
}
