﻿import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {SessionService}   from '../../CoreModules/Services/SessionService.ng';
import {ErrorHandlingService}   from '../../CoreModules/Services/ErrorHandlingService.ng';
import {NotificationService}   from '../../CoreModules/Services/NotificationService.ng';
import {GlobalisationService}  from '../../CoreModules/Services/GlobalisationService.ng';
import {LocalisationService}   from '../../CoreModules/Services/LocalisationService.ng';

@Injectable()
export class SuperService {
    protected readonly SessionService: SessionService;
    protected readonly  ErrorHandlingService: ErrorHandlingService;
    protected  NotificationService: NotificationService;
    protected GlobalisationService: GlobalisationService;
    protected LocalisationService: LocalisationService;
    protected Router: Router;
    constructor(public Injector: Injector) {
        this.Router = this.Injector.get(Router);
        this.SessionService = this.Injector.get(SessionService);   
        this.ErrorHandlingService = this.Injector.get(ErrorHandlingService);
        this.GlobalisationService = this.Injector.get(GlobalisationService);    
        this.LocalisationService = this.Injector.get(LocalisationService);    
        this.NotificationService = this.Injector.get(NotificationService);    
    }
    
    Localise(displayName: string, name?: string, ...formatData: string[]): string {
        var phrase = this.LocalisationService.GetCaptionNow(this.constructor.name, name!, displayName);
        for (var c = 0; c < formatData.length; c++) {
            phrase = phrase.replace("{" + c + "}", formatData[c]);
        }
        return phrase;
    }
};    

  
