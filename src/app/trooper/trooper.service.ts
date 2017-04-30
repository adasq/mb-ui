import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Trooper } from '../../app/trooper/trooper.interface';

const API = '/api2';

@Injectable()
export class TrooperService {
    private options = {
     headers: new Headers({
            "Content-Type": "application/json"
    })   
    };
    constructor(
        private http: Http
    ){}

    check(trooper: Trooper) {
        return this.http.post(API + '/check', trooper, this.options)
            .map(res => res.json());
    }

    play(trooper: Trooper){
      return this.http.post(API + '/play', trooper, this.options)
        .map(res => res.json());
    }
}


