import { Injector, Injectable } from '@angular/core';

@Injectable()
export class CachingService {    
    constructor(
        protected Injector: Injector
    ) {
        
    };

    ReadCache(key: string): any {
        if (typeof (Storage) !== "undefined") {
            var value = localStorage.getItem(key);
            if (!value) {
                return value;
            }
            return JSON.parse(value);
        } else {
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
        }
    }
}
