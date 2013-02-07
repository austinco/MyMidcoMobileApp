function MyMidco() {
    this.AccountNumbers = null;
    this.ActiveAccountNumber = null;
    this.ActiveAccountInformation = null;
    this.LoginKey = null;

    this.IsActive = true;
    this.timePaused = 0;
    this.maxSecondsPausedBeforeLoggingOut = 30;
    this.maxActiveSecondsPausedBeforeLoggingOut = 1200;

    this.Login = function (username, password) {
        if (username == "" || password == "") {
            midcoPage.MarkLoginFieldsAsRequired();
        } else {
            midcoPage.SetLoginButtonInactive();
            midcoPage.SetLoginMessage('');
            midcoAjax.RunLoginMethod(username, password);
        }
    };

    this.SetInformationToActiveAccount = function (theAccount) {
        MidcoDevice_onResume();
        this.ActiveAccountInformation = theAccount;
        midcoPage.SetCustomerName(this.ActiveAccountInformation.AccountName);
        midcoPage.SetAddress(this.ActiveAccountInformation.ServiceAddressLine1, this.ActiveAccountInformation.ServiceAddressLine2);
        midcoPage.SetBalance(this.ActiveAccountInformation.CurrentBalance);
        midcoPage.RunInitialLoggedInSequence();
    }

    this.ResetModem = function () {
        midcoAjax.ResetModem(this.ActiveAccountNumber, this.LoginKey);
    }
    this.ResetModemError = function () {

    }
    this.ResetModemSuccess = function () {

    }

    this.ParseLogin = function (loginResult) {
        midcoPage.SetLoginButtonActive();
        MidcoDevice_onResume();
        // See if the login is successful
        if (loginResult.SuccessfulLogin) {
            this.AccountNumbers = loginResult.AccountNumbers;
            this.ActiveAccountNumber = loginResult.AccountNumbers[0];
            this.ActiveAccountInformation = loginResult.DefaultAccountInformation;
            this.SetInformationToActiveAccount(this.ActiveAccountInformation);
            this.LoginKey = loginResult.LoginKey;

            midcoPage.HideLoginForm();
            midcoPage.SetAccountListWithValues(this.AccountNumbers);
            midcoPage.SetTodaysDateInPage();

            midcoPage.OpenTab(midcoPage.Tab1ID);
        } else {
            midcoPage.SetLoginMessage('Invalid Login.');
        }
    }

    this.PaymentTabToggled = function () {
        if (midcoPage.IsTabOpen(midcoPage.Tab3ID) == true) {

            if (this.pastPaymentsViewModel == null) {
                midcoAjax.GetPaymentInformation(this.ActiveAccountNumber, this.LoginKey);
            }
        }
    }

    this.ServicesTabToggled = function () {
        if (midcoPage.IsTabOpen(midcoPage.Tab2ID) == true) {

            if (this.pastPaymentsViewModel == null) {
                midcoAjax.GetServicesInformation(this.ActiveAccountNumber, this.LoginKey);
            }
        }
    };

    this.SetServicesSection = function (ajaxResult) {
        if (ajaxResult.DataInfo != null) {

            midcoPage.SetDataUsageGraphic(ajaxResult.DataInfo.DataUsageGraphicURL);

            if (ajaxResult.DataInfo.CanResetModem) {
                midcoPage.ShowModemResetButton();
            } else {
                midcoPage.HideModemResetButton();
            }

            midcoPage.ShowServicesSection();
            midcoPage.HideServicesErrorSection();
            midcoPage.HideServicesLoadingSection();
        }
        else {

        }
        if (ajaxResult.CableInfo != null) {

            midcoPage.ClearTvAnywhereStations();

            for (var i = 0; i < ajaxResult.CableInfo.TvAnywhereStations.length; i++) {
                midcoPage.AddTvAnywhereStation(ajaxResult.CableInfo.TvAnywhereStations[i]);
            }

        }
        else {

        }

    }

    this.ServicesInformationError = function (errorReason) {
        midcoPage.SetServicesErrorMessage(errorReason);
        midcoPage.ShowServicesErrorSection();
        midcoPage.HideServicesSection();
        midcoPage.HideServicesLoadingSection();
    };

    this.LoginError = function (errorObject) {
        midcoPage.SetLoginButtonActive();
        midcoPage.SetLoginMessage(errorObject.statusText);
    }

    this.ChangeActiveAccount = function (newAccountNumber) {
        midcoAjax.GetAccountInformation(newAccountNumber, this.LoginKey);
    }

    this.PastPayments = null;
    this.pastPaymentsViewModel = null;

    this.SetPaymentSection = function (ajaxResult) {
        this.PastPayments = ajaxResult.PastPayments;

        midcoPage.SetPaymentsListWithValues(ajaxResult.PaymentAccounts);

        this.pastPaymentsViewModel = new PastPaymentsViewModel();

        var pastPaymentsCount = this.PastPayments.length;
        if (pastPaymentsCount > 0) {
            ko.applyBindings(this.pastPaymentsViewModel);
        }
        
        midcoPage.ShowPaymentsSection();
        midcoPage.HidePaymentsErrorSection();
        midcoPage.HidePaymentsLoadingSection();
    }

    this.PaymentInformationError = function (errorReason) {
        midcoPage.SetPaymentsErrorMessage(errorReason);
        midcoPage.ShowPaymentsErrorSection();
        midcoPage.HidePaymentsSection();
        midcoPage.HidePaymentsLoadingSection();
    };

    function PastPaymentsViewModel() {
        var self = this;
        
        self.pastPayments = ko.observableArray(midco.PastPayments);
        //self.ResetPastPayments = function () { self.pastPayments(null); };
    };

    this.CheckActivityState = function(){
        this.timePaused++;
        
        if ((this.IsActive == false && this.timePaused > this.maxSecondsPausedBeforeLoggingOut) ||
            (this.IsActive == true && this.timePaused > this.maxActiveSecondsPausedBeforeLoggingOut)) {
            this.timePaused = 0;
            midcoPage.HideMainContent();
            midcoPage.ShowLoginForm();
            midcoPage.ClearPassword();
            midcoPage.ClearAccountList();
            this.AccountNumbers = null;
            this.ActiveAccountNumber = null;
            this.ActiveAccountInformation = null;
        }
    }
}