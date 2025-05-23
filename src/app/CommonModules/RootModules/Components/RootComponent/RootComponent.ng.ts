﻿import { Component, OnInit, Injector, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, animate, state, style } from '@angular/animations';
import * as _ from 'lodash';

import { SuperComponent } from '../../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import CurrencyExchangeRateModelMockDataBuilder from '../../../CoreModules/_MockModules/CurrencyExchangeRateModelMockDataBuilder';
import { FeatureDetectionService } from '../../../CoreModules/Services/FeatureDetectionService.ng';
import { MembersMock } from '../../../../DashboardModules/Security/_MockModules/MemberModelMockDataBuilder';
import {FundingService}   from '../../../../DashboardModules/Funding/Services/FundingService.ng';
import { NumberSystemService } from '../../../../DashboardModules/Game/Services/NumberSystemService.ng';
import DrawModelMockDataBuilder from '../../../../DashboardModules/Game/_MockModules/DrawModelMockDataBuilder';
import { NumberSystemsMock } from '../../../../DashboardModules/Game/_MockModules/NumberSystemModelMockDataBuilder';
import { NumberSystemModelMockDataBuilder } from '../../../../DashboardModules/Game/_MockModules/NumberSystemModelMockDataBuilder';
import GameModelMockDataBuilder from '../../../../DashboardModules/Game/_MockModules/GameModelMockDataBuilder';
import  GameDrawModelMockDataBuilder  from '../../../../DashboardModules/Game/_MockModules/GameDrawModelMockDataBuilder';
import { PrizeModelMockDataBuilder } from '../../../../TicketModules/_MockModules/PrizeModelMockDataBuilder';

@Component({
    selector: 'RootComponent',
    templateUrl: "./RootComponent.ng.html",
    styles: null
})

export default class RootComponent extends SuperComponent implements OnInit {    
    @HostBinding('@.disabled')
    public DisableAnimations:boolean;
    protected IsInitialised: boolean;
    constructor(public Injector: Injector) {
        super(Injector);
    };

    ngOnInit(): void {
        //debugger;              
        super.ngOnInit();        
        this.InitMockEnvironment();
        this.DisableAnimations = this.SessionService.Session.DisableAnimations;
    };

    public InitMockEnvironment() {
        var fundingService: FundingService = new FundingService(this.Injector);
        var numberSystemService: NumberSystemService = new NumberSystemService(this.Injector);
        var membersMock = MembersMock;
        let promises: Promise<any>[] = new Array<Promise<any>>();
        promises.push(new FeatureDetectionService(this.Injector).IsOnLowSpeedConnection());
        promises.push((new CurrencyExchangeRateModelMockDataBuilder()).BuildCurrencyExchangeRatesMock(this.SessionService.Currencies, this.Injector))        
        _.forEach(membersMock, member => promises.push(fundingService.CreateFunding(member)));
        Promise.all(promises)
            .then((results: any[]) => {
                let index = 0;                
                let isOnLowSpeedConnection = results[index++]
                this.SessionService.CurrencyExchangeRates = results[index++];                
                var numberSystems = new NumberSystemModelMockDataBuilder().BuildMockData();
                var games = new GameModelMockDataBuilder().BuildMocksFor10NumberSystem();
                new DrawModelMockDataBuilder().BuildDrawMocks(numberSystems, numberSystemService);
                new GameDrawModelMockDataBuilder().BuildGameDrawMocks(games, numberSystems[0]);
                new PrizeModelMockDataBuilder().BuildMocks();
                this.SessionService.NumberSystems = numberSystems;
                this.SessionService.Games = games;
                this.SessionService.ClearSession();
                this.SessionService.Session.IsOnLowSpeedConnection = isOnLowSpeedConnection;
                numberSystemService.InitMockEnvironment();
                this.IsInitialised = true;
            })
            .catch(reason => this.ErrorHandlingService.HandleError(reason, this.LocalisationService.CaptionConstants.ErrorRootComponentInitFailed, this));
    }
}




