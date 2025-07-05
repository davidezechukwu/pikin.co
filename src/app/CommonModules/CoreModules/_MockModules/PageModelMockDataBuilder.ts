import { SuperPageModel } from '../../SuperModules/Models/SuperPageModel'
import { SuperModelMockDataBuilder } from '../../SuperModules/_MockModules/SuperModelMockDataBuilder';


export class PageModelMockDataBuilder extends SuperModelMockDataBuilder{
    BuildMocks(): SuperPageModel[] {        

        var pages: SuperPageModel[] = [];

        var hTTP404Page = new SuperPageModel()
        hTTP404Page.ID = this.GetNextID( );
        hTTP404Page.PageName = "HTTP404Page";
        hTTP404Page.PageTitle = this.CaptionConstants.ErrorHTTP404;        
        pages.push(hTTP404Page);

        var homePage = new SuperPageModel()
        homePage.ID = this.GetNextID();
        homePage.PageName = "HomePage";
        homePage.PageTitle = this.CaptionConstants.Home;        
        pages.push(homePage);

        var playPage = new SuperPageModel;
        playPage.ID = this.GetNextID( );
        playPage.PageName = "PlayPage";
        playPage.PageTitle = this.CaptionConstants.Play;
        pages.push(playPage);

        var buyTicketPage = new SuperPageModel;
        buyTicketPage.ID = this.GetNextID( );
        buyTicketPage.PageName = "BuyTicketPage";
        buyTicketPage.PageTitle = this.CaptionConstants.BuyTicket;
        pages.push(buyTicketPage);

        var buyTicketsPage = new SuperPageModel;
        buyTicketsPage.ID = this.GetNextID();
        buyTicketsPage.PageName = "BuyTicketsPage";
        buyTicketsPage.PageTitle = this.CaptionConstants.BuyTickets;
        pages.push(buyTicketsPage);

        var formsAuthenticationLoginPage = new SuperPageModel;
        formsAuthenticationLoginPage.ID = this.GetNextID( );
        formsAuthenticationLoginPage.PageName = "FormsAuthenticationLoginPage";
        formsAuthenticationLoginPage.PageTitle = this.CaptionConstants.LogIn;
        pages.push(formsAuthenticationLoginPage);

        var formsAuthenticationRegisterPage = new SuperPageModel;
        formsAuthenticationRegisterPage.ID = this.GetNextID( );
        formsAuthenticationRegisterPage.PageName = "FormsAuthenticationRegisterPage";
        formsAuthenticationRegisterPage.PageTitle = this.CaptionConstants.Register;
        pages.push(formsAuthenticationRegisterPage);

        var formsAuthenticationResetPasswordPage = new SuperPageModel;
        formsAuthenticationResetPasswordPage.ID = this.GetNextID( );
        formsAuthenticationResetPasswordPage.PageName = "FormsAuthenticationResetPasswordPage";
        formsAuthenticationResetPasswordPage.PageTitle = this.CaptionConstants.ResetPassword;
        pages.push(formsAuthenticationResetPasswordPage);
        
        var ticketDetailsPage = new SuperPageModel;
        ticketDetailsPage.ID = this.GetNextID( );
        ticketDetailsPage.PageName = "TicketDetailsPage";
        ticketDetailsPage.PageTitle = this.CaptionConstants.MyTicket;
        pages.push(ticketDetailsPage);

        var ticketListPage = new SuperPageModel;
        ticketListPage.ID = this.GetNextID();
        ticketListPage.PageName = "TicketListPage";
        ticketListPage.PageTitle = this.CaptionConstants.MyTickets;
        pages.push(ticketListPage);

        var dashboardPage = new SuperPageModel;
        dashboardPage.ID = this.GetNextID( );
        dashboardPage.PageName = "DashboardHomePage";
        dashboardPage.PageTitle = this.CaptionConstants.Dashboard;
        pages.push(dashboardPage);

        var accountPage = new SuperPageModel;
        accountPage.ID = this.GetNextID( );
        accountPage.PageName = "AccountHomePage";
        accountPage.PageTitle = this.CaptionConstants.AccountHome;
        pages.push(accountPage);

        var verifyAccountPage = new SuperPageModel;
        verifyAccountPage.ID = this.GetNextID( );
        verifyAccountPage.PageName = "VerifyAccountPage";
        verifyAccountPage.PageTitle = this.CaptionConstants.VerifyYourAccount;
        pages.push(verifyAccountPage);

        var closeAccountPage = new SuperPageModel;
        closeAccountPage.ID = this.GetNextID( );
        closeAccountPage.PageName = "CloseAccountPage";
        closeAccountPage.PageTitle = "Close your Account";
        pages.push(closeAccountPage);

        var securityHomePage = new SuperPageModel;
        securityHomePage.ID = this.GetNextID( );
        securityHomePage.PageName = "SecurityHomePage";
        securityHomePage.PageTitle = this.CaptionConstants.SecurityHome;
        pages.push(securityHomePage);

        var automaticSignOutPage = new SuperPageModel;
        automaticSignOutPage.ID = this.GetNextID( );
        automaticSignOutPage.PageName = "AutomaticSignOutPage";
        automaticSignOutPage.PageTitle = this.CaptionConstants.AutomaticSignOut;
        pages.push(automaticSignOutPage);

        var changePasswordPage = new SuperPageModel;
        changePasswordPage.ID = this.GetNextID( );
        changePasswordPage.PageName = "ChangePasswordPage";
        changePasswordPage.PageTitle = this.CaptionConstants.ChangePassword;
        pages.push(changePasswordPage);

        var changePINPage = new SuperPageModel;
        changePINPage.ID = this.GetNextID( );
        changePINPage.PageName = "ChangePINPage";
        changePINPage.PageTitle = this.CaptionConstants.ChangePIN;
        pages.push(changePINPage);

        var logonDetailsPage = new SuperPageModel;
        logonDetailsPage.ID = this.GetNextID( );
        logonDetailsPage.PageName = "LogonDetailsPage";
        logonDetailsPage.PageTitle = this.CaptionConstants.LogonDetails;
        pages.push(logonDetailsPage);

        var loginHistoryPage = new SuperPageModel;
        loginHistoryPage.ID = this.GetNextID( );
        loginHistoryPage.PageName = "LoginHistoryPage";
        loginHistoryPage.PageTitle = this.CaptionConstants.LoginHistory;
        pages.push(loginHistoryPage);

        var usePINAuthenticationPage = new SuperPageModel;
        usePINAuthenticationPage.ID = this.GetNextID( );
        usePINAuthenticationPage.PageName = "UsePINAuthenticationPage";
        usePINAuthenticationPage.PageTitle = this.CaptionConstants.UsePINAuthentication;
        pages.push(usePINAuthenticationPage);

        var useTwoStepAuthenticationPage = new SuperPageModel;
        useTwoStepAuthenticationPage.ID = this.GetNextID( );
        useTwoStepAuthenticationPage.PageName = "UseTwoStepAuthenticationPage";
        useTwoStepAuthenticationPage.PageTitle = this.CaptionConstants.UseTwoStepAuthentication;
        pages.push(useTwoStepAuthenticationPage);

        var fundingHomePage = new SuperPageModel;
        fundingHomePage.ID = this.GetNextID( );
        fundingHomePage.PageName = "FundingHomePage";
        fundingHomePage.PageTitle = this.CaptionConstants.FundingHome;
        pages.push(fundingHomePage);

        var viewStatementPage = new SuperPageModel;
        viewStatementPage.ID = this.GetNextID( );
        viewStatementPage.PageName = "ViewStatementPage";
        viewStatementPage.PageTitle = this.CaptionConstants.ViewStatement;
        pages.push(viewStatementPage);

        var addFundsPage = new SuperPageModel;
        addFundsPage.ID = this.GetNextID( );
        addFundsPage.PageName = "AddFundsPage";
        addFundsPage.PageTitle = this.CaptionConstants.AddFunds;
        pages.push(addFundsPage);

        var withdrawFundsPage = new SuperPageModel;
        withdrawFundsPage.ID = this.GetNextID( );
        withdrawFundsPage.PageName = "WithdrawFundsPage";
        withdrawFundsPage.PageTitle = this.CaptionConstants.WithdrawFunds;
        pages.push(withdrawFundsPage);

        var demoPaymentMethodPage = new SuperPageModel;
        demoPaymentMethodPage.ID = this.GetNextID();
        demoPaymentMethodPage.PageName = "DemoPaymentMethodPage";
        demoPaymentMethodPage.PageTitle = this.CaptionConstants.PaymentMethodTypeDemo;
        pages.push(demoPaymentMethodPage);

        var paymentConfirmationPage = new SuperPageModel;
        paymentConfirmationPage.ID = this.GetNextID();
        paymentConfirmationPage.PageName = "PaymentConfirmationPage";
        paymentConfirmationPage.PageTitle = this.CaptionConstants.PaymentConfirmation;
        pages.push(paymentConfirmationPage);

        var correspondenceHomePage = new SuperPageModel;
        correspondenceHomePage.ID = this.GetNextID( );
        correspondenceHomePage.PageName = "CorrespondenceHomePage";
        correspondenceHomePage.PageTitle = this.CaptionConstants.CorrespondenceHome;
        pages.push(correspondenceHomePage);

        var correspondencePreferencesPage = new SuperPageModel;
        correspondencePreferencesPage.ID = this.GetNextID( );
        correspondencePreferencesPage.PageName = "CorrespondencePreferencesHomePage";
        correspondencePreferencesPage.PageTitle = this.CaptionConstants.CorrespondencePreferences;
        pages.push(correspondencePreferencesPage);

        var correspondenceTextPreferencesPage = new SuperPageModel;
        correspondenceTextPreferencesPage.ID = this.GetNextID();
        correspondenceTextPreferencesPage.PageName = "CorrespondenceTextPreferencesPage";
        correspondenceTextPreferencesPage.PageTitle = this.CaptionConstants.CorrespondenceTextPreferences;
        pages.push(correspondenceTextPreferencesPage);

        var correspondenceEmailPreferencesPage = new SuperPageModel;
        correspondenceEmailPreferencesPage.ID = this.GetNextID();
        correspondenceEmailPreferencesPage.PageName = "CorrespondenceEmailPreferencesPage";
        correspondenceEmailPreferencesPage.PageTitle = this.CaptionConstants.CorrespondenceEmailPreferences;
        pages.push(correspondenceEmailPreferencesPage);

        var correspondenceMailPreferencesPage = new SuperPageModel;
        correspondenceMailPreferencesPage.ID = this.GetNextID();
        correspondenceMailPreferencesPage.PageName = "CorrespondenceMailPreferencesPage";
        correspondenceMailPreferencesPage.PageTitle = this.CaptionConstants.CorrespondenceMailPreferences;
        pages.push(correspondenceMailPreferencesPage);

        var correspondenceDirectMarketingPreferencesPage = new SuperPageModel;
        correspondenceDirectMarketingPreferencesPage.ID = this.GetNextID();
        correspondenceDirectMarketingPreferencesPage.PageName = "CorrespondenceDirectMarketingPreferencesPage";
        correspondenceDirectMarketingPreferencesPage.PageTitle = this.CaptionConstants.CorrespondenceDirectMarketingPreferences;
        pages.push(correspondenceDirectMarketingPreferencesPage);

        var correspondenceEmailAddressPage = new SuperPageModel;
        correspondenceEmailAddressPage.ID = this.GetNextID( );
        correspondenceEmailAddressPage.PageName = "CorrespondenceEmailAddressPage";
        correspondenceEmailAddressPage.PageTitle = this.CaptionConstants.EmailAddress;
        pages.push(correspondenceEmailAddressPage);

        var correspondenceTelephoneNumberPage = new SuperPageModel;
        correspondenceTelephoneNumberPage.ID = this.GetNextID( );
        correspondenceTelephoneNumberPage.PageName = "CorrespondenceTelephoneNumberPage";
        correspondenceTelephoneNumberPage.PageTitle = this.CaptionConstants.TelephoneNumber;
        pages.push(correspondenceTelephoneNumberPage);

        var correspondenceResidentialAddressPage = new SuperPageModel;
        correspondenceResidentialAddressPage.ID = this.GetNextID( );
        correspondenceResidentialAddressPage.PageName = "CorrespondenceResidentialAddressPage";
        correspondenceResidentialAddressPage.PageTitle = this.CaptionConstants.ResidentialAddress;
        pages.push(correspondenceResidentialAddressPage);

        var mailboxHomePage = new SuperPageModel;
        mailboxHomePage.ID = this.GetNextID( );
        mailboxHomePage.PageName = "MailboxHomePage";
        mailboxHomePage.PageTitle = this.CaptionConstants.MailboxHome;
        pages.push(mailboxHomePage);

        var inboxPage = new SuperPageModel;
        inboxPage.ID = this.GetNextID( );
        inboxPage.PageName = "InboxPage";
        inboxPage.PageTitle = this.CaptionConstants.Inbox;
        pages.push(inboxPage);

        var composeMessagePage = new SuperPageModel;
        composeMessagePage.ID = this.GetNextID( );
        composeMessagePage.PageName = "ComposeMessagePage";
        composeMessagePage.PageTitle = this.CaptionConstants.ComposeMessage;
        pages.push(composeMessagePage);

        var sentMessagesPage = new SuperPageModel;
        sentMessagesPage.ID = this.GetNextID( );
        sentMessagesPage.PageName = "SentMessagesPage";
        sentMessagesPage.PageTitle = this.CaptionConstants.SentMessages;
        pages.push(sentMessagesPage);

        var numberSystemHomePage = new SuperPageModel;
        numberSystemHomePage.ID = this.GetNextID( );
        numberSystemHomePage.PageName = "NumberSystemHomePage";
        numberSystemHomePage.PageTitle = this.CaptionConstants.NumberSystemHome;
        pages.push(numberSystemHomePage);

        var aboutTheCurrentNumberSystemPage = new SuperPageModel;
        aboutTheCurrentNumberSystemPage.ID = this.GetNextID( );
        aboutTheCurrentNumberSystemPage.PageName = "AboutTheCurrentNumberSystemPage";
        aboutTheCurrentNumberSystemPage.PageTitle = this.CaptionConstants.AboutTheCurrentNumberSystem;
        pages.push(aboutTheCurrentNumberSystemPage);

        var changeNumberSystemPage = new SuperPageModel;
        changeNumberSystemPage.ID = this.GetNextID( );
        changeNumberSystemPage.PageName = "ChangeNumberSystemPage";
        changeNumberSystemPage.PageTitle = this.CaptionConstants.ChangeNumberSystem;
        pages.push(changeNumberSystemPage);

        var settingsHomePage = new SuperPageModel;
        settingsHomePage.ID = this.GetNextID( );
        settingsHomePage.PageName = "SettingsHomePage";
        settingsHomePage.PageTitle = this.CaptionConstants.SettingsHome;
        pages.push(settingsHomePage);

        var settingsCurrencyPage = new SuperPageModel;
        settingsCurrencyPage.ID = this.GetNextID();
        settingsCurrencyPage.PageName = "SettingsCurrencyPage";
        settingsCurrencyPage.PageTitle = this.CaptionConstants.Currency;
        pages.push(settingsCurrencyPage);

        var settingsLocationPage = new SuperPageModel;
        settingsLocationPage.ID = this.GetNextID();
        settingsLocationPage.PageName = "SettingsLocationPage";
        settingsLocationPage.PageTitle = this.CaptionConstants.Location;
        pages.push(settingsLocationPage);

        var settingsGlobalisationPage = new SuperPageModel;
        settingsGlobalisationPage.ID = this.GetNextID();
        settingsGlobalisationPage.PageName = "SettingsGlobalisationPage";
        settingsGlobalisationPage.PageTitle = this.CaptionConstants.Globalisation;
        pages.push(settingsGlobalisationPage);

        var settingsLanguagePage = new SuperPageModel;
        settingsLanguagePage.ID = this.GetNextID();
        settingsLanguagePage.PageName = "SettingsLanguagePage";
        settingsLanguagePage.PageTitle = this.CaptionConstants.Language;
        pages.push(settingsLanguagePage);

        var winDetailsPage = new SuperPageModel;
        winDetailsPage.ID = this.GetNextID( );
        winDetailsPage.PageName = "WinningTicketDetailsPage";
        winDetailsPage.PageTitle = this.CaptionConstants.WinDetails;
        pages.push(winDetailsPage);

        var winListPage = new SuperPageModel;
        winListPage.ID = this.GetNextID( );
        winListPage.PageName = "WinningTicketListPage";
        winListPage.PageTitle = this.CaptionConstants.WinningTickets;
        pages.push(winListPage);
                 
        pages = pages.concat(this.BuildLocationPages());

        return pages;
    }

    protected BuildLocationPages(): SuperPageModel[] {
        let locationPages: SuperPageModel[] = [];

        var aboutUsHomePage = new SuperPageModel()
        aboutUsHomePage.ID = this.GetNextID();
        aboutUsHomePage.PageName = "AboutUsHomePage";
        aboutUsHomePage.PageTitle = this.CaptionConstants.LocationSpecificAboutUs;
        locationPages.push(aboutUsHomePage);

        var aboutPikincoPage = new SuperPageModel()
        aboutPikincoPage.ID = this.GetNextID();
        aboutPikincoPage.PageName = "AboutPikincoPage";
        aboutPikincoPage.PageTitle = this.CaptionConstants.AboutpiKinco;
        locationPages.push(aboutPikincoPage);

        var termsAndConditionsPage = new SuperPageModel()
        termsAndConditionsPage.ID = this.GetNextID();
        termsAndConditionsPage.PageName = "TermsAndConditionsPage";
        termsAndConditionsPage.PageTitle = this.CaptionConstants.LocationSpecificTermsAndConditions;
        locationPages.push(termsAndConditionsPage);

        var statisticsPage = new SuperPageModel()
        statisticsPage.ID = this.GetNextID();
        statisticsPage.PageName = "StatisticsPage";
        statisticsPage.PageTitle = this.CaptionConstants.LocationSpecificStatistics;
        locationPages.push(statisticsPage);

        var beResponsiblePage = new SuperPageModel()
        beResponsiblePage.ID = this.GetNextID();
        beResponsiblePage.PageName = "BeResponsiblePage";
        beResponsiblePage.PageTitle = this.CaptionConstants.LocationSpecificBeResponsible;
        locationPages.push(beResponsiblePage);

        var contactUsPage = new SuperPageModel()
        contactUsPage.ID = this.GetNextID();
        contactUsPage.PageName = "ContactUsPage";
        contactUsPage.PageTitle = this.CaptionConstants.LocationSpecificContactUs;
        locationPages.push(contactUsPage);

        var contactUsByEmailPage = new SuperPageModel()
        contactUsByEmailPage.ID = this.GetNextID();
        contactUsByEmailPage.PageName = "ContactUsByEmailPage";
        contactUsByEmailPage.PageTitle = this.CaptionConstants.LocationSpecificContactUsByEmail;
        locationPages.push(contactUsByEmailPage);

        var contactUsByWebChatPage = new SuperPageModel()
        contactUsByWebChatPage.ID = this.GetNextID();
        contactUsByWebChatPage.PageName = "ContactUsByWebChatPage";
        contactUsByWebChatPage.PageTitle = this.CaptionConstants.LocationSpecificContactUsByWebChat;
        locationPages.push(contactUsByWebChatPage);

        var contactUsByPhonePage = new SuperPageModel()
        contactUsByPhonePage.ID = this.GetNextID();
        contactUsByPhonePage.PageName = "ContactUsByPhonePage";
        contactUsByPhonePage.PageTitle = this.CaptionConstants.LocationSpecificContactUsByPhone;
        locationPages.push(contactUsByPhonePage);

        var contactUsByPostPage = new SuperPageModel()
        contactUsByPostPage.ID = this.GetNextID();
        contactUsByPostPage.PageName = "ContactUsByPostPage";
        contactUsByPostPage.PageTitle = this.CaptionConstants.LocationSpecificContactUsByPost;
        locationPages.push(contactUsByPostPage);

        var lawPage = new SuperPageModel()
        lawPage.ID = this.GetNextID();
        lawPage.PageName = "LegalPage";
        lawPage.PageTitle = this.CaptionConstants.LocationSpecificLaws;
        locationPages.push(lawPage);

        var privacyPage = new SuperPageModel()
        privacyPage.ID = this.GetNextID();
        privacyPage.PageName = "PrivacyPage";
        privacyPage.PageTitle = this.CaptionConstants.LocationSpecificPrivacy;
        locationPages.push(privacyPage);

        var dataProtectionPage = new SuperPageModel()
        dataProtectionPage.ID = this.GetNextID();
        dataProtectionPage.PageName = "DataProtectionPage";
        dataProtectionPage.PageTitle = this.CaptionConstants.LocationSpecificDataProtection;
        locationPages.push(dataProtectionPage);

        var accreditationsPage = new SuperPageModel()
        accreditationsPage.ID = this.GetNextID();
        accreditationsPage.PageName = "AccreditationsPage";
        accreditationsPage.PageTitle = this.CaptionConstants.LocationSpecificAccreditations;
        locationPages.push(accreditationsPage);

        var licencesPage = new SuperPageModel()
        licencesPage.ID = this.GetNextID();
        licencesPage.PageName = "LicencesPage";
        licencesPage.PageTitle = this.CaptionConstants.LocationSpecificLicences;
        locationPages.push(licencesPage);
        return locationPages;
    }
}

export var PagesMock = new PageModelMockDataBuilder().BuildMocks();
