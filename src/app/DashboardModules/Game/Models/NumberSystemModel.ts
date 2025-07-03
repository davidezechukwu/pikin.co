import { SuperModel }  from '../../../CommonModules/SuperModules/Models/SuperModel';
import { SourceModel } from './SourceModel';

export class NumberSystemModel extends SuperModel {
    public NumberOfDigits: number = 0;
    public NumberOfPickableDigits: number = 0;            
    public Sources: SourceModel[] = [];
    public IsAvailableOnMonday: boolean = false;
    public IsAvailableOnTuesday: boolean = false;
    public IsAvailableOnWednesday: boolean = false;
    public IsAvailableOnThursday: boolean = false;
    public IsAvailableOnFriday: boolean = false;
    public IsAvailableOnSaturday: boolean = false;
    public IsAvailableOnSunday: boolean = false;

    public MondayStartTimeUTC: Date = new Date();
    public MondayEndTimeUTC: Date = new Date();
    public TuesdayStartTimeUTC: Date = new Date();
    public TuesdayEndTimeUTC: Date = new Date();
    public WedesdayStartTimeUTC: Date = new Date();
    public WednesdayEndTimeUTC: Date = new Date();
    public ThursdayStartTimeUTC: Date = new Date();
    public ThursdayEndTimeUTC: Date = new Date();
    public FridayStartTimeUTC: Date = new Date();
    public FridayEndTimeUTC: Date = new Date();
    public SaturdayStartTimeUTC: Date = new Date();
    public SaturdayEndTimeUTC: Date = new Date();
    public SundayStartTimeUTC: Date  = new Date();
    public SundayEndTimeUTC: Date = new Date();
}