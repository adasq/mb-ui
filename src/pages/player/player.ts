import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';


import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
import { TrooperService } from '../../app/trooper/trooper.service';
import { ContactPage } from '../contact/contact';
import { List } from '../../app/lists/list.interface';

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
    private params: NavParams
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

    this.statistics.totalItems = this.items.length;
    this.statistics.finished = 0;

    let action = (item: Item, cb) => {
      item.state = STATE.PLAYING;
      this.trooperService.play(item.trooper, this.list.domain)
        .subscribe(report => {
            if(report.code){
              item.state = STATE.ERROR;
              item.error = report.message;
            } else {
              item.report = this.createReport(report);
              if (item.report.availableSkills) {
                item.state = STATE.UPGRADE_AVAILABLE;
              } else {
                item.state = STATE.UPGRADE_NOT_AVAILABLE;
              }
            }
            // this.scrollToItem(item);
            cb();
            this.statistics.finished++;
            this.changeDetectorRef.detectChanges();
      });
    }
    this.trooperService.runStepByStep(this.items, action);
  }

  private scrollToItem(item: Item){
    console.log(this.content.scrollTo)
    if(!this.content){
      return console.log(`${item.trooper.name} elem does not exists`);
    }
    this.content.scrollTo(0, (this.items.indexOf(item) + 0) * 67, 400);
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
              raid: report.fight[2][0],
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
