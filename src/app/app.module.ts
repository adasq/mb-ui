import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { PlayerPage } from '../pages/player/player';

import { ListTroopersPage } from '../pages/list/troopers/troopers';
import { ListTroopersEditPage } from '../pages/list/troopers/edit/edit';
import { ListTroopersAddPage } from '../pages/list/troopers/add/add';
import { ListTroopersImportPage } from '../pages/list/troopers/import/import';

import { ListSettingsPage } from '../pages/list/settings/settings';
import { ListNewPage } from '../pages/list/new/new';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ReportComponent } from './report/report.component'; 
import { ListsService } from './lists/lists.service'; 
import { TrooperService } from './trooper/trooper.service'; 

import { TrooperEditComponent } from './trooper/edit/edit.component';
import { ListEditComponent } from './lists/edit/edit.component';


import { Clipboard } from '@ionic-native/clipboard';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { GLIonic2EnvConfigurationModule } from 'gl-ionic2-env-configuration';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'f0adb118'
  }
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PlayerPage,
    ListTroopersPage,
    ListTroopersEditPage,
    ListTroopersAddPage,
    ListTroopersImportPage,
    ListSettingsPage,
    ListNewPage,
    ReportComponent,
    TrooperEditComponent,
    ListEditComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    GLIonic2EnvConfigurationModule,
    CloudModule.forRoot(cloudSettings),
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
    ListTroopersImportPage,
    ListSettingsPage,
    ListNewPage,
    HomePage,
    PlayerPage
  ],
  providers: [
    TrooperService,
    ListsService,
    StatusBar,
    SplashScreen,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
