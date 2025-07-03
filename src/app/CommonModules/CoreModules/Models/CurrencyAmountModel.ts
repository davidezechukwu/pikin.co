import { CurrencyModel } from './CurrencyModel';

export class CurrencyAmountModel {        
    constructor(public Amount: number, public Currency: CurrencyModel) {        
    }
}
