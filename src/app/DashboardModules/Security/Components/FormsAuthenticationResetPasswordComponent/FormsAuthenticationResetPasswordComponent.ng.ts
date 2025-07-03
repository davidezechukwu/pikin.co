import { Component, Injector } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { FormsAuthenticationResetPasswordModel } from '../../Models/FormsAuthenticationResetPasswordModel';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({    
    selector: 'FormsAuthenticationResetPasswordComponent',
    templateUrl: "./FormsAuthenticationResetPasswordComponent.ng.html",
    styleUrls: ["./FormsAuthenticationResetPasswordComponent.scss"],
    imports: [ RouterModule, FormsModule,CommonModule]
})

export class FormsAuthenticationResetPasswordComponent extends SuperComponent {
    FormsAuthenticationResetPasswordModel: FormsAuthenticationResetPasswordModel;

    constructor(injector: Injector) {
        super(injector);
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




