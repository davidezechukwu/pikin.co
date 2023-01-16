import { Injector, Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CachingService {
    //protected SessionService: SessionService;
    constructor(
        protected Injector: Injector
    ) {
        //this.SessionService = this.Injector.get(SessionService);
    };

    ReadCache(key: string): any {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem(key);
            if (!value) {
                return value;
            }
            return JSON.parse(value);
        } else {
            // Sorry! No Web Storage support..
            return null;
        }
    }

    UpdateCache(key: string, value : any ): void{
        if (typeof (Storage) !== "undefined") {
            if (!value) {
                return;
            }
            localStorage.setItem(key, JSON.stringify(value));            
        } else {
            // Sorry! No Web Storage support..            
        }
    }
}
