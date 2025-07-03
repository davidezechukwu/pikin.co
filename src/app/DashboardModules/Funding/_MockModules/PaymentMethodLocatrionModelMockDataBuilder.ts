
import { PaymentMethodModel, PaymentMethodTypeEnum } from '../Models/PaymentMethodModel';
import { PaymentMethodLocationModel } from '../Models/PaymentMethodLocationModel';
import { SuperModelMockDataBuilder } from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';
import { LocationTypesMock } from '../../../CommonModules/CoreModules/_MockModules/LocationTypeModelMockDataBuilder';
import { LocationsMock } from '../../../CommonModules/CoreModules/_MockModules/LocationModelMockDataBuilder';

export class PaymentMethodLocatrionModelMockDataBuilder extends SuperModelMockDataBuilder {    
    public BuildMocks(paymentMethodModel: PaymentMethodModel): PaymentMethodLocationModel[] {                
        if (paymentMethodModel.PaymentMethodType == PaymentMethodTypeEnum.Demo) {
            return this.BuildMocksForDemo(paymentMethodModel);
        }
        return [];
    }

    protected BuildMocksForDemo(paymentMethod: PaymentMethodModel): PaymentMethodLocationModel[] {        
        var paymentMethodLocations: PaymentMethodLocationModel[] = [];
        var countryLocationType = LocationTypesMock.find(function (locationType) { return locationType.Name.toLowerCase() == "Country".toLowerCase() });
        var countries = LocationsMock.filter(location => location?.LocationType?.ID == countryLocationType!.ID);
        countries.forEach(country => {
            var paymentMethodLocation = new PaymentMethodLocationModel();
            paymentMethodLocation.ID = super.GetNextID();
            paymentMethodLocation.PaymentMethodID = paymentMethod.ID;
            paymentMethodLocation.LocationID = country.ID;
            paymentMethodLocations.push(paymentMethodLocation);
        });
        return paymentMethodLocations;
    }

}


