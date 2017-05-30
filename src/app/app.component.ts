import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events  } from 'ionic-angular';
import { Http } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { PlayerPage } from '../pages/player/player';
import { AboutPage } from '../pages/about/about';
import { ListNewPage } from '../pages/list/new/new';
import { ListTroopersPage } from '../pages/list/troopers/troopers';

import { ListsService } from './lists/lists.service';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage || ListTroopersPage;
  public version: any = null;
  pages: Array<{title: string, component: any, params?: any}>;

  constructor(
    private http: Http,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private listsService: ListsService,
    private events: Events,
    private config: EnvConfigurationProvider<any>
  ) {
    const { API_URL } = this.config.getConfig(); 
    this.http.get(API_URL + '/version')
      .map(res => res.json())
      .subscribe((version) => {
        this.version = version;
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.setOptions();

    this.events.subscribe('lists:added', list => {
        this.setOptions();
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
    this.nav.setRoot(AboutPage, {});
    
  }

  onCreateNewListClick(){
    this.nav.setRoot(ListNewPage, {});
  }

  onHomeClick() {
    this.nav.setRoot(HomePage, {});
  }

  openListPage(page) {
    this.nav.setRoot(page.component, page.params);
  }
}
