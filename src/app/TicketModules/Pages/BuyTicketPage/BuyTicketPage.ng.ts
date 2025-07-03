import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PageAnimations } from '../../../CommonModules/CoreModules/Animations/PageAnimations';
import { TicketService } from '../../Services/TicketService.ng';
import { TicketModel } from '../../Models/TicketModel';
import { SuperPage } from '../../../CommonModules/SuperModules/Pages/SuperPage/SuperPage.ng';
import { RootCollapserComponent } from '../../../CommonModules/RootModules/Components/RootCollapserComponent/RootCollapserComponent.ng';
import { RootBackgroundComponent } from '../../../CommonModules/RootModules/Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import { RouterModule } from '@angular/router';
import { SafePipe } from '../../../CommonModules/CoreModules/Pipes/SafePipe/SafePipe.ng';
import { CurrencyModel } from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ticket-details-page',
    templateUrl: 'BuyTicketPage.ng.html',
    styleUrls: ['BuyTicketPage.scss'],
    animations: PageAnimations,
    imports: [RootCollapserComponent, RootBackgroundComponent, RouterModule, SafePipe, GridModule, CommonModule]
})
export class BuyTicketPageComponent
    extends SuperPage
    implements OnInit {
    protected ticket!: TicketModel;
    protected RemainingSeconds: number = 0;
    protected RemainingMinutes: number = 0; 
    protected RemainingHours: number = 0; 
    protected RequiredAmount: CurrencyAmountModel | null | undefined;
    protected Balance: CurrencyAmountModel | null | undefined;
    protected Numbers: string = ""; 
    protected CurrentTime: Date = new Date();
    protected LastClosingDateUTC: Date = new Date();
    protected LastClosingNumbers: string = '';
    protected HasEnoughFunds: boolean = false;
    protected Game: any = {};
    protected TotalPrice: number = 0;
    protected TicketOrders: any[] = [];

    constructor(
        injector: Injector,
        protected ticketService: TicketService,
        private activatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.activatedRoute.paramMap
            .pipe(
                switchMap((params: ParamMap) =>
                    this.ticketService.getTicket(params.get('id')!)
                )
            )
            .subscribe((t: any) => {
                this.ticket = t;
            });
    }
}
