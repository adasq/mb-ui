import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { NavController } from 'ionic-angular';


import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
import { ContactPage } from '../contact/contact';
import { ListPage } from '../list/list';

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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public listPage= ListPage;
  public STATE = STATE;
  public items: Item[] = null;
  public statistics: any = {};
  constructor(
    public navCtrl: NavController,
    http: Http
   ) {
     const headers = new Headers({
      "Content-Type": "application/json"
     });
     

     function sendReq(){
        http.post('http://localhost:8100/api/play', {"name": "aaa"}, {headers})
        .map(res => res.json())
        .subscribe(data => {
            console.log('data',data);
        });
     }

    const items = [];

    for(let i =20; i< 40; ++i) {
      items.push({
        state: STATE.DEFAULT,
        trooper: { name: `ziemniaki${i}` }, 
        report: null
      });
    }

    this.statistics.totalItems = items.length;
    this.statistics.finished = 0;

    this.items = items;

    items.forEach(item => {
      item.state = STATE.PLAYING;
      http.post('http://localhost:8100/api/play', {name: item.trooper.name}, {headers})
        .map(res => res.json())
        .subscribe(report => {
            item.report = this.createReport(report);

            if (item.report.availableSkills) {
              item.state = STATE.UPGRADE_AVAILABLE;
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

  public myHeaderFn(record, recordIndex, records) {
    if(record.state === STATE.UPGRADE_AVAILABLE){
        console.log('!!!');
         return 'Available for upgrade ' + this.statistics.upgradable;
    }
    return null;
  }

  private createReport(report: any): Report {
        return {
              availableSkills: report.upgrade ? [
                ...report.upgrade.map(upgrade => {
                  return {
                    id: upgrade.skillId,
                    name: upgrade.name,
                    icon: upgrade.style.replace('img', 'assets').substr(13),
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
