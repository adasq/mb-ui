import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild(Slides) slidesElem: Slides;
  constructor(
    private cd: ChangeDetectorRef,
    public navCtrl: NavController
  ) {
  }

}
