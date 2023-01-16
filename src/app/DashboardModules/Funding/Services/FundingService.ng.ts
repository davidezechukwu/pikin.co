import { Injectable, Injector } from '@angular/core';
import MemberModel from '../../../DashboardModules/Security/Models/MemberModel';
import FundingModel from '../Models/FundingModel';
import FundingCheckBalanceResultModel from '../Models/FundingCheckBalanceResultModel'; 
import FundingModelMockDataBuilder from '../_MockModules/FundingModelMockDataBuilder';
import GameModel from '../../../DashboardModules/Game/Models/GameModel';
import {SuperService}   from '../../../CommonModules/SuperModules/Services/SuperService.ng';
import CurrencyAmountModel from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';


@Injectable()
export class FundingService extends SuperService{    
    constructor(protected Injector: Injector) {
        super(Injector);
    };

    CreateFunding(member: MemberModel): Promise<FundingModel> {
        member.Funding = new FundingModelMockDataBuilder().BuildMock(member);
        return Promise.resolve(member.Funding);
    }    

    GetFunding(member: MemberModel): Promise<FundingModel> {          
        return Promise.resolve(member.Funding);        
    }   

    AddFunding(member: MemberModel, funds: CurrencyAmountModel): Promise<FundingModel> {
        var fundingInMemberCurrency = this.GlobalisationService.SwitchAmountToOtherCurrency(funds, member.Funding.Balance.Currency);
        member.Funding.Balance.Amount += fundingInMemberCurrency.Amount;        
        return Promise.resolve(member.Funding);
    }  

    IsThereEnoughFundingForGame(member: MemberModel, game: GameModel): Promise<FundingCheckBalanceResultModel>{
        return new Promise((resolve, reject) => {
            this.GetFunding(member).then(funding => {
                var memberBalanceInGameCurrency = this.GlobalisationService.SwitchAmountToOtherCurrency(funding.Balance, game.Price.Currency);
                var fundingCheckBalanceResult = new FundingCheckBalanceResultModel();
                fundingCheckBalanceResult.HasEnoughFunding = memberBalanceInGameCurrency.Amount >= game.Price.Amount;
                if (fundingCheckBalanceResult.HasEnoughFunding) {
                    fundingCheckBalanceResult.RequiredAmount = new CurrencyAmountModel(0, game.Price.Currency);;
                } else {
                    fundingCheckBalanceResult.RequiredAmount = new CurrencyAmountModel(game.Price.Amount - memberBalanceInGameCurrency.Amount, game.Price.Currency);
                }
                fundingCheckBalanceResult.Balance = memberBalanceInGameCurrency; 
                resolve(fundingCheckBalanceResult);
            }).catch(reason => reject(reason));
        });        
    }

    IsThereEnoughFunding(member: MemberModel, price: CurrencyAmountModel ): Promise<FundingCheckBalanceResultModel> {
        return new Promise((resolve, reject) => {
            this.GetFunding(member).then(funding => {
                var memberBalanceInGameCurrency = this.GlobalisationService.SwitchAmountToOtherCurrency(funding.Balance, price.Currency);
                var fundingCheckBalanceResult = new FundingCheckBalanceResultModel();
                fundingCheckBalanceResult.HasEnoughFunding = memberBalanceInGameCurrency.Amount >= price.Amount;
                if (fundingCheckBalanceResult.HasEnoughFunding) {
                    fundingCheckBalanceResult.RequiredAmount = new CurrencyAmountModel(0, price.Currency);;
                } else {
                    fundingCheckBalanceResult.RequiredAmount = new CurrencyAmountModel(price.Amount - memberBalanceInGameCurrency.Amount, price.Currency);
                }
                fundingCheckBalanceResult.Balance = memberBalanceInGameCurrency;
                resolve(fundingCheckBalanceResult);
            }).catch(reason => reject(reason));
        });
    }
}
