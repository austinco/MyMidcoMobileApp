function MidcoPhoneAccess() {
    this.GetCompassDirectionInDegrees = function (compassSuccessFunction, compassErrorFunction) {
        navigator.compass.getCurrentHeading(compassSuccessFunction, compassErrorFunction);
    }
}