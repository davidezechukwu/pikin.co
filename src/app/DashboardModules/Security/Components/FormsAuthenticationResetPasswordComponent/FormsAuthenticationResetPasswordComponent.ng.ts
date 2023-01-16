import { Component, Injector } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import FormsAuthenticationResetPasswordModel from '../../Models/FormsAuthenticationResetPasswordModel';

@Component({    
    selector: 'FormsAuthenticationResetPasswordComponent',
    templateUrl: "./FormsAuthenticationResetPasswordComponent.ng.html",
    styleUrls: ["./FormsAuthenticationResetPasswordComponent.scss"]
})

export default class FormsAuthenticationResetPasswordComponent extends SuperComponent {
    FormsAuthenticationResetPasswordModel: FormsAuthenticationResetPasswordModel;

    constructor(protected Injector: Injector) {
        super(Injector);
        this.FormsAuthenticationResetPasswordModel = new FormsAuthenticationResetPasswordModel();
    };

    protected OnResetPassword(): void {
        var me = this;
        this.AuthenticationService.FormsAuthenticationResetPassword(this.FormsAuthenticationResetPasswordModel)
            .then(formsAuthenticationResetPasswordModel => {
                me.FormsAuthenticationResetPasswordModel = formsAuthenticationResetPasswordModel;
            })
            .catch(reason => {
                me.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorPasswordResetFailed, me);
            });
    }
}




