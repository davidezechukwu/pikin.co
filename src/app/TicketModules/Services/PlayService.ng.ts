﻿import { Injectable, Injector } from '@angular/core';
import {SuperService}   from '../../CommonModules/SuperModules/Services/SuperService.ng';

@Injectable()
export class PlayService  extends SuperService {
    constructor(protected Injector: Injector) {
        super(Injector);
    };
}
