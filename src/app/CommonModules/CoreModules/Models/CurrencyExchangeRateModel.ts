import { SuperModel } from '../../SuperModules/Models/SuperModel';
import { CurrencyModel } from './CurrencyModel';

export class CurrencyExchangeRateModel extends SuperModel {
    public FromCurrency: CurrencyModel | null | undefined;
    public ToCurrency: CurrencyModel | null | undefined;
    public ToRate: number = 0;
    public FromRate: number = 0;
    public LastUpdatedOnUTC: Date | null | undefined;
}
