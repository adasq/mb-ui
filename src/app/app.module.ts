import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListTroopersPage } from '../pages/list/troopers/troopers';
import { ListTroopersEditPage } from '../pages/list/troopers/edit/edit';
import { ListTroopersAddPage } from '../pages/list/troopers/add/add';

import { ListSettingsPage } from '../pages/list/settings/settings';
import { ListNewPage } from '../pages/list/new/new';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReportComponent } from './report/report.component'; 
import { ListsService } from './lists/lists.service'; 

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ListPage,
    ListTroopersPage,
    ListTroopersEditPage,
    ListTroopersAddPage,
    ListSettingsPage,
    ListNewPage,
    ReportComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    ListTroopersPage,
    ListTroopersEditPage,
    ListTroopersAddPage,
    ListSettingsPage,
    ListNewPage,
    HomePage,
    ListPage
  ],
  providers: [
    ListsService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
