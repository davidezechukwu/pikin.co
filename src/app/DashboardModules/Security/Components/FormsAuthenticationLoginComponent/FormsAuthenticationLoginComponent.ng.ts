import { Component, Injector, Input, Output, EventEmitter } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { FormsAuthenticationLoginModel } from '../../Models/FormsAuthenticationLoginModel';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({    
    selector: 'FormsAuthenticationLoginComponent',
    templateUrl: "./FormsAuthenticationLoginComponent.ng.html",
    styleUrls: ['./FormsAuthenticationLoginComponent.scss'],
    imports: [FormsModule, RouterModule, CommonModule]
})
export class FormsAuthenticationLoginComponent extends SuperComponent {
    @Output() OnChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    protected FormsAuthenticationLoginModel: FormsAuthenticationLoginModel;
    constructor(injector: Injector) {
        super(injector);
        this.FormsAuthenticationLoginModel = new FormsAuthenticationLoginModel();
        this.FormsAuthenticationLoginModel.Username = "TestMember" + (new Date( ).getTime() % 30)  +"@piKin.co";
    };

    protected OnLogin(): void {
        var me = this;
        this.AuthenticationService.FormsAuthenticationLogin(this.FormsAuthenticationLoginModel)
            .then(formsAuthenticationLoginModel => {
                me.FormsAuthenticationLoginModel = formsAuthenticationLoginModel;                
                me.OnChange.emit(this.AuthenticationService.IsAuthenticated);
            })
            .catch(reason => {
                me.ErrorHandlingService.HandleError(reason, me.LocalisationService.CaptionConstants.ErrorLoginFailed, me);
                me.OnChange.emit(false);
            });
    }
    //protected OnRegister(): void {
    //    this.Router.navigate(['/register']);
    //}
}








