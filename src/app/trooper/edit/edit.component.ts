import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Trooper } from '../../trooper/trooper.interface';
import { TrooperService } from '../../trooper/trooper.service';

export const STATE = {
  DEFAULT: 1,
  CHECKING: 2,
  ERROR: 3,
  SUCCESS: 4
};

@Component({
  selector: 'trooper-edit-component',
  templateUrl: 'edit.component.html'
})
export class TrooperEditComponent {
    public currentState = STATE.DEFAULT;
    public STATE = STATE;

    @Input() trooper: Trooper;
    @Input() buttonText: string;
    @Output() onStateChanged: EventEmitter<number> = new EventEmitter<number>();
    
    constructor(
      private toastCtrl: ToastController,
      private changeDetectorRef: ChangeDetectorRef,
      private trooperService: TrooperService
    ) { }


  private checkTrooper() {
    this.setState(STATE.CHECKING);
    this.changeDetectorRef.detectChanges();
    return this.trooperService.check(this.trooper);
  }

  private setState(state: number) {
    this.currentState = state;
    this.onStateChanged.emit(state);
  }

  private showError(message: string) {
    this.toastCtrl
      .create({message, duration: 3000 })
      .present();
  }

  public onSaveClick() {
      this.checkTrooper()
        .subscribe(result => {
          if(result.code === 201) {
            this.setState(STATE.SUCCESS);
          } else {
            this.setState(STATE.ERROR);
            this.showError(result.message);
          }
        }, () => {
          this.setState(STATE.ERROR);
          this.showError('connection issue...');
      });
  }
}
