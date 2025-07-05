import { Injector, Component, OnInit} from '@angular/core';
import { SuperComponent } from '../../../CommonModules/SuperModules/Components/SuperComponent/SuperComponent.ng';
import { TicketService } from '../../Services/TicketService.ng';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from '../../../CommonModules/CoreModules/Services/SubscriptionsService .ng';

@Component({
    selector: 'TotalPayoutComponent',
    templateUrl: "./TotalPayoutComponent.ng.html",
    styles: [],
    imports :[SafePipe, CommonModule ]
})
export class TotalPayoutComponent extends SuperComponent {
    protected TotalPrizes: CurrencyAmountModel;
    protected TotalWinningTickets: number;
    protected Subscription: Subscription | null | undefined;

    constructor(
        injector: Injector,
        protected TicketService: TicketService,
        protected SubscriptionsService: SubscriptionsService
    ) { 
        super(injector); 
        this.TotalPrizes = new CurrencyAmountModel(0, this.SessionService.DefaultCurrency);
        this.TotalWinningTickets = 0;     
        this.TicketService = TicketService;     
        this.Subscription = this.SubscriptionsService.Subscription;
    };

    override ngOnInit(): void {
        super.ngOnInit();
        this.TicketService.GetTotalWinningTickets()
            .then(totalWinningTickets => { this.TotalWinningTickets = totalWinningTickets; })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalWinningTickets, this) );
        this.TicketService.GetTotalPrizes()
            .then(totalPrizes => this.TotalPrizes = totalPrizes)
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorGetTotalPrizes, this));
        
        this.SubscriptionsService.Add(this.TicketService.GetTotalWinningTicketsObservable().subscribe({
                next: total => this.TotalWinningTickets = total,
            error: err => this.ErrorHandlingService.HandleError(err, this.LocalisationService.CaptionConstants.ErrorGetTotalWinningTickets, this),
              }));

        this.SubscriptionsService.Add(this.TicketService.GetTotalPrizesObservable().subscribe({
            next: totalPrizes => this.TotalPrizes = totalPrizes,
            error: err => this.ErrorHandlingService.HandleError(err, this.LocalisationService.CaptionConstants.ErrorGetTotalWinningTickets, this),
        }));
    };

    public ngOnDestroy() {
        this.SubscriptionsService.Unsubscribe();
    }
}




