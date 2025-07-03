import { Injector, Component, OnInit} from '@angular/core';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { TicketService } from '../../Services/TicketService.ng';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'TotalPayoutComponent',
    templateUrl: "./TotalPayoutComponent.ng.html",
    styles: [],
    imports :[SafePipe, CommonModule ]
})
export class TotalPayoutComponent extends SuperComponent {
    protected TotalPrizes: CurrencyAmountModel;
    protected TotalWinningTickets: number;
    constructor(
        injector: Injector,
        protected TicketService: TicketService
    ) { 
        super(injector); 
        this.TotalPrizes = new CurrencyAmountModel(0, this.SessionService.Session?.CurrentCurrency!);
        this.TotalWinningTickets = 0;     
        this.TotalPrizes.Amount = 0;        
        this.TicketService = TicketService;
     
    };

    override ngOnInit(): void {
        super.ngOnInit();
        this.TicketService.GetTotalWinningTickets()
            .then(totalWinningTickets => { this.TotalWinningTickets = totalWinningTickets; })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalWinningTickets, this) );
        this.TicketService.GetTotalPrizes()
            .then(totalPrizes => this.TotalPrizes = totalPrizes)
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalPrizes, this));
    };
}




