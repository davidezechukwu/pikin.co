import { Component, Input, OnInit, Injector } from '@angular/core';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import {GameService}  from '../../../DashboardModules/Game/Services/GameService.ng';
import {NumberSystemService}  from '../../../DashboardModules/Game/Services/NumberSystemService.ng';
import NumberSystemModel from '../../../DashboardModules/Game/Models/NumberSystemModel';
import { TicketService } from '../../Services/TicketService.ng';
import PrizeModel from '../../Models/PrizeModel';


@Component({
    selector: "WinningTicketListComponent",
    templateUrl: "./WinningTicketListComponent.ng.html",
    styleUrls: ["./WinningTicketListComponent.scss"]
})

export default class WinningTicketListComponent extends SuperComponent implements OnInit  {
    //public NumberSystems: NumberSystemModel[];
    //public CurrentNumberSystems: NumberSystemModel;
    //public Game: GameModel;
    public WinningTickets: PrizeModel[];   
    public SelectedWin: PrizeModel;    

    constructor(        
        protected Injector: Injector,         
        protected GameService: GameService, 
        protected NumberSystemService: NumberSystemService, 
        protected TicketService: TicketService
    ) { 
        super(Injector);
    };    
        
    ngOnInit(): void {
        super.ngOnInit();
        this.GetWinningTickets(null, null);
    }    

    OnSelect(win: PrizeModel): void {
        this.SelectedWin = win;        
    }; 

    GoToDetail(): void {
        this.Router.navigate(['/WinningTickets/', this.SelectedWin.ID]);
    };

    GetWinningTickets(fromPage: number, toPage: number): void {
        var me = this;
        //this.TicketService.GetWinningTickets(this.SessionService.Session.CurrentGame)
        //    .then(WinningTickets => this.WinningTickets = WinningTickets)
        //    .catch(reason => {
                
        //    });    
    }
}




