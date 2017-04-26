import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ListNewPage } from '../pages/list/new/new';

import { ListsService } from './lists/lists.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;

  pages: Array<{title: string, component: any, params?: any}>;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private listsService: ListsService,
    private events: Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.setOptions();
    this.events.subscribe('lists:added', list => {
      console.log('new list added!');
        this.setOptions();
    });


  }

  setOptions() {
    let lists = this.listsService.lists.map(list => {
      return { 
        title: list.name,
        component: ListPage,
        params: {
          list
        }
      };
    });

    this.pages = [
      { title: 'HomePage', component: HomePage },
      ...lists,
      { title: 'AboutPage', component: AboutPage }
    ];
  }

  onCreateNewListClick(){
    this.nav.setRoot(ListNewPage, {});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, page.params);
  }
}
