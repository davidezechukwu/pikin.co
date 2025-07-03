import { Component, Input, OnInit, Injector } from '@angular/core';
import  { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import {GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { PlayComponent } from '../../../TicketModules/Components/PlayComponent/PlayComponent.ng'; PlayComponent
import { FormsAuthenticationLoginComponent } from '../../../DashboardModules/Security/Components/FormsAuthenticationLoginComponent/FormsAuthenticationLoginComponent.ng';
import { FormsAuthenticationRegisterComponent } from '../../../DashboardModules/Security/Components/FormsAuthenticationRegisterComponent/FormsAuthenticationRegisterComponent.ng';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'HomePage',
    templateUrl: './HomePage.ng.html',
    styleUrls: ["./HomePage.scss"],
    animations: PageAnimations ,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, SafePipe, PlayComponent, FormsAuthenticationLoginComponent, FormsModule, CommonModule ]
})
export class HomePage extends SuperPage {
    public SelectedGame: GameModel = new GameModel();
    constructor(
        injector: Injector        
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }    
}


