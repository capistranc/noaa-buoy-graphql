"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuoyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const spectralData = "https://www.ndbc.noaa.gov/data/realtime2/46221.spec";
const standardData = "https://www.ndbc.noaa.gov/data/realtime2/46221.txt";
const latest = "http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt";
let metric = class metric {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], metric.prototype, "unit", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], metric.prototype, "value", void 0);
metric = __decorate([
    type_graphql_1.ObjectType()
], metric);
let BuoyStats = class BuoyStats {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], BuoyStats.prototype, "dateTime", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "wdir", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "wspd", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "gst", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "wvht", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "dpd", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "apd", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "mwd", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "pres", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "atmp", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "wtmp", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "vis", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "ptdy", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", metric)
], BuoyStats.prototype, "tide", void 0);
BuoyStats = __decorate([
    type_graphql_1.ObjectType({ description: "Measurements from buoy" })
], BuoyStats);
let BuoyResolver = class BuoyResolver {
    latestStats() {
        return { dateTime: new Date(), wdir: { unit: "ms", value: 23 } };
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuoyResolver.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BuoyResolver.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BuoyResolver.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BuoyResolver.prototype, "lat", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BuoyResolver.prototype, "long", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], BuoyResolver.prototype, "latestStatsDt", void 0);
__decorate([
    type_graphql_1.Query((returns) => BuoyStats),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuoyResolver.prototype, "latestStats", null);
__decorate([
    type_graphql_1.Field((returns) => [BuoyStats]),
    __metadata("design:type", Array)
], BuoyResolver.prototype, "history", void 0);
BuoyResolver = __decorate([
    type_graphql_1.ObjectType()
], BuoyResolver);
exports.BuoyResolver = BuoyResolver;
