import { Component, Injector, Input, Output, EventEmitter } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import FormsAuthenticationRegisterModel from '../../Models/FormsAuthenticationRegisterModel';

@Component({    
    selector: 'FormsAuthenticationRegisterComponent',
    templateUrl: "./FormsAuthenticationRegisterComponent.ng.html",
    styleUrls: ['./FormsAuthenticationRegisterComponent.scss'],    
})

export default class FormsAuthenticationRegisterComponent extends SuperComponent {
    @Output() OnChange: EventEmitter<boolean> = new EventEmitter<boolean>()
    FormsAuthenticationRegisterModel: FormsAuthenticationRegisterModel;

    constructor(protected Injector: Injector) {
        super(Injector);
        this.FormsAuthenticationRegisterModel = new FormsAuthenticationRegisterModel();
        this.FormsAuthenticationRegisterModel.Username = "P" + (new Date().getTime() % 400000) + '-demo-' + (new Date().getTime() % 400000) + "@piKin.co";
    };
    
    protected OnRegister(): void {
        var me = this;
        this.AuthenticationService.FormsAuthenticationRegister(me.FormsAuthenticationRegisterModel)
            .then(formsAuthenticationRegisterModel => {
                me.FormsAuthenticationRegisterModel = formsAuthenticationRegisterModel
                me.OnChange.emit(me.AuthenticationService.IsAuthenticated);
            })
            .catch(function (reason) {
                me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.ErrorRegistrationFailed, me);
                me.OnChange.emit(false);
            });
    }
}








