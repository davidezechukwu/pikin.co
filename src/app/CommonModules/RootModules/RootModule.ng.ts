import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { IntlModule } from '@progress/kendo-angular-intl'

/*Root Modules*/
import RootComponent from './Components/RootComponent/RootComponent.ng'; 
import { RootRoutingModule } from './RootRoutingModule.ng';
import RootTopMenuComponent from './Components/RootTopMenuComponent/RootTopMenuComponent.ng';
import RootBackgroundComponent from './Components/RootBackgroundComponent/RootBackgroundComponent.ng';
import RootCollapserComponent from './Components/RootCollapserComponent/RootCollapserComponent.ng';

/*Core*/
import SafePipe from '../CoreModules/Pipes/SafePipe/SafePipe.ng';

/*Pages*/
import HomePage from '../../HomeModules/Pages/HomePage/HomePage.ng';
import AboutPikincoPage from '../../HomeModules/Pages/AboutPikincoPage/AboutPikincoPage.ng';
import HTTP404Page from '../../HomeModules/Pages/HTTP404Page/HTTP404Page.ng';
import FormsAuthenticationLoginPage from '../../DashboardModules/Security/Pages/FormsAuthenticationLoginPage/FormsAuthenticationLoginPage.ng';
import FormsAuthenticationLoginComponent from '../../DashboardModules/Security/Components/FormsAuthenticationLoginComponent/FormsAuthenticationLoginComponent.ng';
import FormsAuthenticationRegisterPage from '../../DashboardModules/Security/Pages/FormsAuthenticationRegisterPage/FormsAuthenticationRegisterPage.ng';
import FormsAuthenticationRegisterComponent from '../../DashboardModules/Security/Components/FormsAuthenticationRegisterComponent/FormsAuthenticationRegisterComponent.ng';
import FormsAuthenticationResetPasswordPage from '../../DashboardModules/Security/Pages/FormsAuthenticationResetPasswordPage/FormsAuthenticationResetPasswordPage.ng';
import FormsAuthenticationResetPasswordComponent from '../../DashboardModules/Security/Components/FormsAuthenticationResetPasswordComponent/FormsAuthenticationResetPasswordComponent.ng';

/*Games*/
import GamePrizeListComponent from '../../DashboardModules/Game/Components/GamePrizeListComponent/GamePrizeListComponent.ng';

/*Tickets*/
import PlayPage from '../../TicketModules/Pages/PlayPage/PlayPage.ng';
import BuyTicketPage from '../../TicketModules/Pages/BuyTicketPage/BuyTicketPage.ng';
import BuyTicketsPage from '../../TicketModules/Pages/BuyTicketsPage/BuyTicketsPage.ng';
import PlayComponent from '../../TicketModules/Components/PlayComponent/PlayComponent.ng';
import WinningTicketListPage from '../../TicketModules/Pages/WinningTicketListPage/WinningTicketListPage.ng';
import WinningTicketListComponent from '../../TicketModules/Components/WinningTicketListComponent/WinningTicketListComponent.ng';
import WinningTicketDetailsPage from '../../TicketModules/Pages/WinningTicketDetailsPage/WinningTicketDetailsPage.ng';
import WinningTicketDetailsComponent from '../../TicketModules/Components/WinningTicketDetailsComponent/WinningTicketDetailsComponent.ng';
import TotalPayoutComponent from '../../TicketModules/Components/TotalPayoutComponent/TotalPayoutComponent.ng';

/*Dashboard*/
import DashboardHomePage from '../../DashboardModules/Home/Pages/DashboardHomePage/DashboardHomePage.ng';
import AccountHomePage from '../../DashboardModules/Account/Pages/AccountHomePage/AccountHomePage.ng';
import VerifyAccountPage from '../../DashboardModules/Account/Pages/VerifyAccountPage/VerifyAccountPage.ng';
import CloseAccountPage from '../../DashboardModules/Account/Pages/CloseAccountPage/CloseAccountPage.ng';
import SecurityHomePage from '../../DashboardModules/Security/Pages/SecurityHomePage/SecurityHomePage.ng';
import AutomaticSignOutPage from '../../DashboardModules/Security/Pages/AutomaticSignOutPage/AutomaticSignOutPage.ng';
import ChangePasswordPage from '../../DashboardModules/Security/Pages/ChangePasswordPage/ChangePasswordPage.ng';
import ChangePINPage from '../../DashboardModules/Security/Pages/ChangePINPage/ChangePINPage.ng';
import LogonDetailsPage from '../../DashboardModules/Security/Pages/LogonDetailsPage/LogonDetailsPage.ng';
import LoginHistoryPage from '../../DashboardModules/Security/Pages/LoginHistoryPage/LoginHistoryPage.ng';
import UsePINAuthenticationPage from '../../DashboardModules/Security/Pages/UsePINAuthenticationPage/UsePINAuthenticationPage.ng';
import UseTwoStepAuthenticationPage from '../../DashboardModules/Security/Pages/UseTwoStepAuthenticationPage/UseTwoStepAuthenticationPage.ng';
import FundingHomePage from '../../DashboardModules/Funding/Pages/FundingHomePage/FundingHomePage.ng';
import AddFundsPage from '../../DashboardModules/Funding/Pages/AddFundsPage/AddFundsPage.ng';
import WithdrawFundsPage from '../../DashboardModules/Funding/Pages/WithdrawFundsPage/WithdrawFundsPage.ng';
import ViewStatementPage from '../../DashboardModules/Funding/Pages/ViewStatementPage/ViewStatementPage.ng';
import DemoPaymentMethodPage from '../../DashboardModules/Funding/Pages/PaymentMethods/DemoPaymentMethodPage/DemoPaymentMethodPage.ng';
import PaymentConfirmationPage from '../../DashboardModules/Funding/Pages/PaymentConfirmationPage/PaymentConfirmationPage.ng';
import CorrespondenceHomePage from '../../DashboardModules/Correspondence/Pages/CorrespondenceHomePage/CorrespondenceHomePage.ng';
import CorrespondencePreferencesHomePage from '../../DashboardModules/Correspondence/Pages/CorrespondencePreferences/CorrespondencePreferencesHomePage/CorrespondencePreferencesHomePage.ng';
import CorrespondenceTextPreferencesPage from '../../DashboardModules/Correspondence/Pages/CorrespondencePreferences/CorrespondenceTextPreferencesPage/CorrespondenceTextPreferencesPage.ng';
import CorrespondenceEmailPreferencesPage from '../../DashboardModules/Correspondence/Pages/CorrespondencePreferences/CorrespondenceEmailPreferencesPage/CorrespondenceEmailPreferencesPage.ng';
import CorrespondenceMailPreferencesPage from '../../DashboardModules/Correspondence/Pages/CorrespondencePreferences/CorrespondenceMailPreferencesPage/CorrespondenceMailPreferencesPage.ng';
import CorrespondenceDirectMarketingPreferencesPage from '../../DashboardModules/Correspondence/Pages/CorrespondencePreferences/CorrespondenceDirectMarketingPreferencesPage/CorrespondenceDirectMarketingPreferencesPage.ng';
import CorrespondenceEmailAddressPage from '../../DashboardModules/Correspondence/Pages/CorrespondenceEmailAddressPage/CorrespondenceEmailAddressPage.ng';
import CorrespondenceTelephoneNumberPage from '../../DashboardModules/Correspondence/Pages/CorrespondenceTelephoneNumberPage/CorrespondenceTelephoneNumberPage.ng';
import CorrespondenceResidentialAddressPage from '../../DashboardModules/Correspondence/Pages/CorrespondenceResidentialAddressPage/CorrespondenceResidentialAddressPage.ng';
import MailboxHomePage from '../../DashboardModules/Correspondence/Pages/Mailbox/MailboxHomePage/MailboxHomePage.ng';
import InboxPage from '../../DashboardModules/Correspondence/Pages/Mailbox/InboxPage/InboxPage.ng';
import ComposeMessagePage from '../../DashboardModules/Correspondence/Pages/Mailbox/ComposeMessagePage/ComposeMessagePage.ng';
import SentMessagesPage from '../../DashboardModules/Correspondence/Pages/Mailbox/SentMessagesPage/SentMessagesPage.ng';
import NumberSystemHomePage from '../../DashboardModules/Game/Pages/NumberSystemHomePage/NumberSystemHomePage.ng';
import AboutTheCurrentNumberSystemPage from '../../DashboardModules/Game/Pages/AboutTheCurrentNumberSystemPage/AboutTheCurrentNumberSystemPage.ng';
import ChangeNumberSystemPage from '../../DashboardModules/Game/Pages/ChangeNumberSystemPage/ChangeNumberSystemPage.ng';
import SettingsHomePage from '../../DashboardModules/Settings/Pages/SettingsHomePage/SettingsHomePage.ng';
import SettingsCurrencyPage from '../../DashboardModules/Settings/Pages/SettingsCurrencyPage/SettingsCurrencyPage.ng';
import SettingsLocationPage from '../../DashboardModules/Settings/Pages/SettingsLocationPage/SettingsLocationPage.ng';
import SettingsGlobalisationPage from '../../DashboardModules/Settings/Pages/SettingsGlobalisationPage/SettingsGlobalisationPage.ng';
import SettingsLanguagePage from '../../DashboardModules/Settings/Pages/SettingsLanguagePage/SettingsLanguagePage.ng';

/*services*/
import { AuthenticationService } from '../../DashboardModules/Security/Services/AuthenticationService.ng';
import { MemberService } from '../../DashboardModules/Security/Services/MemberService.ng';
import { GameService } from '../../DashboardModules/Game/Services/GameService.ng';
import { NumberSystemService } from '../../DashboardModules/Game/Services/NumberSystemService.ng';
import { FundingService } from '../../DashboardModules/Funding/Services/FundingService.ng';
import { PaymentService } from '../../DashboardModules/Funding/Services/PaymentService.ng';
import {NavigationService}   from '../CoreModules/Services/NavigationService.ng'
import {SessionService}   from '../CoreModules/Services/SessionService.ng';
import { FeatureDetectionService } from '../CoreModules/Services/FeatureDetectionService.ng';
import {CachingService}   from '../CoreModules/Services/CachingService.ng';
import { ErrorHandlingService } from '../CoreModules/Services/ErrorHandlingService.ng'
import { GeoLocationService } from '../CoreModules/Services/GeoLocationService.ng'
import {GlobalisationService}  from '../CoreModules/Services/GlobalisationService.ng';
import {LocalisationService}   from '../CoreModules/Services/LocalisationService.ng';
import {NotificationService}   from '../CoreModules/Services/NotificationService.ng'
import {TicketService}   from '../../TicketModules/Services/TicketService.ng';
import TicketListPage from '../../TicketModules/Pages/TicketListPage/TicketListPage.ng';
import TicketDetailsPage from '../../TicketModules/Pages/TicketDetailsPage/TicketDetailsPage.ng';


/*location specific pages*/
import AboutUsHomePage from '../../LocationSpecificModules/Pages/AboutUsHomePage/AboutUsHomePage.ng';
import BeResponsiblePage from '../../LocationSpecificModules/Pages/BeResponsiblePage/BeResponsiblePage.ng';
import StatisticsPage from '../../LocationSpecificModules/Pages/StatisticsPage/StatisticsPage.ng';
import TermsAndConditionsPage from '../../LocationSpecificModules/Pages/TermsAndConditionsPage/TermsAndConditionsPage.ng';
import ContactUsPage from '../../LocationSpecificModules/Pages/ContactUsPage/ContactUsPage.ng';
import ContactUsByEmailPage from '../../LocationSpecificModules/Pages/ContactUsByEmailPage/ContactUsByEmailPage.ng';
import ContactUsByPhonePage from '../../LocationSpecificModules/Pages/ContactUsByPhonePage/ContactUsByPhonePage.ng';
import ContactUsByPostPage from '../../LocationSpecificModules/Pages/ContactUsByPostPage/ContactUsByPostPage.ng';
import ContactUsByWebChatPage from '../../LocationSpecificModules/Pages/ContactUsByWebChatPage/ContactUsByWebChatPage.ng';
import LegalPage from '../../LocationSpecificModules/Pages/LegalPage/LegalPage.ng';
import PrivacyPage from '../../LocationSpecificModules/Pages/PrivacyPage/PrivacyPage.ng';
import DataProtectionPage from '../../LocationSpecificModules/Pages/DataProtectionPage/DataProtectionPage.ng';
import LicencesPage from '../../LocationSpecificModules/Pages/LicencesPage/LicencesPage.ng';
import AccreditationsPage from '../../LocationSpecificModules/Pages/AccreditationsPage/AccreditationsPage.ng';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        RootRoutingModule,
        GridModule,
        IntlModule 
    ],        
    exports: [
    ],
    declarations: [        
        RootComponent,
        RootTopMenuComponent,        
        RootBackgroundComponent,
        RootCollapserComponent,        
               
        HTTP404Page,
        HomePage,
        AboutPikincoPage,

        SafePipe,

        PlayPage,
        BuyTicketPage,
        BuyTicketsPage,
        PlayComponent,

        GamePrizeListComponent,

        FormsAuthenticationLoginPage,
        FormsAuthenticationLoginComponent,
        FormsAuthenticationRegisterPage,
        FormsAuthenticationRegisterComponent,
        FormsAuthenticationResetPasswordPage,
        FormsAuthenticationResetPasswordComponent,

        TicketListPage,
        TicketDetailsPage,

        WinningTicketListPage,
        WinningTicketListComponent,
        WinningTicketDetailsPage,
        WinningTicketDetailsComponent,
        TotalPayoutComponent,        

        DashboardHomePage,

        AccountHomePage,
        VerifyAccountPage,
        CloseAccountPage,

        SecurityHomePage,
        AutomaticSignOutPage,
        ChangePasswordPage,
        ChangePINPage,
        LogonDetailsPage,
        LoginHistoryPage,
        UsePINAuthenticationPage,
        UseTwoStepAuthenticationPage,

        FundingHomePage,
        AddFundsPage,
        WithdrawFundsPage,
        ViewStatementPage,
        DemoPaymentMethodPage,
        PaymentConfirmationPage,

        CorrespondenceHomePage,
        CorrespondencePreferencesHomePage,        
        CorrespondenceTextPreferencesPage,
        CorrespondenceEmailPreferencesPage,
        CorrespondenceMailPreferencesPage,
        CorrespondenceDirectMarketingPreferencesPage,

        CorrespondenceEmailAddressPage,
        CorrespondenceTelephoneNumberPage,
        CorrespondenceResidentialAddressPage,
        MailboxHomePage,
        InboxPage,
        ComposeMessagePage,
        SentMessagesPage,

        NumberSystemHomePage,
        AboutTheCurrentNumberSystemPage,
        ChangeNumberSystemPage,

        SettingsHomePage,
        SettingsCurrencyPage,
        SettingsLocationPage,
        SettingsLanguagePage,
        SettingsGlobalisationPage,

        AboutUsHomePage,
        TermsAndConditionsPage,
        BeResponsiblePage,
        StatisticsPage,
        ContactUsPage,
        ContactUsByEmailPage,
        ContactUsByPhonePage,
        ContactUsByPostPage,
        ContactUsByWebChatPage,

        LegalPage,
        PrivacyPage,
        DataProtectionPage,
        LicencesPage,
        AccreditationsPage
    ],    
    providers: [
        AuthenticationService,
        CachingService,
        ErrorHandlingService,
        GeoLocationService,
        GameService,
        GlobalisationService,
        LocalisationService,

        MemberService,   
        FundingService,
        TicketService,         
        
        NavigationService,
        NotificationService,
        NumberSystemService,

        PaymentService,

        SessionService,
        FeatureDetectionService
    ],
    bootstrap: [RootComponent],    
})
export class RootModule {

}
