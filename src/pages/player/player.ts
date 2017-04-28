import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { NavController, NavParams } from 'ionic-angular';


import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
import { ContactPage } from '../contact/contact';
import { ListPage } from '../list/list';
import { List } from '../../app/lists/list.interface';

import 'rxjs/add/operator/map';

export const STATE = {
  DEFAULT: 0,
  PLAYING: 1,
  UPGRADE_AVAILABLE: 2,
  UPGRADE_NOT_AVAILABLE: 3,
  SKILL_SELECTING: 4
};

interface Item {
  state: number;
  report: Report;
  trooper: Trooper;
}

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {
  
  public listPage= ListPage;
  public list: List = null;
  public STATE = STATE;
  public items: Item[] = null;
  public statistics: any = {};
  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    http: Http
   ) {
     const headers = new Headers({
      "Content-Type": "application/json"
     });

    this.list = this.params.get('list');
    
    this.items = this.list.troopers.map(trooper => {
      return {
        report: null,
        trooper,
        state: STATE.DEFAULT
      } as Item;
    })
    
    // for(let i = 2; i< 6; ++i) {
    //   items.push({
    //     state: STATE.DEFAULT,
    //     trooper: { name: `ziemniaki${i}` }, 
    //     report: null
    //   });
    // }

    this.statistics.totalItems = this.items.length;
    this.statistics.finished = 0;
    const API = 'http://localhost:8100/api' || 'https://minibotters.herokuapp.com';

    this.items.forEach(item => {
      item.state = STATE.PLAYING;
      http.post(API + '/play', {name: item.trooper.name}, {headers})
        .map(res => res.json())
        .subscribe(report => {
            item.report = this.createReport(report);

            if (item.report.availableSkills) {
              item.state = STATE.UPGRADE_AVAILABLE;
            } else {
              item.state = STATE.UPGRADE_NOT_AVAILABLE;
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
