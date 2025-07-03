import { Injector, Injectable } from '@angular/core';
import { SuperComponent } from '../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import {LocalisationService}   from './LocalisationService.ng';
import {NotificationService}   from './NotificationService.ng';

@Injectable()
export class ErrorHandlingService {
    protected LocalisationService: LocalisationService;
    protected NotificationService: NotificationService;
    constructor(
        protected Injector: Injector
    ) {
        this.LocalisationService = this.Injector.get(LocalisationService);
        this.NotificationService = this.Injector.get(NotificationService);
    };

    HandleError(reason: string, displayErrorMessage: string, component?: SuperComponent,  ...formatData: string[]): void {        
        console.log(reason);
        if (component) {
            displayErrorMessage = this.LocalisationService.GetCaptionNow(component.constructor.name, '',  displayErrorMessage);
            component.ErrorMessage = displayErrorMessage;
        }
        for (var c = 0; c < formatData.length; c++) {
            displayErrorMessage = displayErrorMessage.replace("{" + c + "}", formatData[c]);
        }    
        this.NotificationService.ShowError(displayErrorMessage);
        /*
        There’s a Problem
        There’s been a problem getting the page you want.
        Please try again by clicking here.
        If you continue to see this error message, please report the problem by clicking here and provide the error message below.


        Diagnostic Information
           URL: /Billing/eaO2/ChangeDashboard.do?pageName=CCAAgreement&account=1004758080&return_url=https%3A//mymobile.o2.co.uk/paymonthly/ccaphoneplan?disambiguation_id=85d613bf-6748-4026-8405-12515de22859
           Error Code: o20x13212072ae
           Userid: unauthenticated
           Date/time: 17/08/2017 23:13:48
        */
    };
}