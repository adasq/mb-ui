import { NavController, NavParams, Slides, ActionSheetController, ViewController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-add-word',
  templateUrl: 'add-word.html'
})
export class AddWordPage {
    public word: string;
  constructor(
    public viewController: ViewController,
    public params: NavParams
  ){
      this.word = this.params.get('word');
  }

  public onSaveClick() {
      console.log(this.word);
      this.viewController.dismiss(this.word);
  }

  public dismiss() {
      this.viewController.dismiss(this.word);
  }
}
