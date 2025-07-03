import { Injectable, Injector } from '@angular/core';

import { SessionService } from './SessionService.ng';

@Injectable()
export class GeoLocationService {
    protected SessionService: SessionService;
    constructor(
        protected Injector: Injector
    ) {
        this.SessionService = this.Injector.get(SessionService);
    };

    public GetCountryCode(date: Date): Promise<string | null> {
        return new Promise<string | null>((resolve, reject) => {
            resolve(null);
            reject(null);
        });
    }

    //protected LookupLatLongWithBrowserGeolocation() : Promise<any> {
    //    var me = 'browser geolocation';
    //    var dfr = $.Deferred();

    //    navigator.geolocation.getCurrentPosition(function (position) {
    //        //Columbiaconsole.log(me + ' resolving: ' + position.coords.latitude + ',' + position.coords.longitude);
    //        dfr.resolve({ who: me, coords: position.coords });
    //    });

    //    return dfr;
    //}

    // supports CORS and JSONP
    //protected LatLongToCountryWithGeonames(data) : Promise<any> {
    //    var me = 'geonames';
    //    var dfr = $.ajax({
    //            url: 'http://ws.geonames.org/countryCode',
    //            data: {
    //                lat: data.coords.latitude,
    //                lng: data.coords.longitude,
    //                type: 'JSON'
    //            },
    //            dataType: $.support.cors ? 'json' : 'jsonp'
    //        });

    //    dfr = dfr.pipe(function (results) {
    //        if (results.countryCode === 'XX') {
    //            //console.log(me + ' rejecting: ' + results.countryCode);
    //            return $.Deferred().reject();
    //        } else {
    //            //console.log(me + ' returning: ' + results.countryCode);
    //            return { who: me, code: results.countryCode };
    //        }
    //    });
    //    return dfr;
    //}

    // supports CORS only
    //protected LookupCountryWithHostipInfo() {
    //    if ($.support.cors) {  // doesn't support JSONP
    //        var me = 'hostip.info';
    //        var dfr = $.ajax({
    //                url: 'http://api.hostip.info/get_json.php',
    //                dataType: 'json'
    //            });

    //        dfr = dfr.pipe(function (results) {
    //            if (results.country_code === 'XX') {
    //                //console.log(me + ' rejecting: ' + results.country_code);
    //                return $.Deferred().reject();
    //            } else {
    //                //console.log(me + ' returning: ' + results.country_code);
    //                return { who: me, code: results.country_code };
    //            }
    //        });
    //        return dfr;
    //    } else {
    //        return undefined;
    //    }
    //}

    // supports JSONP only
    //protected LookupCountryWithGeoplugin() {
    //    var me = 'geoplugin';
    //    var dfr = $.ajax({
    //            url: 'http://www.geoplugin.net/json.gp?',
    //            dataType: 'jsonp', // doesn't support CORS
    //            data: {
    //                'native': 1
    //            },
    //            jsonp: 'jsoncallback'
    //        });

    //    dfr = dfr.pipe(function (results) {
    //        //console.log(me + ' returning: ' + results.geoplugin_countryCode);
    //        return { who: me, code: results.geoplugin_countryCode };
    //    });
    //    return dfr;
    //}

    // supports CORS and JSONP
    //protected lookupCountryWithFreegeoip() {
    //    var me = 'freegeoip';
    //    var dfr = $.ajax({
    //            url: 'http://freegeoip.net/json/',
    //            dataType: $.support.cors ? 'json' : 'jsonp'
    //        });

    //    dfr = dfr.pipe(function (results) {
    //        //console.log(me + ' returning: ' + results.country_code);
    //        return { who: me, code: results.country_code };
    //    });
    //    return dfr;
    //}
}
