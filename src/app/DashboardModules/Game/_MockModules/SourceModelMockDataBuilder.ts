import * as _ from 'lodash';
import SourceModel from '../Models/SourceModel';
import { LocationsMock } from '../../../CommonModules/CoreModules/_MockModules/LocationModelMockDataBuilder';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import TradingDayModelMockDataBuilder from './TradingDayModelMockDataBuilder';

export default class SourceModelMockDataBuilder extends SuperModelMockDataBuilder {    
    BuildMockData(): SourceModel[] {        
        var PK100 = new SourceModel();
        PK100.ID = this.GetNextID();
        PK100.DisplayName = "The pikinco 100 Stock Index Emulator";
        PK100.Name = "PK100";
        PK100.Description = "The pikinco 100 Stock Index Emulator";
        PK100.HasLiveFeed = true;
        PK100.Url = "http://www.Thepikinco100StockIndexEmulator.com";
        PK100.DisplayUrl = "http://www.Thepikinco100StockIndexEmulator.com";
        PK100.FromDigit = 0;
        PK100.ToDigit = 4;
        PK100.Numbers = "88806789";
        PK100.NumberOfDigits = 7;
        PK100.CountryOfOrigin = _.find(LocationsMock, location => { return location.ISO2Code != null &&  location.ISO2Code.toLowerCase() == "NG".toLowerCase() });
        PK100.IsAvailableOnMonday = true;
        PK100.IsAvailableOnTuesday = true;
        PK100.IsAvailableOnWednesday = true;
        PK100.IsAvailableOnThursday = true;
        PK100.IsAvailableOnFriday = true;
        PK100.IsAvailableOnSaturday = false;
        PK100.IsAvailableOnSunday = false;
        PK100.MondayStartTimeUTC = new Date(0,0,0,9,0,0);
        PK100.MondayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        PK100.TuesdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        PK100.TuesdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        PK100.WedesdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        PK100.WednesdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        PK100.ThursdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        PK100.ThursdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        PK100.FridayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        PK100.FridayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        PK100.SaturdayStartTimeUTC = null;
        PK100.SaturdayEndTimeUTC = null;
        PK100.SundayStartTimeUTC = null;
        PK100.SundayEndTimeUTC = null;

        var PK250 = new SourceModel();
        PK250.ID = this.GetNextID();
        PK250.DisplayName = "The pikinco 250 Stock Index Emulator";
        PK250.Name = "PK250";
        PK250.Description = "The pikinco 250 Stock Index Emulator";
        PK250.HasLiveFeed = true;
        PK250.Url = "http://www.Thepikinco250StockIndexEmulator.com";
        PK250.DisplayUrl = "http://www.Thepikinco250StockIndexEmulator.com";
        PK250.FromDigit = 0;
        PK250.ToDigit = 3;
        PK250.Numbers = "2220345";
        PK250.NumberOfDigits = 6;
        PK250.CountryOfOrigin = _.find(LocationsMock, location => { return location.ISO2Code != null &&  location.ISO2Code.toLowerCase() == "GB".toLowerCase() });
        PK250.IsAvailableOnMonday = true;
        PK250.IsAvailableOnTuesday = true;
        PK250.IsAvailableOnWednesday = true;
        PK250.IsAvailableOnThursday = true;
        PK250.IsAvailableOnFriday = true;
        PK250.IsAvailableOnSaturday = false;
        PK250.IsAvailableOnSunday = false;
        PK250.MondayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK250.MondayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK250.TuesdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK250.TuesdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK250.WedesdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK250.WednesdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK250.ThursdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK250.ThursdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK250.FridayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK250.FridayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK250.SaturdayStartTimeUTC = null;
        PK250.SaturdayEndTimeUTC = null;
        PK250.SundayStartTimeUTC = null;
        PK250.SundayEndTimeUTC = null;        

        var PK500 = new SourceModel();
        PK500.ID = this.GetNextID();
        PK500.DisplayName = "The pikinco 250 Stock Index Emulator";
        PK500.Name = "PK500";
        PK500.Description = "The pikinco 250 Stock Index Emulator";
        PK500.HasLiveFeed = true;
        PK500.Url = "http://www.Thepikinco500StockIndexEmulator.com";
        PK500.DisplayUrl = "http://www.Thepikinco500StockIndexEmulator.com";
        PK500.FromDigit = 0;
        PK500.ToDigit = 3;
        PK500.Numbers = "330012";
        PK500.NumberOfDigits = 7;
        PK500.CountryOfOrigin = _.find(LocationsMock, location => { return location.ISO2Code != null &&  location.ISO2Code.toLowerCase() == "GB".toLowerCase() });
        PK500.IsAvailableOnMonday = true;
        PK500.IsAvailableOnTuesday = true;
        PK500.IsAvailableOnWednesday = true;
        PK500.IsAvailableOnThursday = true;
        PK500.IsAvailableOnFriday = true;
        PK500.IsAvailableOnSaturday = false;
        PK500.IsAvailableOnSunday = false;
        PK500.MondayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK500.MondayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK500.TuesdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK500.TuesdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK500.WedesdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK500.WednesdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK500.ThursdayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK500.ThursdayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK500.FridayStartTimeUTC = new Date(0, 0, 0, 8, 0, 0);
        PK500.FridayEndTimeUTC = new Date(0, 0, 0, 16, 30, 0);
        PK500.SaturdayStartTimeUTC = null;
        PK500.SaturdayEndTimeUTC = null;
        PK500.SundayStartTimeUTC = null;
        PK500.SundayEndTimeUTC = null;    

        SourcesMock = [
            PK100,
            PK250,
            PK500
        ];

        new TradingDayModelMockDataBuilder().BuildTradingDaysMocks(SourcesMock);
        return SourcesMock;
    }
}

export var SourcesMock: SourceModel[] = new SourceModelMockDataBuilder().BuildMockData();
