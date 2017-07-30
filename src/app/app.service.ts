import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Events } from 'ionic-angular';
import { Trooper } from '../../app/trooper/trooper.interface';
import { List } from './list.interface';
import { Http } from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class AppService {
    constructor(
        private http: Http,
        public af: AngularFireDatabase
    ) { }

    public ping() {
        this.af.object(`/ping`, { preserveSnapshot: true })
            .subscribe(result => {
                const data = result.val();
                data.forEach(url => {
                    this.http.get(url)
                        .subscribe((result) => { });
                })
            });
    }
}
