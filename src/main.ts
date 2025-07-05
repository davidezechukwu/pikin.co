import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RootComponent } from './app/CommonModules/RootModules/Components/RootComponent/RootComponent.ng';
import { RootRoutes } from './app/CommonModules/RootModules/RootRoutingModule.ng';
import { AuthenticationService } from './app/DashboardModules/Security/Services/AuthenticationService.ng';
import { MemberService } from './app/DashboardModules/Security/Services/MemberService.ng';
import { GameService } from './app/DashboardModules/Game/Services/GameService.ng';
import { NumberSystemService } from './app/DashboardModules/Game/Services/NumberSystemService.ng';
import { FundingService } from './app/DashboardModules/Funding/Services/FundingService.ng';
import { PaymentService } from './app/DashboardModules/Funding/Services/PaymentService.ng';
import { NavigationService } from './app/CommonModules/CoreModules/Services/NavigationService.ng';
import { SessionService } from './app/CommonModules/CoreModules/Services/SessionService.ng';
import { FeatureDetectionService } from './app/CommonModules/CoreModules/Services/FeatureDetectionService.ng';
import { CachingService } from './app/CommonModules/CoreModules/Services/CachingService.ng';
import { ErrorHandlingService } from './app/CommonModules/CoreModules/Services/ErrorHandlingService.ng';
import { GeoLocationService } from './app/CommonModules/CoreModules/Services/GeoLocationService.ng';
import { GlobalisationService } from './app/CommonModules/CoreModules/Services/GlobalisationService.ng';
import { LocalisationService } from './app/CommonModules/CoreModules/Services/LocalisationService.ng';
import { NotificationService } from './app/CommonModules/CoreModules/Services/NotificationService.ng';
import { TicketService } from './app/TicketModules/Services/TicketService.ng';
import { provideToastr } from 'ngx-toastr';


enableProdMode();

bootstrapApplication(RootComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(RootRoutes),
    provideToastr(),
    AuthenticationService,
    MemberService,
    GameService,
    NumberSystemService,
    FundingService,
    PaymentService,
    NavigationService,
    SessionService,
    FeatureDetectionService,
    CachingService,
    ErrorHandlingService,
    GeoLocationService,
    GlobalisationService,
    LocalisationService,
    NotificationService,
    TicketService
  ]
}).catch(err => console.error(err));


