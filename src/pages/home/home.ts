import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { NavController } from 'ionic-angular';


import { Report } from '../../app/report/report.interface';
import { Trooper } from '../../app/trooper/trooper.interface';
import { ContactPage } from '../contact/contact';
import { ListPage } from '../list/list';

import 'rxjs/add/operator/map';

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

  public items: Item[] = null;

  constructor(
    public navCtrl: NavController,
    http: Http
   ) {
     const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
     });
     

     function sendReq(){
        http.post('http://localhost:8100/api/play', {"name": "aaa"}, {headers})
        .map(res => res.json())
        .subscribe(data => {
            console.log('data',data);
        });
     }

    const report = {
        availableSkills: [{
            id: 1,
            icon: 'icon',
            name: 'name1',
            description: 'description'
        },{
            id: 2,
            icon: 'icon',
            name: 'name2',
            description: 'description2'
        }],
        battles: [true, false, true],
        missions: [true, false, false],
        raid: 33,
        skills: [],
        totalMoney: 10,
        requiredMoney: 20
    };

    const trooper = {
      name: 'ziemniaki66'
    };

    const items = [];

    for(let i =10; i< 30; ++i) {
      items.push({state: 0, trooper: {
       name: `ziemniaki${i}` 
      }, report: null});
    }

    this.items = items;

    items.forEach(item => {
      http.post('http://localhost:8100/api/play', {name: item.trooper.name}, {headers})
        .map(res => res.json())
        .subscribe(report => {
            item.report = this.createReport(report);
            console.log('data', item.report);
        });
    });
  }

  private createReport(report: any): Report {
      console.log(report.upgrade[0].style.replace('img', 'assets').substr(13))
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
              ] : [],
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
