import SuperModel from '../../SuperModules/Models/SuperModel';

export default class CurrencyModel extends SuperModel {    
    public DisplayCode: string;
    public NativeSymbol: string;
    public Rounding: number;
    public DecimalDigits: number;
    public PluralName: string;    
    constructor(public Symbol?: string) {
        super();
    }
}
