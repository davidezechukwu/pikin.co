import * as _ from 'lodash';
import PrizeModel from '../Models/PrizeModel';
import { GamesMock } from '../../DashboardModules/Game/_MockModules/GameModelMockDataBuilder';
import CurrencyAmountModel from '../../CommonModules/CoreModules/Models/CurrencyAmountModel';
import CurrencyModel from '../../CommonModules/CoreModules/Models/CurrencyModel';
import { SessionService } from '../../CommonModules/CoreModules/Services/SessionService.ng'
import SuperModelMockDataBuilder from '../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';

export class EconomyClassPrizeModelMockDataBuilder extends SuperModelMockDataBuilder {

    protected Pick10Match10WinPrice = 30000000;
    protected Pick10Match9WinPrice =  3000000;
    protected Pick10Match8WinPrice =  300000;
    protected Pick9Match9WinPrice =   3000000;
    protected Pick9Match8WinPrice =   300000;
    protected Pick9Match7WinPrice =   30000;
    protected Pick8Match8WinPrice =   300000;
    protected Pick8Match7WinPrice =   30000;
    protected Pick8Match6WinPrice =   3000;
    protected Pick7Match7WinPrice =   30000;
    protected Pick7Match6WinPrice =   3000;
    protected Pick7Match5WinPrice =   300;
    protected Pick6Match6WinPrice =   3000;
    protected Pick6Match5WinPrice =   300;
    protected Pick6Match4WinPrice =   30;
    protected Pick5Match5WinPrice =   300;
    protected Pick5Match4WinPrice =   30;
    protected Pick5Match3WinPrice =   3;
    protected Pick4Match4WinPrice =   30;
    protected Pick4Match3WinPrice =   3;
    protected Pick4Match2WinPrice =   0.30;
    protected Pick3Match3WinPrice =   3;
    protected Pick3Match2WinPrice =   0.30;
    protected Pick3Match1WinPrice =   0.03;
    protected Pick2Match2WinPrice =   0.30;
    protected Pick2Match1WinPrice =   0.03;
    protected Pick1Match1WinPrice =   0.03;

    private _EconomyClassDesignator = " Economy Class";
    protected Pick10GameName = "pick10" + this._EconomyClassDesignator;
    protected Pick9GameName = "pick9" + this._EconomyClassDesignator;
    protected Pick8GameName = "pick8" + this._EconomyClassDesignator;
    protected Pick7GameName = "pick7" + this._EconomyClassDesignator;
    protected Pick6GameName = "pick6" + this._EconomyClassDesignator;
    protected Pick5GameName = "pick5" + this._EconomyClassDesignator;
    protected Pick4GameName = "pick4" + this._EconomyClassDesignator;
    protected Pick3GameName = "pick3" + this._EconomyClassDesignator;
    protected Pick2GameName = "pick2" + this._EconomyClassDesignator;
    protected Pick1GameName = "pick1" + this._EconomyClassDesignator;

    constructor() {
        super();
    }

    BuildMocks(): PrizeModel[] {
        PrizesMock = PrizesMock.concat(
            this.BuildPick10Mock(),
            this.BuildPick9Mock(),
            this.BuildPick8Mock(),
            this.BuildPick7Mock(),
            this.BuildPick6Mock(),
            this.BuildPick5Mock(),
            this.BuildPick4Mock(),
            this.BuildPick3Mock(),
            this.BuildPick2Mock(),
            this.BuildPick1Mock()
        );
        return PrizesMock;
    }

    BuildPick10Mock(): PrizeModel[] {
        var me = this;
        let pick10 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick10GameName.toLowerCase() });
        if (!pick10) {
            throw "The Game " + this.Pick10GameName + " could not be found";
        }

        let pick10Match8 = new PrizeModel();
        pick10Match8.ID = this.GetNextID();
        pick10Match8.DisplayName = "If you match all eight numbers in order";
        pick10Match8.Description = "If you match all eight numbers in order";
        pick10Match8.MatchingNoDigits = 8;
        pick10Match8.Game = pick10;
        pick10Match8.WinPrice = new CurrencyAmountModel(this.Pick10Match8WinPrice, this.DefaultCurrency);

        let pick10Match9 = new PrizeModel();
        pick10Match9.ID = this.GetNextID();
        pick10Match9.DisplayName = "If you match all nine numbers in order";
        pick10Match9.Description = "If you match all nine numbers in order";
        pick10Match9.MatchingNoDigits = 9;
        pick10Match9.Game = pick10;
        pick10Match9.WinPrice = new CurrencyAmountModel(this.Pick10Match9WinPrice, this.DefaultCurrency);

        let pick10Match10 = new PrizeModel();
        pick10Match10.ID = this.GetNextID();
        pick10Match10.DisplayName = "If you match all ten numbers in order";
        pick10Match10.Description = "If you match all ten numbers in order";
        pick10Match10.MatchingNoDigits = 10;
        pick10Match10.Game = pick10;
        pick10Match10.WinPrice = new CurrencyAmountModel(this.Pick10Match10WinPrice, this.DefaultCurrency);

        return [
            pick10Match8,
            pick10Match9,
            pick10Match10
        ];
    }

    BuildPick9Mock(): PrizeModel[] {
        var me = this;
        let pick9 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick9GameName.toLowerCase() });
        if (!pick9) {
            throw "The Game " + this.Pick9GameName + " could not be found";
        }

        let pick9Match7 = new PrizeModel();
        pick9Match7.ID = this.GetNextID();
        pick9Match7.DisplayName = "If you match the last seven numbers in order";
        pick9Match7.Description = "If you match the last seven numbers in order";
        pick9Match7.MatchingNoDigits = 7;
        pick9Match7.Game = pick9;
        pick9Match7.WinPrice = new CurrencyAmountModel(this.Pick9Match7WinPrice, this.DefaultCurrency);

        let pick9Match8 = new PrizeModel();
        pick9Match8.ID = this.GetNextID();
        pick9Match8.DisplayName = "If you match all eight numbers in order";
        pick9Match8.Description = "If you match all eight numbers in order";
        pick9Match8.MatchingNoDigits = 8;
        pick9Match8.Game = pick9;
        pick9Match8.WinPrice = new CurrencyAmountModel(this.Pick9Match8WinPrice, this.DefaultCurrency);

        let pick9Match9 = new PrizeModel();
        pick9Match9.ID = this.GetNextID();
        pick9Match9.DisplayName = "If you match all nine numbers in order";
        pick9Match9.Description = "If you match all nine numbers in order";
        pick9Match9.MatchingNoDigits = 9;
        pick9Match9.Game = pick9;
        pick9Match9.WinPrice = new CurrencyAmountModel(this.Pick9Match9WinPrice, this.DefaultCurrency);

        return [
            pick9Match7,
            pick9Match8,
            pick9Match9
        ];
    }

    BuildPick8Mock(): PrizeModel[] {
        var me = this;
        let pick8 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick8GameName.toLowerCase() });
        if (!pick8) {
            throw "The Game " + this.Pick8GameName + " could not be found";
        }

        let pick8Match6 = new PrizeModel();
        pick8Match6.ID = this.GetNextID();
        pick8Match6.DisplayName = "If you match the last six numbers in order";
        pick8Match6.Description = "If you match the last six numbers in order";
        pick8Match6.MatchingNoDigits = 6;
        pick8Match6.Game = pick8;
        pick8Match6.WinPrice = new CurrencyAmountModel(this.Pick8Match6WinPrice, this.DefaultCurrency);

        let pick8Match7 = new PrizeModel();
        pick8Match7.ID = this.GetNextID();
        pick8Match7.DisplayName = "If you match the last seven numbers in order";
        pick8Match7.Description = "If you match the last seven numbers in order";
        pick8Match7.MatchingNoDigits = 7;
        pick8Match7.Game = pick8;
        pick8Match7.WinPrice = new CurrencyAmountModel(this.Pick8Match7WinPrice, this.DefaultCurrency);

        let pick8Match8 = new PrizeModel();
        pick8Match8.ID = this.GetNextID();
        pick8Match8.DisplayName = "If you match all eight numbers in order";
        pick8Match8.Description = "If you match all eight numbers in order";
        pick8Match8.MatchingNoDigits = 8;
        pick8Match8.Game = pick8;
        pick8Match8.WinPrice = new CurrencyAmountModel(this.Pick8Match8WinPrice, this.DefaultCurrency);

        return [
            pick8Match6,
            pick8Match7,
            pick8Match8
        ];
    }

    BuildPick7Mock(): PrizeModel[] {
        var me = this;
        let pick7 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick7GameName.toLowerCase() });
        if (!pick7) {
            throw "The Game " + this.Pick7GameName + " could not be found";
        }

        let pick7Match5 = new PrizeModel();
        pick7Match5.ID = this.GetNextID();
        pick7Match5.DisplayName = "If you match the last five numbers in order";
        pick7Match5.Description = "If you match all 5 numbers in order";
        pick7Match5.MatchingNoDigits = 5;
        pick7Match5.Game = pick7;
        pick7Match5.WinPrice = new CurrencyAmountModel(this.Pick7Match5WinPrice, this.DefaultCurrency);

        let pick7Match6 = new PrizeModel();
        pick7Match6.ID = this.GetNextID();
        pick7Match6.DisplayName = "If you match all six numbers in order";
        pick7Match6.Description = "If you match all six numbers in order";
        pick7Match6.MatchingNoDigits = 6;
        pick7Match6.Game = pick7;
        pick7Match6.WinPrice = new CurrencyAmountModel(this.Pick7Match6WinPrice, this.DefaultCurrency);

        let pick7Match7 = new PrizeModel();
        pick7Match7.ID = this.GetNextID();
        pick7Match7.DisplayName = "If you match all seven numbers in order";
        pick7Match7.Description = "If you match all seven numbers in order";
        pick7Match7.MatchingNoDigits = 7;
        pick7Match7.Game = pick7;
        pick7Match7.WinPrice = new CurrencyAmountModel(this.Pick7Match7WinPrice, this.DefaultCurrency);

        return [
            pick7Match5,
            pick7Match6,
            pick7Match7,
        ];
    }

    BuildPick6Mock(): PrizeModel[] {
        var me = this;
        let pick6 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick6GameName.toLowerCase() });
        if (!pick6) {
            throw "The Game " + this.Pick6GameName + " could not be found";
        }

        let pick6Match4 = new PrizeModel();
        pick6Match4.ID = this.GetNextID();
        pick6Match4.DisplayName = "If you match the last four numbers in order";
        pick6Match4.Description = "If you match the last four numbers in order";
        pick6Match4.MatchingNoDigits = 4;
        pick6Match4.Game = pick6;
        pick6Match4.WinPrice = new CurrencyAmountModel(this.Pick6Match4WinPrice, this.DefaultCurrency);

        let pick6Match5 = new PrizeModel();
        pick6Match5.ID = this.GetNextID();
        pick6Match5.DisplayName = "If you match the last five numbers in order";
        pick6Match5.Description = "If you match all 5 numbers in order";
        pick6Match5.MatchingNoDigits = 5;
        pick6Match5.Game = pick6;
        pick6Match5.WinPrice = new CurrencyAmountModel(this.Pick6Match5WinPrice, this.DefaultCurrency);

        let pick6Match6 = new PrizeModel();
        pick6Match6.ID = this.GetNextID();
        pick6Match6.DisplayName = "If you match all six numbers in order";
        pick6Match6.Description = "If you match all six numbers in order";
        pick6Match6.MatchingNoDigits = 6;
        pick6Match6.Game = pick6;
        pick6Match6.WinPrice = new CurrencyAmountModel(this.Pick6Match6WinPrice, this.DefaultCurrency);

        return [
            pick6Match4,
            pick6Match5,
            pick6Match6,
        ];
    }

    BuildPick5Mock(): PrizeModel[] {
        var me = this;
        let pick5 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick5GameName.toLowerCase() });
        if (!pick5) {
            throw "The Game " + this.Pick5GameName + " could not be found";
        }

        let pick5Match3 = new PrizeModel();
        pick5Match3.ID = this.GetNextID();
        pick5Match3.Name = "Match 3";
        pick5Match3.DisplayName = "If you match the last three numbers in order";
        pick5Match3.Description = "If you match the last three numbers in order";
        pick5Match3.MatchingNoDigits = 3;
        pick5Match3.Game = pick5;
        pick5Match3.WinPrice = new CurrencyAmountModel(this.Pick5Match3WinPrice, this.DefaultCurrency);

        let pick5Match4 = new PrizeModel();
        pick5Match4.ID = this.GetNextID();
        pick5Match4.DisplayName = "If you match the last four numbers in order";
        pick5Match4.Description = "If you match the last four numbers in order";
        pick5Match4.MatchingNoDigits = 4;
        pick5Match4.Game = pick5;
        pick5Match4.WinPrice = new CurrencyAmountModel(this.Pick5Match4WinPrice, this.DefaultCurrency);

        let pick5Match5 = new PrizeModel();
        pick5Match5.ID = this.GetNextID();
        pick5Match5.DisplayName = "If you match all 5 numbers in order";
        pick5Match5.Description = "If you match all 5 numbers in order";
        pick5Match5.MatchingNoDigits = 5;
        pick5Match5.Game = pick5;
        pick5Match5.WinPrice = new CurrencyAmountModel(this.Pick5Match5WinPrice, this.DefaultCurrency);

        return [
            pick5Match3,
            pick5Match4,
            pick5Match5
        ];
    }

    BuildPick4Mock(): PrizeModel[] {
        var me = this;
        let pick4 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick4GameName.toLowerCase() });
        if (!pick4) {
            throw "The Game " + this.Pick4GameName + " could not be found";
        }

        let pick4Match2 = new PrizeModel();
        pick4Match2.ID = this.GetNextID();
        pick4Match2.Name = "Match 2";
        pick4Match2.DisplayName = "If you match the last two numbers in order";
        pick4Match2.Description = "If you match the last two numbers in order";
        pick4Match2.MatchingNoDigits = 2;
        pick4Match2.Game = pick4;
        pick4Match2.WinPrice = new CurrencyAmountModel(this.Pick4Match2WinPrice, this.DefaultCurrency);

        let pick4Match3 = new PrizeModel();
        pick4Match3.ID = this.GetNextID();
        pick4Match3.Name = "Match 3";
        pick4Match3.DisplayName = "If you match the last three numbers in order";
        pick4Match3.Description = "If you match the last three numbers in order";
        pick4Match3.MatchingNoDigits = 3;
        pick4Match3.Game = pick4;
        pick4Match3.WinPrice = new CurrencyAmountModel(this.Pick4Match3WinPrice, this.DefaultCurrency);

        let pick4Match4 = new PrizeModel();
        pick4Match4.ID = this.GetNextID();
        pick4Match4.DisplayName = "If you match all four numbers in order";
        pick4Match4.Description = "If you match all four numbers in order";
        pick4Match4.MatchingNoDigits = 4;
        pick4Match4.Game = pick4;
        pick4Match4.WinPrice = new CurrencyAmountModel(this.Pick4Match4WinPrice, this.DefaultCurrency);

        return [
            pick4Match2,
            pick4Match3,
            pick4Match4
        ];
    }

    BuildPick3Mock(): PrizeModel[] {
        var me = this;
        let pick3 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick3GameName.toLowerCase() });
        if (!pick3) {
            throw "The Game " + this.Pick3GameName + " could not be found";
        }

        let pick3Match1 = new PrizeModel();
        pick3Match1.ID = this.GetNextID();
        pick3Match1.Name = "Match the last number";
        pick3Match1.DisplayName = "If you match the last number";
        pick3Match1.Description = "If you match the last number";
        pick3Match1.MatchingNoDigits = 1;
        pick3Match1.Game = pick3;
        pick3Match1.WinPrice = new CurrencyAmountModel(this.Pick3Match1WinPrice, this.DefaultCurrency);

        let pick3Match2 = new PrizeModel();
        pick3Match2.ID = this.GetNextID();
        pick3Match2.Name = "Match 2";
        pick3Match2.DisplayName = "If you match the last two numbers";
        pick3Match2.Description = "If you match the last two numbers";
        pick3Match2.MatchingNoDigits = 2;
        pick3Match2.Game = pick3;
        pick3Match2.WinPrice = new CurrencyAmountModel(this.Pick3Match2WinPrice, this.DefaultCurrency);

        let pick3Match3 = new PrizeModel();
        pick3Match3.ID = this.GetNextID();
        pick3Match3.Name = "Match 3";
        pick3Match3.DisplayName = "If you match all 3 numbers in order";
        pick3Match3.Description = "If you match all 3 numbers in order";
        pick3Match3.MatchingNoDigits = 3;
        pick3Match3.Game = pick3;
        pick3Match3.WinPrice = new CurrencyAmountModel(this.Pick3Match3WinPrice, this.DefaultCurrency);

        return [
            pick3Match1,
            pick3Match2,
            pick3Match3,
        ];
    }

    BuildPick2Mock(): PrizeModel[] {
        var me = this;
        let pick2 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick2GameName.toLowerCase() });
        if (!pick2) {
            throw "The Game " + this.Pick2GameName + " could not be found";
        }

        let pick2Match1 = new PrizeModel();
        pick2Match1.ID = this.GetNextID();
        pick2Match1.Name = "Match the last number";
        pick2Match1.DisplayName = "If you match the last number";
        pick2Match1.Description = "If you match the last number";
        pick2Match1.MatchingNoDigits = 1;
        pick2Match1.Game = pick2;
        pick2Match1.WinPrice = new CurrencyAmountModel(this.Pick2Match1WinPrice, this.DefaultCurrency);

        let pick2Match2 = new PrizeModel();
        pick2Match2.ID = this.GetNextID();
        pick2Match2.Name = "Match 2";
        pick2Match2.DisplayName = "If you match all two numbers in order";
        pick2Match2.Description = "If you match all 2 numbers in order";
        pick2Match2.MatchingNoDigits = 2;
        pick2Match2.Game = pick2;
        pick2Match2.WinPrice = new CurrencyAmountModel(this.Pick2Match2WinPrice, this.DefaultCurrency);

        return [
            pick2Match1,
            pick2Match2
        ];
    }

    BuildPick1Mock(): PrizeModel[] {
        var me = this;
        let pick1 = _.find(GamesMock, function (game) { return game.Name.toLowerCase() == me.Pick1GameName.toLowerCase() });
        if (!pick1) {
            throw "The Game " + this.Pick1GameName + " could not be found";
        }

        let pick1Match1 = new PrizeModel();
        pick1Match1.ID = this.GetNextID();
        pick1Match1.Name = "Match 1";
        pick1Match1.DisplayName = "If you match the last number";
        pick1Match1.Description = "If you match the last number";
        pick1Match1.MatchingNoDigits = 1;
        pick1Match1.Game = pick1;
        pick1Match1.WinPrice = new CurrencyAmountModel(this.Pick1Match1WinPrice, this.DefaultCurrency);

        return [
            pick1Match1
        ];
    }
}

export var PrizesMock: PrizeModel[] = [];