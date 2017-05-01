import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Trooper } from '../../app/trooper/trooper.interface';
import { Domain } from '../../app/lists/list.interface';
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

    check(trooper: Trooper, domain: Domain) {
        const {name, pass} = trooper;
        return this.http.post(API + '/check', {
            name, pass, domain
        }, this.options)
            .map(res => res.json());
    }

    selectSkill(trooper: Trooper, skillId: number) {
        return this.http.post(API + '/select-skill', {
            trooper,
            skillId   
        }, this.options)
            .map(res => res.json());
    }

    play(trooper: Trooper, domain: Domain){
        const {name, pass} = trooper;
        return this.http.post(API + '/play', {
            name, pass, domain   
        }, this.options)
            .map(res => res.json());
    }

    runStepByStep(items, actionFn) {
        let i = -1;
        const length = items.length;
        const checkNext = () => {
            i = i + 1;
            if(i == length) return;
            actionFn(items[i], () => {
                checkNext();
            });
        };
        checkNext();
    }
}


