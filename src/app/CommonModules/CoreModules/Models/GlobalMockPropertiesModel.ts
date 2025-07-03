export class GlobalMockPropertiesModel {
    public FundingDailyAmountAdjuster: number = 3;
    public FundingAdjuster: number = 10;
    public RefreshTimerRateStart: number = 3000;     
    public NumbersRefreshTimerRateAdjuster: number = 1500;
    public CountDownEndTimerRateAdjuster: number = 1000;
    public MarketSentimentAdjuster: number = 0.499;
    public TradeVolumeAdjuster: number = 40;
    public TempClosingDateUTC: Date = new Date(new Date().getHours() % 24, new Date().getMinutes(), new Date().getSeconds());
    public TempLastClosingNumber: number = 1234567890;
    public TempNumbers: number = 1234567890;
}