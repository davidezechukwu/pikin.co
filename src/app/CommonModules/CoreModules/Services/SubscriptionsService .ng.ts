import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionsService {
    private _subscription = new Subscription();
    public get Subscription() { return this._subscription }
    Add(subscription: Subscription): void {
        this._subscription.add(subscription);
    }

    Unsubscribe(): void {
        this._subscription.unsubscribe();
    }
}