import { Component, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AngularFireDatabase } from 'angularfire2/database';
import { Trooper } from '../../../../app/trooper/trooper.interface';
import { HomePage } from '../../../home/home';
const STATE = {
    DEFAULT: 0,
    LOADING: 1,
    ERROR: 2,
    REVIEW: 3
};

const MODE = {
    DEFAULT: 0,
    QR: 1,
    URL: 2,
    CLIPBOARD: 3
};

@Component({
    selector: 'page-list-troopers-import',
    templateUrl: 'import.html'
})
export class ListTroopersImportPage {

    public url = 'http://localhost:8100/list';
    public state = STATE.DEFAULT;
    public STATE = STATE;
    public MODE = MODE;
    public mode = MODE.DEFAULT;

    public homePage: HomePage

    public troopers: Trooper[] = [];
    constructor(
        public navCtrl: NavController,
        public params: NavParams,
        private http: Http,
        public viewCtrl: ViewController,
        private clipboard: Clipboard,
        private toastCtrl: ToastController,
        private barcodeScanner: BarcodeScanner,
        private changeDetectorRef: ChangeDetectorRef,
        public af: AngularFireDatabase
    ) {
    }

    public onImportClick() {
        this.setState(STATE.LOADING);
        this.setTroopers();
        this.http.get(this.url).subscribe((data) => {
            const text = data.text();
            const list: Trooper[] = createTrooperListByText(text);
            this.setTroopers(list);
            this.setState(STATE.REVIEW);
        }, () => {
            this.setState(STATE.ERROR);
        });
    }
    public onDismissClick() {
        this.viewCtrl.dismiss();
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

    public setMode(mode) {
        this.mode = mode;
        this.changeDetectorRef.detectChanges();
    }

    public onQRClick() {
        this.setState(STATE.LOADING);
        this.setTroopers();
        this.readQr((err, id) => {
            if (err) {
                this.setState(STATE.DEFAULT);
            } else {
                this.loadTroopers(id);
            }
        });
    }

    private loadTroopers(id) {
        this.af.object(`/lists/${id}/list`, { preserveSnapshot: true })
            .subscribe(result => {
                const list = result.val().map(xxx => {
                    return {
                        name: xxx.name,
                        pass: xxx.pswd
                    };
                });
                this.setTroopers(list);
                this.setState(STATE.REVIEW);
            });
    }

    private readQr(cb) {
        this.barcodeScanner.scan().then((barcodeData) => {
            if (!barcodeData.cancelled && barcodeData.format === 'QR_CODE') {
                cb(false, barcodeData.text);
            } else {
                cb(true);
            }
        }, (err) => cb(err));
    }

    private showError(message: string) {
        this.setState(STATE.ERROR);
        this.toastCtrl.create({ message, duration: 3000 }).present();
    }

    public onClipboardClick() {
        this.setMode(MODE.CLIPBOARD);
        //     const clipboardText = `
        // ziemniaki5
        // from
        // clipboard
        // ziemniaki6
        // ziemniaki4
        // `;

        //     this.clipboard.copy(clipboardText);

        this.clipboard.paste().then((resolve: string) => {
            const list = createTrooperListByText(resolve);
            this.setTroopers(list);
            this.setState(STATE.REVIEW);
        }, (reject: string) => {
            this.showError(reject);
        });
    }
}

function createTrooperListByText(text: string): Trooper[] {
    const list = text.split('\n').map(line => {
        line = line.trim();
        if (line) {
            return { name: line } as Trooper;
        } else {
            return null;
        }
    });

    return list.filter(trooper => trooper !== null);
}