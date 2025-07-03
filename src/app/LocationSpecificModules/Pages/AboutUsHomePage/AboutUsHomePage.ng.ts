import { Component, Input, OnInit, Injector } from '@angular/core';
import  { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { GameModel } from '../../../DashboardModules/Game/Models/GameModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'AboutUsHomePage',
    templateUrl: './AboutUsHomePage.ng.html',
    styleUrls: ["./AboutUsHomePage.scss"],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule]   
})
export class AboutUsHomePage extends SuperPage {
    public SelectedGame: GameModel = new GameModel();
    constructor(
        injector: Injector        
    ) {
        super(injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }    
}


