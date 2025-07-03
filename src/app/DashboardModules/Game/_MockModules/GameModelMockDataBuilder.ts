import { CurrencyAmountModel } from '../../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import { CurrencyModel } from '../../../CommonModules/CoreModules/Models/CurrencyModel';
import { SuperModelMockDataBuilder } from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { GameModel } from '../Models/GameModel';
import { NumberSystemsMock } from './NumberSystemModelMockDataBuilder';

export class GameModelMockDataBuilder extends SuperModelMockDataBuilder{        
    constructor() {        
        super();                
    }

    BuildMocksFor10NumberSystem(): GameModel[] {                
        var me = this;
        let NumberSystem10 = NumberSystemsMock.find(function (numberSystem: any) { return numberSystem.Name.toLowerCase() ==me.GlobalProperties.DefaultNumberSystemName.toLowerCase() });             
        if (!NumberSystem10) {
            throw "NumberSystem10 could not be found";
        }

        var game1Price =  0.10;
        var game2Price =  0.09;
        var game3Price =  0.08;
        var game4Price =  0.07;
        var game5Price =  0.06;
        var game6Price =  0.05;
        var game7Price =  0.04;
        var game8Price =  0.03;
        var game9Price =  0.02;
        var game10Price = 0.01;

        var game1 = new GameModel();
        game1.ID = this.GetNextID();
        game1.Name = "Pick1";
        game1.DisplayName = "Pick the last number";
        game1.Description = "Pick the last number";
        game1.Price = new CurrencyAmountModel(game1Price, this.DefaultCurrency!);        
        game1.RequiredMatches = 1;
        game1.NumberSystemID = NumberSystem10.ID;        

        var game2 = new GameModel();
        game2.ID = this.GetNextID();
        game2.Name = "Pick2";
        game2.DisplayName = "Pick the last two numbers";
        game2.Description = "Pick the last two numbers";
        game2.Price = new CurrencyAmountModel(game2Price, this.DefaultCurrency!);       
        game2.RequiredMatches = 2;
        game2.NumberSystemID = NumberSystem10.ID;        

        var game3 = new GameModel();
        game3.ID = this.GetNextID();
        game3.Name = "Pick3";
        game3.DisplayName = "Pick the last three numbers";
        game3.Description = "Pick the last three numbers";
        game3.Price = new CurrencyAmountModel(game3Price, this.DefaultCurrency!);        
        game3.RequiredMatches = 3;
        game3.NumberSystemID = NumberSystem10.ID; 

        var game4 = new GameModel();
        game4.ID = this.GetNextID();
        game4.Name = "Pick4";
        game4.DisplayName = "Pick the last four numbers";
        game4.Description = "Pick the last four numbers";
        game4.Price = new CurrencyAmountModel(game4Price, this.DefaultCurrency!);        
        game4.RequiredMatches = 4;
        game4.NumberSystemID = NumberSystem10.ID; 

        var game5 = new GameModel();
        game5.ID = this.GetNextID();
        game5.Name = "Pick5";
        game5.DisplayName = "Pick the last five numbers";
        game5.Description = "Pick the last five numbers";
        game5.Price = new CurrencyAmountModel(game5Price, this.DefaultCurrency!);        
        game5.RequiredMatches = 5;
        game5.NumberSystemID = NumberSystem10.ID; 

        var game6 = new GameModel();
        game6.ID = this.GetNextID();
        game6.Name = "Pick6";
        game6.DisplayName = "Pick the last six numbers";
        game6.Description = "Pick the last six numbers";
        game6.Price = new CurrencyAmountModel(game6Price, this.DefaultCurrency!);        
        game6.RequiredMatches = 6;
        game6.NumberSystemID = NumberSystem10.ID; 

        var game7 = new GameModel();
        game7.ID = this.GetNextID();
        game7.Name = "Pick7";
        game7.DisplayName = "Pick the last seven numbers";
        game7.Description = "Pick the last seven numbers";
        game7.Price = new CurrencyAmountModel(game7Price, this.DefaultCurrency!);        
        game7.RequiredMatches = 7;
        game7.NumberSystemID = NumberSystem10.ID; 

        var game8 = new GameModel();
        game8.ID = this.GetNextID();
        game8.Name = "Pick8";
        game8.DisplayName = "Pick the last eight numbers";
        game8.Description = "Pick the last eight numbers";
        game8.Price = new CurrencyAmountModel(game8Price, this.DefaultCurrency!);        
        game8.RequiredMatches = 8;
        game8.NumberSystemID = NumberSystem10.ID; 
        
        var game9 = new GameModel();
        game9.ID = this.GetNextID();
        game9.Name = "Pick9";
        game9.DisplayName = "Pick the last nine numbers";
        game9.Description = "Pick the last nine numbers";
        game9.Price = new CurrencyAmountModel(game9Price, this.DefaultCurrency!);        
        game9.RequiredMatches = 9;
        game9.NumberSystemID = NumberSystem10.ID; 

        var game10 = new GameModel();
        game10.ID = this.GetNextID();
        game10.Name = "Pick10";
        game10.DisplayName = "Pick all ten numbers";
        game10.Description = "Pick all ten numbers";
        game10.Price = new CurrencyAmountModel(game10Price, this.DefaultCurrency!);        
        game10.RequiredMatches = 10;
        game10.NumberSystemID = NumberSystem10.ID; 

        var gamesMock = [
            game1,
            game2,
            game3,
            game4,
            game5,
            game6,
            game7,
            game8,
            game9,
            game10
        ];

        gamesMock.forEach(function (element1) {
            let canAdd = true;
            GamesMock.forEach(function (element2: any) {
                if (element2.ID === element1.ID) {
                    canAdd = false;
                }
            });
            if (canAdd) {
                GamesMock.push(element1);
            }
        });

        return GamesMock;
    }

    BuildEconomyClassMocksFor10NumberSystem(): GameModel[] {        
        var me = this;
        let NumberSystem10 = NumberSystemsMock.find(function (numberSystem: any) { return numberSystem.Name.toLowerCase() == me.GlobalProperties.DefaultNumberSystemName.toLowerCase() });
        if (!NumberSystem10) {
            throw "NumberSystem10 could not be found";
        }

        var economyClassDesignator = " Economy Class";    
        var game1Price =  0.01;
        var game2Price =  0.01;
        var game3Price =  0.01;
        var game4Price =  0.01;
        var game5Price =  0.01;
        var game6Price =  0.01;
        var game7Price =  0.01;
        var game8Price =  0.01;
        var game9Price =  0.01;
        var game10Price = 0.01;

        var game1 = new GameModel();
        game1.ID = this.GetNextID();
        game1.Name = "Pick1" + economyClassDesignator;
        game1.DisplayName = "Pick the last number";
        game1.Description = "Pick the last number";
        game1.Price = new CurrencyAmountModel(game1Price, this.DefaultCurrency!);
        game1.RequiredMatches = 1;
        game1.NumberSystemID = NumberSystem10.ID;

        var game2 = new GameModel();
        game2.ID = this.GetNextID();
        game2.Name = "Pick2" + economyClassDesignator;
        game2.DisplayName = "Pick the last two numbers";
        game2.Description = "Pick the last two numbers";
        game2.Price = new CurrencyAmountModel(game2Price, this.DefaultCurrency!);
        game2.RequiredMatches = 2;
        game2.NumberSystemID = NumberSystem10.ID;

        var game3 = new GameModel();
        game3.ID = this.GetNextID();
        game3.Name = "Pick3" + economyClassDesignator;
        game3.DisplayName = "Pick the last three numbers";
        game3.Description = "Pick the last three numbers";
        game3.Price = new CurrencyAmountModel(game3Price, this.DefaultCurrency!);
        game3.RequiredMatches = 3;
        game3.NumberSystemID = NumberSystem10.ID;

        var game4 = new GameModel();
        game4.ID = this.GetNextID();
        game4.Name = "Pick4" + economyClassDesignator;
        game4.DisplayName = "Pick the last four numbers";
        game4.Description = "Pick the last four numbers";
        game4.Price = new CurrencyAmountModel(game4Price, this.DefaultCurrency!);
        game4.RequiredMatches = 4;
        game4.NumberSystemID = NumberSystem10.ID;

        var game5 = new GameModel();
        game5.ID = this.GetNextID();
        game5.Name = "Pick5" + economyClassDesignator;
        game5.DisplayName = "Pick the last five numbers";
        game5.Description = "Pick the last five numbers";
        game5.Price = new CurrencyAmountModel(game5Price, this.DefaultCurrency!);
        game5.RequiredMatches = 5;
        game5.NumberSystemID = NumberSystem10.ID;

        var game6 = new GameModel();
        game6.ID = this.GetNextID();
        game6.Name = "Pick6" + economyClassDesignator;
        game6.DisplayName = "Pick the last six numbers";
        game6.Description = "Pick the last six numbers";
        game6.Price = new CurrencyAmountModel(game6Price, this.DefaultCurrency!);
        game6.RequiredMatches = 6;
        game6.NumberSystemID = NumberSystem10.ID;

        var game7 = new GameModel();
        game7.ID = this.GetNextID();
        game7.Name = "Pick7" + economyClassDesignator;
        game7.DisplayName = "Pick the last seven numbers";
        game7.Description = "Pick the last seven numbers";
        game7.Price = new CurrencyAmountModel(game7Price, this.DefaultCurrency!);
        game7.RequiredMatches = 7;
        game7.NumberSystemID = NumberSystem10.ID;

        var game8 = new GameModel();
        game8.ID = this.GetNextID();
        game8.Name = "Pick8" + economyClassDesignator;
        game8.DisplayName = "Pick the last eight numbers";
        game8.Description = "Pick the last eight numbers";
        game8.Price = new CurrencyAmountModel(game8Price, this.DefaultCurrency!);
        game8.RequiredMatches = 8;
        game8.NumberSystemID = NumberSystem10.ID;

        var game9 = new GameModel();
        game9.ID = this.GetNextID();
        game9.Name = "Pick9" + economyClassDesignator;
        game9.DisplayName = "Pick the last nine numbers";
        game9.Description = "Pick the last nine numbers";
        game9.Price = new CurrencyAmountModel(game9Price, this.DefaultCurrency!);
        game9.RequiredMatches = 9;
        game9.NumberSystemID = NumberSystem10.ID;

        var game10 = new GameModel();
        game10.ID = this.GetNextID();
        game10.Name = "Pick10" + economyClassDesignator;
        game10.DisplayName = "Pick all ten numbers";
        game10.Description = "Pick all ten numbers";
        game10.Price = new CurrencyAmountModel(game10Price, this.DefaultCurrency! );
        game10.RequiredMatches = 10;
        game10.NumberSystemID = NumberSystem10.ID;

        var gamesMock = [
            game1,
            game2,
            game3,
            game4,
            game5,
            game6,
            game7,
            game8,
            game9,
            game10
        ];

        gamesMock.forEach(function (element1) {
            let canAdd = true;
            GamesMock.forEach(function (element2) {
                if (element2.ID === element1.ID) {
                    canAdd = false;
                }
            });
            if (canAdd) {
                GamesMock.push(element1);
            }
        });

        return GamesMock;
    }
}

export var GamesMock: GameModel[]=[];