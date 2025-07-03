import { Injectable, Injector } from '@angular/core';
import {SuperService}   from '../../CommonModules/SuperModules/Services/SuperService.ng';

@Injectable()
export class PlayService  extends SuperService {
    constructor(injector: Injector) {
        super(injector);
    };
}
