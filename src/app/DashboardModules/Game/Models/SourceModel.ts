import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import LocationModel from '../../../CommonModules/CoreModules/Models/LocationModel';

export default class SourceModel extends SuperModel {    
    public Name: string;
    public Url: string;
    public DisplayUrl: string;
    public CountryOfOrigin: LocationModel;

    public FromDigit: number;
    public ToDigit: number;
    public Numbers: string;    
    public NumberOfDigits: number;
    public NumberOfPickableDigits: number;        
    public HasLiveFeed: boolean;    
    
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
