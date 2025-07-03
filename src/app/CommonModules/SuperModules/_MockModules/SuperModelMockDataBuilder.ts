import { CaptionConstantsModel } from '../../CoreModules/Models/CaptionConstantsModel';
import { CurrencyModel } from '../../CoreModules/Models/CurrencyModel';
import { GlobalPropertiesModel } from '../../CoreModules/Models/GlobalPropertiesModel';
import { GlobalMockPropertiesModel } from '../../CoreModules/Models/GlobalMockPropertiesModel';
import { CurrenciesMock } from '../../CoreModules/_MockModules/CurrencyModelMockDataBuilder';

export class SuperModelMockDataBuilder {        
    private CurrentID: number = 0;
    public GetNextID(): any {
        return (++this.CurrentID).toString();
    }

    private CurrentIDLevel2: number = 0;
    public GetNextIDLevel2(): any {
        return (++this.CurrentIDLevel2).toString();
    }

    private CurrentIDLevel3: number = 0;
    public GetNextIDLevel3(): any {
        return (++this.CurrentIDLevel3).toString();
    }

    public CaptionConstants: CaptionConstantsModel = new CaptionConstantsModel();
    public DefaultCurrency: CurrencyModel | undefined;
    public GlobalProperties: GlobalPropertiesModel;
    public GlobalMockProperties: GlobalMockPropertiesModel;

    constructor() {           
        this.GlobalProperties = new GlobalPropertiesModel();
        this.GlobalMockProperties = new GlobalMockPropertiesModel();
        var me = this;

        this.DefaultCurrency = CurrenciesMock.find(function (currency: any) { return currency.Name.toLowerCase() == me.GlobalProperties.DefaultCurrencyName.toLowerCase() });
        if (!this.DefaultCurrency) {
            throw "Default Currency could not be found";
        }
    }
}