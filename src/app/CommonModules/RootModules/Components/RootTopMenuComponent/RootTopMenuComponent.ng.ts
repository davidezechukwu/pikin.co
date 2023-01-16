import { Component, Injector, AfterContentChecked } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import MemberModel from '../../../../DashboardModules/Security/Models/MemberModel';

@Component({
    selector: 'RootTopMenuComponent',
    templateUrl: "./RootTopMenuComponent.ng.html",
    styleUrls: ["./RootTopMenuComponent.scss"]
})
export default class RootTopMenuComponent extends SuperComponent implements AfterContentChecked {
    protected AutheticatedMember: MemberModel;    
    constructor(
        protected Injector: Injector,
    ) {
        super(Injector);
    };

    ngAfterContentChecked(): void {        
        super.ngAfterContentChecked();
        var me = this;
        if (this.AuthenticationService.IsAuthenticated) {
            if (this.AutheticatedMember == null || this.AutheticatedMember.ID != this.AuthenticationService.AuthenticatedMemberID) {
                this.AuthenticationService.GetAuthenticatedMember().then(_member => me.AutheticatedMember = _member).catch(me.AutheticatedMember = null);                
            }
        }
        else {
            this.AutheticatedMember = null;
        }        
    };

    onSignOut(): void {
        return this.AuthenticationService.FormAuthenticateSignOut();
    }    
}
 



