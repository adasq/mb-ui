import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Report } from './report.interface';

@Component({
    selector: 'report-component',
    templateUrl: 'report.component.html'
})
export class ReportComponent implements OnInit {
    @Input() report: Report;
    @Output() onSkillSelected = new EventEmitter<number>();

    public selectedSkill = null;
    public skills = null;

    constructor(
        public navCtrl: NavController,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        console.log(this.report);
        this.skills = this.report.skills;
    }

    public selectSkill(skillId: number) {
        this.onSkillSelected.emit(skillId);
    }

    public onSkillClicked(skill) {
        this.selectedSkill = skill;
        this.changeDetectorRef.detectChanges();
    }

}
