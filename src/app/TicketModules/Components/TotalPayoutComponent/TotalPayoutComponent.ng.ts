import { Injector, Component, OnInit} from '@angular/core';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { TicketService } from '../../Services/TicketService.ng';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';

@Component({
    selector: 'TotalPayoutComponent',
    templateUrl: "./TotalPayoutComponent.ng.html",
    styles: null
})
export default class TotalPayoutComponent extends SuperComponent {
    protected TotalPrizes: CurrencyAmountModel;
    protected TotalWinningTickets: number;
    constructor(
        Injector: Injector,
        protected TicketService: TicketService
    ) { 
        super(Injector); 
    };

    ngOnInit(): void {
        super.ngOnInit();
        this.TicketService.GetTotalWinningTickets()
            .then(totalWinningTickets => { this.TotalWinningTickets = totalWinningTickets; })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalWinningTickets, this) );
        this.TicketService.GetTotalPrizes()
            .then(totalPrizes => this.TotalPrizes = totalPrizes)
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalPrizes, this));
    };
}




