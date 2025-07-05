export class GlobalMockPropertiesModel {
    public FundingDailyAmountAdjuster: number = 3;
    public FundingAdjuster: number = 1;        
    public TempClosingDateUTC: Date = new Date(new Date().getHours() % 24, new Date().getMinutes(), new Date().getSeconds());
    public TempLastClosingNumber: number = 1234567890;
    public TempNumbers: number = 1234567890;
}