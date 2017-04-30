import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
  ERROR: 5
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
  public statistics: any = {};
  constructor(
    public navCtrl: NavController,
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

    this.items.forEach(item => {
      item.state = STATE.PLAYING;
      this.trooperService.play(item.trooper)
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
            this.statistics.finished++;
        });
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
              raid: report.fight[2][0],
              skills: [],
              totalMoney: report.skills.money,
              requiredMoney: report.skills.needToUpgrade
            };
  }

  public onUpgradeClicked (item: Item){
    this.navCtrl.push(ContactPage, {item});
  }
}
