class Metric {
    constructor(value, unit) {
        this.value = value;
        this.unit = unit;
    }
    inMetric() { }
    inImperial() { }
}
var TemperatureUnit;
(function (TemperatureUnit) {
    TemperatureUnit[TemperatureUnit["C"] = 0] = "C";
    TemperatureUnit[TemperatureUnit["F"] = 1] = "F";
})(TemperatureUnit || (TemperatureUnit = {}));
