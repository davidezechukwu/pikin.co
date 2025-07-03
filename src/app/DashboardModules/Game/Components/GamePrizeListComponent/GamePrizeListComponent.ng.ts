import { Injector, Component, OnInit, Input, DoCheck } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { PrizeModel } from '../../../../TicketModules/Models/PrizeModel';
import { TicketService } from '../../../../TicketModules/Services/TicketService.ng';
import { GameModel } from '../../../../DashboardModules/Game/Models/GameModel';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CommonModule } from '@angular/common';
@Component({    
    selector: 'GamePrizeListComponent',
    templateUrl: "./GamePrizeListComponent.ng.html",
    styleUrls: ['./GamePrizeListComponent.scss'],
    imports: [  RouterModule, SafePipe, CommonModule ]
})
export class GamePrizeListComponent extends SuperComponent implements DoCheck{
    protected Prizes: PrizeModel[] = [];
    @Input() public Game: GameModel = new GameModel();
    constructor(
        injector: Injector,
        protected TicketService: TicketService
    ) { 
        super(injector); 
    };

    override ngOnInit(): void {
        super.ngOnInit();
        this.Refresh();
    };

    override ngDoCheck(): void {
        super.ngDoCheck();
        if (this.Game && (!this.Prizes || this.Prizes.length == 0  || this.Prizes[0].Game.ID != this.Game.ID)) {
            this.Refresh();
        }
    };    


    protected GetPrizeCaption(prize: PrizeModel): string {                
        return this.Localise(this.LocalisationService.CaptionConstants.PrizeWin + prize.DisplayName, '', this.GlobalisationService.FormatCurrency(this.GlobalisationService.ToSessionCurrency(prize.WinPrice), true));                
    }

    private Refresh(): void {
        if (this.Game) {
            this.TicketService.GetPrizes(this.Game)
                .then(prizes => this.Prizes = prizes)
                .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGamePrizeListComponentInitFailed, this));
        }
    }
}




