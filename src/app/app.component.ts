import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddComponent } from '../pages/about/add/add.component';
import { AboutPage } from '../pages/about/about';
import { ListNewPage } from '../pages/list/new/new';
import { ListTroopersPage } from '../pages/list/troopers/troopers';

import { ListsService } from './lists/lists.service';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage || AboutPage || ListTroopersPage;
  public version: any = null;
  pages: Array<{ title: string, component: any, params?: any }>;

  constructor(
    private http: Http,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private listsService: ListsService,
    private events: Events,
    private config: EnvConfigurationProvider<any>,
    public af: AngularFireDatabase
  ) {
    // const { API_URL } = this.config.getConfig();
    // this.http.get(API_URL + '/version')
    //   .map(res => res.json())
    //   .subscribe((version) => {
    //     this.version = version;
    //   });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.setOptions();

    this.events.subscribe('lists:added', () => {
      this.setOptions();
    });

    // this.loadTensionCategories();
  }

  loadTensionCategories() {
    this.af.object(`/subscriptions`, { preserveSnapshot: true })
      .subscribe(result => {
        const data = result.val();
        Object.keys(data).forEach(key => {
          const id = data[key].id;
          this.pages.push({
            title: key,
            component: AboutPage,
            params: { id }
          });
        });
      });
  }

  setOptions() {
    let lists = this.listsService.lists.map(list => {
      return {
        title: list.name,
        component: ListTroopersPage,
        params: {
          list
        }
      };
    });

    this.pages = lists;
  }

  onTensionClick() {
    this.nav.setRoot(AddComponent, {});

  }

  onCreateNewListClick() {
    this.nav.setRoot(ListNewPage, {});
  }

  onHomeClick() {
    this.nav.setRoot(HomePage, {});
  }

  openListPage(page) {
    this.nav.setRoot(page.component, page.params);
  }
}
