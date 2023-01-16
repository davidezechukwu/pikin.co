import SuperModel from '../../SuperModules/Models/SuperModel';
import CurrencyModel from './CurrencyModel';

export default class CurrencyExchangeRateModel extends SuperModel {
    public FromCurrency: CurrencyModel
    public ToCurrency: CurrencyModel
    public ToRate: number;
    public FromRate: number;
    public LastUpdatedOnUTC: Date;
}
