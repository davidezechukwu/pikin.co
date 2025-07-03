import { SuperModel } from '../../SuperModules/Models/SuperModel';

export class CurrencyModel extends SuperModel {    
    public DisplayCode: string = '';
    public NativeSymbol: string = '';
    public Rounding: number = 0;
    public DecimalDigits: number = 0;
    public PluralName: string = '';    
    constructor(public Symbol?: string) {
        super();
    }
}
