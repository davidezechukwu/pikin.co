import { Component, OnInit, Injector, HostBinding } from '@angular/core';
import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import { CurrencyExchangeRateModelMockDataBuilder } from '../../../CoreModules/_MockModules/CurrencyExchangeRateModelMockDataBuilder';
import { FeatureDetectionService } from '../../../CoreModules/Services/FeatureDetectionService.ng';
import { MembersMock } from '../../../../DashboardModules/Security/_MockModules/MemberModelMockDataBuilder';
import { FundingService }   from '../../../../DashboardModules/Funding/Services/FundingService.ng';
import { NumberSystemService } from '../../../../DashboardModules/Game/Services/NumberSystemService.ng';
import { DrawModelMockDataBuilder } from '../../../../DashboardModules/Game/_MockModules/DrawModelMockDataBuilder';
import { NumberSystemModelMockDataBuilder } from '../../../../DashboardModules/Game/_MockModules/NumberSystemModelMockDataBuilder';
import { GameModelMockDataBuilder } from '../../../../DashboardModules/Game/_MockModules/GameModelMockDataBuilder';
import { GameDrawModelMockDataBuilder }  from '../../../../DashboardModules/Game/_MockModules/GameDrawModelMockDataBuilder';
import { PrizeModelMockDataBuilder } from '../../../../TicketModules/_MockModules/PrizeModelMockDataBuilder';
import { RouterModule } from '@angular/router';
import { RootTopMenuComponent } from '../RootTopMenuComponent/RootTopMenuComponent.ng';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'RootComponent',
    templateUrl: "RootComponent.ng.html",
    styles: [],
    standalone: true,
    imports: [RootTopMenuComponent, RouterModule, RouterOutlet, CommonModule],
})
export class RootComponent extends SuperComponent implements OnInit {    
    @HostBinding('@.disabled')
    public DisableAnimations:boolean =false;
    protected IsInitialised: boolean = false;
    constructor
    (
        injector: Injector,
        protected NumberSystemService: NumberSystemService 
    ) {
        super(injector);
    };

    override ngOnInit(): void {      
        super.ngOnInit();        
        this.InitMockEnvironment();
        this.DisableAnimations = this.SessionService.Session?.DisableAnimations!;
    };

    public InitMockEnvironment() {
        var fundingService: FundingService = new FundingService(this.Injector);
        //var numberSystemService: NumberSystemService = new NumberSystemService(this.Injector);
        var membersMock = MembersMock;
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(new FeatureDetectionService(this.Injector).IsOnLowSpeedConnection());
        promises.push((new CurrencyExchangeRateModelMockDataBuilder()).BuildCurrencyExchangeRatesMock(this.SessionService.Currencies, this.Injector))        
        membersMock.forEach((member : any) => promises.push(fundingService.CreateFunding(member)));
        Promise.all(promises)
            .then((results: any[]) => {                
                let index = 0;                
                let isOnLowSpeedConnection = results[index++]
                this.SessionService.CurrencyExchangeRates = results[index++];                
                var numberSystems = new NumberSystemModelMockDataBuilder().BuildMockData();
                var games = new GameModelMockDataBuilder().BuildMocksFor10NumberSystem();                
                new DrawModelMockDataBuilder().BuildDrawMocks(numberSystems, this.NumberSystemService);
                new GameDrawModelMockDataBuilder().BuildGameDrawMocks(games, numberSystems[0]);
                new PrizeModelMockDataBuilder().BuildMocks();
                this.SessionService.NumberSystems = numberSystems;
                this.SessionService.Games = games;
                this.SessionService.ClearSession();
                this.SessionService.Session!.IsOnLowSpeedConnection = isOnLowSpeedConnection;                
                this.NumberSystemService.InitMockEnvironment();
                this.IsInitialised = true;
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorRootComponentInitFailed, this));
    }
}




