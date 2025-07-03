import { Component, Injector, AfterContentChecked } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import { MemberModel } from '../../../../DashboardModules/Security/Models/MemberModel';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'RootTopMenuComponent',
    templateUrl: "./RootTopMenuComponent.ng.html",
    styleUrls: ["./RootTopMenuComponent.scss"],
    imports: [FormsModule, RouterModule, SafePipe, CommonModule   ]
})
export class RootTopMenuComponent extends SuperComponent implements AfterContentChecked {
    public AutheticatedMember : MemberModel| null = null;    
    constructor(
        injector: Injector,
    ) {
        super(injector);
    };

    override ngAfterContentChecked(): void {        
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
 



