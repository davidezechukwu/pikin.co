import { Component, Input, OnInit, Injector } from '@angular/core';
import SuperPage from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';

@Component({
    selector: 'AboutUsHomePage',
    templateUrl: './AboutUsHomePage.ng.html',
    styleUrls: ["./AboutUsHomePage.scss"],
    animations: PageAnimations   
})
export default class AboutUsHomePage extends SuperPage {
    public SelectedGame: GameModel;
    constructor(
        protected Injector: Injector        
    ) {
        super(Injector);
        this.PageDoesNotRequiresAuthentication = true;
        this.PageIsForAuthentication = false;
    }    
}


