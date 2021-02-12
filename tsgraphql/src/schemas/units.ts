abstract class Metric {
  private value: number;
  private unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }

  inMetric() {}
  inImperial() {}
}

interface Temperature {
  unit: TemperatureUnit;
  value: number;
}

enum TemperatureUnit {
  "C",
  "F",
}

interface metric {
  unit: string;
  value: number;
}
