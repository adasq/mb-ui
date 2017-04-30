import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Trooper } from '../../app/trooper/trooper.interface';
import { EnvConfigurationProvider } from "gl-ionic2-env-configuration";

const API = '/api';

interface Config {
    PRODUCTION: boolean;
    API_URL: string;
}

@Injectable()
export class TrooperService {
    private options = {
        headers: new Headers({
            "Content-Type": "application/json"
        })   
    };
    constructor(
        private config: EnvConfigurationProvider<Config>,
        private http: Http
    ){
        console.log(this.config.getConfig());
    }

    check(trooper: Trooper) {
        return this.http.post(API + '/check', trooper, this.options)
            .map(res => res.json());
    }

    play(trooper: Trooper){
      return this.http.post(API + '/play', trooper, this.options)
        .map(res => res.json());
    }
}


