import { SuperModel } from '../../../CommonModules/SuperModules/Models/SuperModel';
import { PaymentMethodLocationModel } from './PaymentMethodLocationModel';

export class PaymentMethodModel extends SuperModel {
    public PaymentMethodType: PaymentMethodTypeEnum = PaymentMethodTypeEnum.Demo;
    public PaymentMethodLocations: PaymentMethodLocationModel[] = [];
    public RouterProviderData: string = '';    
}

export enum PaymentMethodTypeEnum {
    Demo = 0,
    AMEX,
    ApplePay,
    Braintree,
    CheckoutByAmazon,
    ChequeTransfer,
    Entropay,
    FastBankTransfer,
    IDebit,
    LogInAndPayWithAmazon,
    Neteller,
    PayPal,
    PaySafeCard,
    PayStand,
    Skrill,
    Square,
    Stripe,        
    WireTransfer,
    Visa
}
