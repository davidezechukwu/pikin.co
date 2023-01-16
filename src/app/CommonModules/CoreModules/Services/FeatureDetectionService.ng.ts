import { Injector, Injectable } from '@angular/core';
import { SuperComponent } from '../../SuperModules/Components/SuperComponent/SuperComponent.ng';
import { LocalisationService } from './LocalisationService.ng';
import { NotificationService } from './NotificationService.ng';

@Injectable()
export class FeatureDetectionService {
  constructor(
    protected Injector: Injector
  ) {

  }

  public IsOnLowSpeedConnection(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(false);
    });
    /*
    return new Promise<boolean>((resolve, reject) => {
        var speedTest = {
            ImageUrl: "http://pikin.co/assets/images/speedTest.jpg",
            DownloadSizeInBytes: 877799, 
            Duration: 0,
            BitsLoaded: 0,
            SpeedBps: 0,
            SpeedKbps : 0,
            SpeedMbps : 0,
            StartTime: 0,
            EndTime : 0
        }
        var download = new Image();
        download.onload = function (ev: Event) {                
            speedTest.EndTime = (new Date()).getTime();
            speedTest.Duration = (speedTest.EndTime - speedTest.StartTime) / 1000;
            speedTest.BitsLoaded = speedTest.DownloadSizeInBytes * 8;
            speedTest.SpeedBps = speedTest.BitsLoaded / speedTest.Duration;
            speedTest.SpeedKbps = speedTest.SpeedBps / 1024;
            speedTest.SpeedMbps = speedTest.SpeedKbps / 1024;
            resolve(speedTest.SpeedKbps < 3000);
        };

        download.onerror = function (ev: ErrorEvent) {
            resolve(true);
            //TODO:// reject("Unable to determine Connection Speed");
        }

        speedTest.StartTime = (new Date()).getTime();
        var nonce  = "?nonce =" + speedTest.StartTime;
        download.src = speedTest.ImageUrl + nonce;            
    });
    */
  }
}
