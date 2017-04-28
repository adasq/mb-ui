import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { Trooper } from '../../../../app/trooper/trooper.interface';

const STATE = {
  DEFAULT: 0,
  LOADING: 1,
  ERROR: 2,
  REVIEW: 3
};

@Component({
  selector: 'page-list-troopers-import',
  templateUrl: 'import.html'
})
export class ListTroopersImportPage {

public url = 'http://localhost:8100/list';
public state = STATE.DEFAULT;
public STATE = STATE;

public troopers : Trooper[] = [];
  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private http: Http,
    public viewCtrl: ViewController,
    private clipboard: Clipboard,
    private toastCtrl: ToastController
  ) { }

  public onImportClick() {
    this.setState(STATE.LOADING);
    this.setTroopers();
    setTimeout(() => {
          this.http.get(this.url).subscribe((data) => {
            const text = data.text();
            const list: Trooper[] = createTrooperListByText(text);
            this.setTroopers(list);
            this.setState(STATE.REVIEW);
        }, () => {
          this.setState(STATE.ERROR);
        });
    }, 1000);
  }

  private setTroopers(troopers: Trooper[] = []) {
    this.troopers = troopers;
  }

  private setState(state: number) {
    this.state = state;
  }

  public onAddTroopersClick() {
    this.viewCtrl.dismiss(this.troopers);
  }

  private showError(message: string) {
        this.setState(STATE.ERROR);
        this.toastCtrl.create({message, duration: 3000 }).present();
  }

  public onClipboardClick() {
    this.setState(STATE.LOADING);
        const clipboardText = `
    ziemniaki5
    from
    clipboard
    ziemniaki6
    ziemniaki4
    `;
    
    this.clipboard.copy(clipboardText);

    this.clipboard.paste().then(
      (resolve: string) => {
          const list = createTrooperListByText(resolve);
          this.setTroopers(list);
          this.setState(STATE.REVIEW);
        },
        (reject: string) => {
            this.showError(reject);
            
        });
  }
}

function createTrooperListByText(text: string): Trooper[] {
  const list = text.split('\n').map(line => {
    line = line.trim();
    if(line) {
      return { name: line } as Trooper;
    }else{ 
      return null;
    }
  });

  return list.filter(trooper => trooper !== null);
}