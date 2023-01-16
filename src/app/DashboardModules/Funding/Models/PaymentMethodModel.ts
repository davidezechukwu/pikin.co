import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import PaymentMethodLocationModel from './PaymentMethodLocationModel';

export class PaymentMethodModel extends SuperModel {
    public PaymentMethodType: PaymentMethodTypeEnum;
    public PaymentMethodLocations: PaymentMethodLocationModel[] = [];
    public RouterProviderData: string;
    //public readonly AddressLine: string[];
    //public readonly DependentLocality: string;
    //public readonly City: string;
    //public readonly Region: string;
    //public readonly PostalCode: string;
    //public readonly Country: string;    
    //public readonly LanguageCode: string;
    //public readonly Organization: string;
    //public readonly Telephone: string;    
    //public readonly Recipient: string;    
    //public readonly SortingCode: string;
    //public ToJSON(): any { };
}

export enum PaymentMethodTypeEnum {
    Demo = 0,
    //AMEX,
    //ApplePay,
    //Braintree,
    //CheckoutByAmazon,
    //ChequeTransfer,
    //Entropay,
    //FastBankTransfer,
    //IDebit,
    //LogInAndPayWithAmazon,
    //Neteller,
    PayPal,
    //PaySafeCard,
    //PayStand,
    //Skrill,
    //Square,
    //Stripe,        
    //WireTransfer,
    Visa
}
