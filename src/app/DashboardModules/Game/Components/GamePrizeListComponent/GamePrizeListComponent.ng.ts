import { Injector, Component, OnInit, Input, DoCheck } from '@angular/core';
import { SuperComponent } from '../../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import PrizeModel from '../../../../TicketModules/Models/PrizeModel';
import { TicketService } from '../../../../TicketModules/Services/TicketService.ng';
import CurrencyAmountModel from '../../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import GameModel from '../../../../DashboardModules/Game/Models/GameModel';

@Component({    
    selector: 'GamePrizeListComponent',
    templateUrl: "./GamePrizeListComponent.ng.html",
    styleUrls: ['./GamePrizeListComponent.scss']
})
export default class GamePrizeListComponent extends SuperComponent implements DoCheck{
    protected Prizes: PrizeModel[];
    @Input() public Game: GameModel;
    constructor(
        Injector: Injector,
        protected TicketService: TicketService
    ) { 
        super(Injector); 
    };

    ngOnInit(): void {
        super.ngOnInit();
        this.Refresh();
    };

    ngDoCheck(): void {
        super.ngDoCheck();
        if (this.Game && (!this.Prizes || this.Prizes[0].Game.ID != this.Game.ID)) {
            this.Refresh();
        }
    };    


    protected GetPrizeCaption(prize: PrizeModel): string {                
        return this.Localise(this.LocalisationService.CaptionConstants.PrizeWin + prize.DisplayName, null, this.GlobalisationService.FormatCurrency(this.GlobalisationService.ToSessionCurrency(prize.WinPrice), true));                
    }

    private Refresh(): void {
        if (this.Game) {
            this.TicketService.GetPrizes(this.Game)
                .then(prizes => this.Prizes = prizes)
                .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGamePrizeListComponentInitFailed, this));
        }
    }
}




