function MidcoAjax() {

    //this.appWebServiceURL = "http://localhost:29370/MyMidcoWebService.asmx";
    this.appWebServiceURL = "http://devportal.midco.net/MyMidcoAppWebService/MyMidcoWebService.asmx";

    this.ajaxType = "POST";
    this.ajaxDataType = "json";
    this.postContentType = "application/json; charset=utf-8";
    this.defaultTimeout = 5000;
    this.defaultAsync = false;
    this.defaultCache = false;

    this.RunLoginMethod = function (username, password) {

        var dataToPost = "{ 'username':'" + username + "','password':'" + password + "' }";

        $.ajax({
            type: this.ajaxType,
            contentType: this.postContentType,
            url: this.appWebServiceURL + "/TryLogin",
            data: dataToPost,
            dataType: this.ajaxDataType,
            async: this.defaultAsync,
            timeout: this.defaultTimeout,
            cache: this.defaultCache,
            error: function (msg) {
                midco.LoginError(msg);
            },
            success: function (msg) {
                var result = eval(msg.d);
                midco.ParseLogin(result);
            }
        });
    }

    this.GetAccountInformation = function (accountNumber, loginKey) {

        var dataToPost = "{ 'accountNumber':'" + accountNumber + "','loginKey':'" + loginKey + "' }";

        $.ajax({
            type: this.ajaxType,
            contentType: this.postContentType,
            url: this.appWebServiceURL + "/GetAccountInformation",
            data: dataToPost,
            dataType: this.ajaxDataType,
            async: this.defaultAsync,
            timeout: this.defaultTimeout,
            cache: this.defaultCache,
            error: function (msg) {
                alert(msg.statusText);
            },
            success: function (msg) {
                var result = eval(msg.d);
                midco.SetInformationToActiveAccount(result);
            }
        });
    }

    this.GetPaymentInformation = function (accountNumber, loginKey) {

        var dataToPost = "{ 'accountNumber':'" + accountNumber + "','loginKey':'" + loginKey + "' }";

        $.ajax({
            type: this.ajaxType,
            contentType: this.postContentType,
            url: this.appWebServiceURL + "/GetPaymentInformation",
            data: dataToPost,
            dataType: this.ajaxDataType,
            async: this.defaultAsync,
            timeout: this.defaultTimeout,
            cache: this.defaultCache,
            error: function (msg) {
                midco.PaymentInformationError(msg.statusText);
            },
            success: function (msg) {
                var result = eval(msg.d);
                midco.SetPaymentSection(result);
            }
        });
    }

    this.GetServicesInformation = function (accountNumber, loginKey) {

        var dataToPost = "{ 'accountNumber':'" + accountNumber + "','loginKey':'" + loginKey + "' }";

        $.ajax({
            type: this.ajaxType,
            contentType: this.postContentType,
            url: this.appWebServiceURL + "/GetServicesInformation",
            data: dataToPost,
            dataType: this.ajaxDataType,
            async: this.defaultAsync,
            timeout: this.defaultTimeout,
            cache: this.defaultCache,
            error: function (msg) {
                midco.ServicesInformationError(msg.statusText);
            },
            success: function (msg) {
                var result = eval(msg.d);
                midco.SetServicesSection(result);
            }
        });
    }

    this.ResetModem = function (accountNumber, loginKey) {

        var dataToPost = "{ 'accountNumber':'" + accountNumber + "','loginKey':'" + loginKey + "' }";

        $.ajax({
            type: this.ajaxType,
            contentType: this.postContentType,
            url: this.appWebServiceURL + "/ResetModem",
            data: dataToPost,
            dataType: this.ajaxDataType,
            async: this.defaultAsync,
            timeout: this.defaultTimeout,
            cache: this.defaultCache,
            error: function (msg) {
                midco.ResetModemError(msg.statusText);
            },
            success: function (msg) {
                var result = eval(msg.d);
                midco.ResetModemSuccess(result);
            }
        });
    }
}