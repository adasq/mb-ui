import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Report } from './report.interface';

@Component({
  selector: 'report-component',
  templateUrl: 'report.component.html'
})
export class ReportComponent {
    @Input() report: Report;
    @Output() onSkillSelected = new EventEmitter<number>();
 
  constructor(public navCtrl: NavController) {
  }

  public selectSkill(skillId: number){
    this.onSkillSelected.emit(skillId);
  }

}
