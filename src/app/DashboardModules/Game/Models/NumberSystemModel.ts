import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import SourceModel from './SourceModel';
import NumberSystemSourceModel from './NumberSystemSourceModel';

export default class NumberSystemModel extends SuperModel {
    public NumberOfDigits: number;
    public NumberOfPickableDigits: number;        
    //public NumberSystemSources: NumberSystemSourceModel[];
    public Sources: SourceModel[];
    public IsAvailableOnMonday: boolean;
    public IsAvailableOnTuesday: boolean;
    public IsAvailableOnWednesday: boolean;
    public IsAvailableOnThursday: boolean;
    public IsAvailableOnFriday: boolean;
    public IsAvailableOnSaturday: boolean;
    public IsAvailableOnSunday: boolean;

    public MondayStartTimeUTC: Date;
    public MondayEndTimeUTC: Date;
    public TuesdayStartTimeUTC: Date;
    public TuesdayEndTimeUTC: Date;
    public WedesdayStartTimeUTC: Date;
    public WednesdayEndTimeUTC: Date;
    public ThursdayStartTimeUTC: Date;
    public ThursdayEndTimeUTC: Date;
    public FridayStartTimeUTC: Date;
    public FridayEndTimeUTC: Date;
    public SaturdayStartTimeUTC: Date;
    public SaturdayEndTimeUTC: Date;
    public SundayStartTimeUTC: Date;
    public SundayEndTimeUTC: Date;
}