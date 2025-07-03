import { NumberSystemModel } from '../Models/NumberSystemModel';
import { NumberSystemSourceModelMockDataBuilder } from '../_MockModules/NumberSystemSourceModelMockDataBuilder';
import { SuperModelMockDataBuilder } from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';


export class NumberSystemModelMockDataBuilder extends SuperModelMockDataBuilder{    
    BuildMockData(): NumberSystemModel[] {
        var NumberSystem10 = new NumberSystemModel();
        NumberSystem10.ID =this.GetNextID();
        NumberSystem10.Name = "NumberSystem10";
        NumberSystem10.DisplayName = "10 Digit Number System ";
        NumberSystem10.NumberOfDigits = 10;
        NumberSystem10.NumberOfPickableDigits = 10;        
        NumberSystem10.Sources = new NumberSystemSourceModelMockDataBuilder().BuildMockDataFor10NumberSystemID(NumberSystem10.ID);        

        NumberSystem10.IsAvailableOnMonday = true;
        NumberSystem10.IsAvailableOnTuesday = true;
        NumberSystem10.IsAvailableOnWednesday = true;
        NumberSystem10.IsAvailableOnThursday = true;
        NumberSystem10.IsAvailableOnFriday = true;
        NumberSystem10.IsAvailableOnSaturday = false;
        NumberSystem10.IsAvailableOnSunday = false;
        NumberSystem10.MondayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.MondayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.TuesdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.TuesdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.WedesdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.WednesdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.ThursdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.ThursdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.FridayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.FridayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.SaturdayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.SaturdayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);
        NumberSystem10.SundayStartTimeUTC = new Date(0, 0, 0, 9, 0, 0);
        NumberSystem10.SundayEndTimeUTC = new Date(0, 0, 0, 15, 0, 0);

        NumberSystemsMock = [
            NumberSystem10
        ];

        return NumberSystemsMock;
    }   
}

export var NumberSystemsMock: NumberSystemModel[] = new NumberSystemModelMockDataBuilder().BuildMockData();
