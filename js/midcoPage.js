function MidcoPage() {
    this.HideLoginForm = function () {
        $('#loginForm').hide();
    }

    this.MarkLoginFieldsAsRequired = function () {
        $('.loginRequired').html('*');
    }

    this.LoginPassword = function () {
        return $('#tbLoginPassword').val();
    }
    this.LoginUsername = function () {
        return $('#tbLoginUsername').val();
    }

    this.ClearPassword = function () {
        return $('#tbLoginPassword').val("");
    }

    this.LoginButton = function () {
        return $('#btnLoginSubmit');
    }

    this.TestIdleState = function () {
        return $('#testIdleState');
    }

    this.TestToggleActive = function () {
        return $('#testToggleActive');
    }

    this.HidePaymentsLoadingSection = function () {
        $('#paymentsLoadingDiv').hide();
    };

    this.ShowPaymentsLoadingSection = function () {
        $('#paymentsLoadingDiv').show();
    };

    this.HidePaymentsErrorSection = function () {
        $('#paymentsError').hide();
    };

    this.ShowPaymentsErrorSection = function () {
        $('#paymentsError').show();
    };

    this.HidePaymentsSection = function () {
        $('#paymentsInformation').hide();
    };

    this.ShowPaymentsSection = function () {
        $('#paymentsInformation').show();
    };

    this.SetPaymentsErrorMessage = function (theMessage) {
        $('#paymentsErrorMessage').html(theMessage);
    };

    this.HideServicesLoadingSection = function () {
        $('#servicesLoadingDiv').hide();
    };

    this.ShowServicesLoadingSection = function () {
        $('#servicesLoadingDiv').show();
    };

    this.HideServicesErrorSection = function () {
        $('#servicesError').hide();
    };

    this.ShowServicesErrorSection = function () {
        $('#servicesError').show();
    };

    this.HideServicesSection = function () {
        $('#servicesInformation').hide();
    };

    this.ShowModemResetButton = function () {
        $('#servicesResetModemButton').show();
    }

    this.HideModemResetButton = function () {
        $('#servicesResetModemButton').hide();
    }

    this.ShowServicesSection = function () {
        $('#servicesInformation').show();
    };

    this.ResetModemButton = function () {
        return $('#servicesResetModemButton');
    };

    this.SetServicesErrorMessage = function (theMessage) {
        $('#servicesErrorMessage').html(theMessage);
    };

    this.TestIdleSeconds = function () {
        return $('#testIdleSeconds');
    }

    this.SetDataUsageGraphic = function (theUrl) {
        $('#bandwidthUsageImage').attr('src', theUrl);
    }

    this.SetLoginMessage = function (theMessage) {
        $('#loginMessage').html(theMessage);
    }

    this.RunInitialLoggedInSequence = function () {
        this.ShowMainContent();
    }

    this.ShowMainContent = function () {
        $('#mainContent').show();
    }

    this.HideMainContent = function () {
        $('#mainContent').hide();
    }

    this.ShowLoginForm = function () {
        $('#loginForm').show();
    }

    this.SetTodaysDateInPage = function () {
        var objToday = new Date(),
                weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = weekday[objToday.getDay()],
                domEnder = new Array('th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'),
                dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
                months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                curMonth = months[objToday.getMonth()],
                curYear = objToday.getFullYear(),
                curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
                curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
                curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

        var today = curMonth + " " + dayOfMonth + ", " + curYear;

        $('.dyn_todaysDate').html(today);
    }

    this.AddTvAnywhereStation = function (tvStationObject) {
        var stationDiv = document.createElement("div");
        var stationImage = document.createElement("img");
        var stationLink = document.createElement("a");
        var stationBreak = document.createElement("br");
        stationDiv.setAttribute("class", "span3");
        stationImage.setAttribute("src", tvStationObject.StationImageUrl);
        stationImage.setAttribute("alt", tvStationObject.StationName);
        stationLink.setAttribute("href", tvStationObject.StationLinkUrl);
        stationLink.setAttribute("target", "_blank");
        stationLink.innerHTML = tvStationObject.StationName;
        stationBreak.setAttribute("style", "clear:both;");

        stationDiv.appendChild(stationImage);
        stationDiv.appendChild(stationBreak);
        stationDiv.appendChild(stationLink);

        var stations = document.getElementById("tvAnywhereStations");
        stations.appendChild(stationDiv);
    };
    this.ClearTvAnywhereStations = function () {
        $('#tvAnywhereStations').empty();
    };

    this.SetCustomerName = function (theName) {
        $('#midcoCustName').html(theName);
    }

    this.SetLoginButtonText = function (theText) {
        $('#loginText').html(theText);
    }
    this.SetResetModemButtonText = function (theText) {
        $('#resetModemButtonText').html(theText);
    }
    this.SetLoginButtonActive = function () {
        this.SetLoginButtonText("Login");
        $('#btnLoginSubmit').addClass("button_Active");
        $('#btnLoginSubmit').removeClass("button_Loading");
    }
    this.SetLoginButtonInactive = function () {
        this.SetLoginButtonText("Please Wait...");
        $('#btnLoginSubmit').addClass("button_Loading");
        $('#btnLoginSubmit').removeClass("button_Active");
    }

    this.SetAddress = function (address1, address2) {
        $('#midcoCustAddress1').html(address1);
        $('#midcoCustAddress2').html(address2);
    }

    this.SetBalance = function (balance) {
        var bal = balance.toFixed(2);
        $('#midcoCustCurrentBalance').html(bal);
    }

    this.SetPaymentsListWithValues = function (paymentAccountList) {
        var mostRecentDate = null;
        var mostRecentVal = null;

        for (var theAcc = 0; theAcc < paymentAccountList.length; theAcc++) {
            var theAccNumber = paymentAccountList[theAcc];

            if (mostRecentDate == null || mostRecentDate > theAccNumber.LastUsed) {
                mostRecentDate = theAccNumber.LastUsed;
                mostRecentVal = theAccNumber.Identafier;
            }

            $('#paymentSelectPaymentAccount').append("<option value='" + theAccNumber.Identafier + "'>" + theAccNumber.Nickname + " (" + theAccNumber.Identafier + ")" + "</option>");
        }
        $('#paymentSelectPaymentAccount').val(mostRecentVal);
    };

    this.SetAccountListWithValues = function (accountNumberArray) {
        for (var theAcc = 0; theAcc < accountNumberArray.length; theAcc++) {
            var theAccNumber = accountNumberArray[theAcc];
            $('#midcoAccountList').append("<option value='" + theAccNumber + "'>" + theAccNumber + "</option>");
        }
        $('#midcoAccountList').val(accountNumberArray[0]);

        $('#midcoAccountList').change(function () {
            midco.ChangeActiveAccount($(this).val());
        });
    }

    this.IsTabOpen = function (tabIdentafier) {
        var imgIDSelector = "#img" + tabIdentafier;
        var toggleImg = $(imgIDSelector).attr("src");

        if (toggleImg == this.TabArrowClosed) {
            return false;
        }
        else {
            return true;
        }
    };

    this.TabArrowOpen = "img/h2_trigger_a.gif";
    this.TabArrowClosed = "img/h2_trigger_a-hover.gif";

    this.OpenTab = function (tabIdentafier) {        
        if (this.IsTabOpen(tabIdentafier) == false) {
            this.ToggleTab(tabIdentafier);
        }
    };

    this.CloseTab = function (tabIdentafier) {
        if (this.IsTabOpen(tabIdentafier) == true) {
            this.ToggleTab(tabIdentafier);
        }
    };

    this.ToggleTab = function (tabIdentafier) {
        var divIDSelector = "#tooglediv" + tabIdentafier;
        var imgIDSelector = "#img" + tabIdentafier;

        var toggleDiv = $(divIDSelector);
        var toggleImg = $(imgIDSelector);

        toggleDiv.slideToggle("500");
        var img = toggleImg.attr("src");
        if (img == this.TabArrowClosed) {
            img = this.TabArrowOpen;
        } else {
            img = this.TabArrowClosed;
        }

        toggleImg.attr("src", img);
    }

    this.ClearAccountList = function () {
        $('#midcoAccountList').empty();
    };

    this.TestMessage = function (msg) {
        var oldVal = $('#testMessage').html();
        oldVal += msg + "<br />";
        $('#testMessage').html(oldVal);
    }

    this.Tab1ID = "2615826";
    this.Tab2ID = "2188939";
    this.Tab3ID = "2070549";
}