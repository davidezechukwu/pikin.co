import { Injectable, Injector } from '@angular/core';
import { TicketModel, TicketStatusEnum } from '../Models/TicketModel';
import { PrizeModel } from '../Models/PrizeModel';
import { PrizesMock } from '../_MockModules/PrizeModelMockDataBuilder'
import { MemberModel } from '../../DashboardModules/Security/Models/MemberModel';
import { GameModel } from '../../DashboardModules/Game/Models/GameModel';
import { GameDrawModel } from '../../DashboardModules/Game/Models/GameDrawModel';
import { DrawModel } from '../../DashboardModules/Game/Models/DrawModel';
import { SuperService }   from '../../CommonModules/SuperModules/Services/SuperService.ng';
import { CurrencyAmountModel } from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';


@Injectable()
export class TicketService extends SuperService{        
    private TicketStore: TicketModel[] = [];
    private Prizes: PrizeModel[] = PrizesMock;    

    constructor(injector: Injector) {
        super(injector);
    };

    public BuyTicket(member: MemberModel, game: GameModel, draw: DrawModel,   gameDraw: GameDrawModel, numbers: string): Promise<TicketModel> {        
        if (!member) {
            throw "Member is invalid in TicketService.BuyTicket";
        }
        if (!game) {
            throw "Game is invalid in TicketService.BuyTicket";
        }
        if (!gameDraw) {
            throw "Game Draw is invalid in TicketService.BuyTicket";
        }
        if (!numbers) {
            throw "Picked Number is invalid in TicketService.BuyTicket";
        }
        //ensure that numbers is with Game pickable range
        //ensure that member has enough funds
        //ensure that member is valid and authenticated
        //ensure that draw is in future
        //ensure that draw is within drawclosing date
        //ensure that member can play game in location 
        //ensure that member has not exceed daily play limit

        var ticket = new TicketModel();        
        ticket.ID = (member.Tickets.length + 1).toString();        
        ticket.GameID = game.ID;          
        ticket.GameDisplayName = game.DisplayName;        
        ticket.GamePrice = this.GlobalisationService.ToSessionCurrency(game.Price);        
        ticket.GameDrawID = gameDraw.ID;                
        ticket.GameDrawDateUTC = gameDraw.Draw.DrawDateUTC;
        ticket.CreatedOnUTC = new Date();                
        ticket.UpdatedOnUTC = ticket.CreatedOnUTC;                
        ticket.PickedNumbers = numbers;
        ticket.MemberID = member.ID;        
        ticket.TicketStatus = TicketStatusEnum.Open;
        ticket.TicketStatusDisplayName = TicketStatusEnum[ticket.TicketStatus].toString();
        this.TicketStore.push(ticket);
        member.Tickets.push(ticket);        

        //TODO: move to FundingService.
        member.Funding.Balance!.Amount = member.Funding.Balance!.Amount - this.GlobalisationService.ToSessionCurrency(game.Price).Amount;
        
        return Promise.resolve(ticket);
    }    

    public getTicket(id: number | string): Promise<TicketModel | undefined> {
        return Promise.resolve(
            this.TicketStore.find(t => t.ID ===  id)
        );
      }

    public GetTickets(member: MemberModel, from?: number, to?:number): Promise<TicketModel[]> {
        return Promise.resolve(member.Tickets);
    }   
 
    public GetPrize(id: any): Promise<PrizeModel | undefined> {
        var prize = this.Prizes.find(function (prize: any ) { return prize.ID == id });
        return Promise.resolve(prize);
    }

    public GetPrizes(game: GameModel): Promise<PrizeModel[]> {       
        var prizes = this.Prizes.filter(function (prize: any) {
            return prize.Game.ID == game.ID
        });
        return Promise.resolve(prizes);
    }    

    public GetTotalPrizes(): Promise<CurrencyAmountModel> {                
        let _totalPrizes: number = 0;
        let prizeCurrency = this.SessionService.Session?.CurrentCurrency;              
        let totalPrizes: CurrencyAmountModel = this.GlobalisationService.ToSessionCurrency(new CurrencyAmountModel(_totalPrizes, prizeCurrency!));
        return Promise.resolve(totalPrizes);      
    }    

    public GetTotalWinningTickets(): Promise<number> {
        return Promise.resolve(0);
    }    
}
