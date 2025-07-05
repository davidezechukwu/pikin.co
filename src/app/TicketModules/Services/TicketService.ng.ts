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
import { WinningPriceModel } from '../Models/WinningPriceModel';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ 
    providedIn: 'root'
})
export class TicketService extends SuperService{        
    private TicketStore: TicketModel[] = [];
    private Prizes: PrizeModel[] = PrizesMock;    
    protected TotalPrizes: CurrencyAmountModel | null | undefined;
    protected WinningTicketsCount : number = 0;
    constructor(injector: Injector) {
        super(injector);
        this.TotalPrizes = new CurrencyAmountModel(0, this.SessionService.DefaultCurrency)
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
        if (member.Funding.Balance!.Currency.ID != this.SessionService.Session?.CurrentCurrency?.ID){
            member.Funding.Balance = this.GlobalisationService.ToSessionCurrency(member.Funding.Balance);
        }        
        member.Funding.Balance!.Amount = member.Funding.Balance!.Amount - this.GlobalisationService.ToSessionCurrency(game.Price).Amount;
        return Promise.resolve(ticket);
    }    

    private totalWinningTickets$ = new BehaviorSubject<number>(0);
    public GetTotalWinningTicketsObservable(): Observable<number> {
        return this.totalWinningTickets$.asObservable();
    }
    public UpdateTotalWinningTickets(newTotal: number): void {
        this.totalWinningTickets$.next(newTotal);
    }

    private totalPrizes$ = new BehaviorSubject<CurrencyAmountModel>(new CurrencyAmountModel(0, this.SessionService.Session?.CurrentCurrency!));
    public GetTotalPrizesObservable(): Observable<CurrencyAmountModel> {
        return this.totalPrizes$.asObservable();
    }
    public UpdateTotalPrizes(newTotalPrizes: CurrencyAmountModel): void {
        this.totalPrizes$.next({...newTotalPrizes});
    }

    public AddWinner(winningPrize: CurrencyAmountModel) {                     
        if (this.TotalPrizes!.Currency.ID != this.SessionService.Session?.CurrentCurrency?.ID) {
            this.TotalPrizes = this.GlobalisationService.ToSessionCurrency(this.TotalPrizes);
        } 
        if (winningPrize!.Currency.ID != this.SessionService.Session?.CurrentCurrency?.ID) {
            winningPrize = this.GlobalisationService.ToSessionCurrency(winningPrize);
        } 

        this.TotalPrizes!.Amount = this.TotalPrizes!.Amount + winningPrize.Amount;
        this.UpdateTotalPrizes(this.TotalPrizes!);                
        ++this.WinningTicketsCount;
        this.UpdateTotalWinningTickets(this.WinningTicketsCount);        
    }

    public GetWinningPrice(gameName: string, numberOfMatches: number): CurrencyAmountModel {        
        const key = `${gameName}Match${numberOfMatches}WinPrice` as keyof typeof WinningPriceModel;
        let winningAmount = WinningPriceModel[key]! as number;         
        let winningPrize = new CurrencyAmountModel(winningAmount, this.SessionService.DefaultCurrency);        
        return this.GlobalisationService.ToSessionCurrency(winningPrize);
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
        let prizeCurrency = this.SessionService.DefaultCurrency;              
        let totalPrizes: CurrencyAmountModel = this.GlobalisationService.ToSessionCurrency(new CurrencyAmountModel(this.TotalPrizes!.Amount, prizeCurrency!));
        return Promise.resolve(totalPrizes);      
    }    

    public GetTotalWinningTickets(): Promise<number> {
        return Promise.resolve(this.WinningTicketsCount);
    }    
}
