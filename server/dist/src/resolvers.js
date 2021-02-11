var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var paginateResults = require("./utils").paginateResults;
var jwt = require("./auth");
module.exports = {
    Query: {
        launches: function (_, _a, _b) {
            var _c = _a.pageSize, pageSize = _c === void 0 ? 20 : _c, after = _a.after;
            var dataSources = _b.dataSources;
            return __awaiter(_this, void 0, void 0, function () {
                var allLaunches, launches;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, dataSources.launchAPI.getAllLaunches()];
                        case 1:
                            allLaunches = _d.sent();
                            // we want these in reverse chronological order
                            allLaunches.reverse();
                            launches = paginateResults({
                                after: after,
                                pageSize: pageSize,
                                results: allLaunches,
                            });
                            return [2 /*return*/, {
                                    launches: launches,
                                    cursor: launches.length ? launches[launches.length - 1].cursor : null,
                                    // if the cursor of the end of the paginated results is the same as the
                                    // last item in _all_ results, then there are no more results after this
                                    hasMore: launches.length
                                        ? launches[launches.length - 1].cursor !==
                                            allLaunches[allLaunches.length - 1].cursor
                                        : false,
                                }];
                    }
                });
            });
        },
        launch: function (_, _a, _b) {
            var id = _a.id;
            var dataSources = _b.dataSources;
            return dataSources.launchAPI.getLaunchById({ launchId: id });
        },
        me: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                return [2 /*return*/, dataSources.userAPI.findOrCreateUser()];
            }); });
        },
    },
    Mutation: {
        bookTrips: function (_, _a, _b) {
            var launchIds = _a.launchIds;
            var dataSources = _b.dataSources;
            return __awaiter(_this, void 0, void 0, function () {
                var results, launches;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, dataSources.userAPI.bookTrips({ launchIds: launchIds })];
                        case 1:
                            results = _c.sent();
                            return [4 /*yield*/, dataSources.launchAPI.getLaunchesByIds({
                                    launchIds: launchIds,
                                })];
                        case 2:
                            launches = _c.sent();
                            return [2 /*return*/, {
                                    success: results && results.length === launchIds.length,
                                    message: results.length === launchIds.length
                                        ? "trips booked successfully"
                                        : "the following launches couldn't be booked: " + launchIds.filter(function (id) { return !results.includes(id); }),
                                    launches: launches,
                                }];
                    }
                });
            });
        },
        cancelTrip: function (_, _a, _b) {
            var launchId = _a.launchId;
            var dataSources = _b.dataSources;
            return __awaiter(_this, void 0, void 0, function () {
                var result, launch;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            result = dataSources.userAPI.cancelTrip({ launchId: launchId });
                            if (!result)
                                return [2 /*return*/, {
                                        success: false,
                                        message: "failed to cancel trip",
                                    }];
                            return [4 /*yield*/, dataSources.launchAPI.getLaunchById({ launchId: launchId })];
                        case 1:
                            launch = _c.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    message: "trip cancelled",
                                    launches: [launch],
                                }];
                    }
                });
            });
        },
        login: function (_, _a, _b) {
            var email = _a.email;
            var dataSources = _b.dataSources;
            return __awaiter(_this, void 0, void 0, function () {
                var user, _c, id, token;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, dataSources.userAPI.findOrCreateUser({ email: email })];
                        case 1:
                            user = _d.sent();
                            _c = user.dataValues, id = _c.id, token = _c.token;
                            return [2 /*return*/, {
                                    id: id.toString(),
                                    token: Buffer.from(email).toString("base64"),
                                }];
                    }
                });
            });
        },
        uploadProfileImage: function (_, _a, _b) {
            var file = _a.file;
            var dataSources = _b.dataSources;
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_c) {
                return [2 /*return*/, dataSources.userAPI.uploadProfileImage({ file: file })];
            }); });
        },
    },
    Launch: {
        isBooked: function (launch, _, _a) {
            var dataSources = _a.dataSources;
            return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                return [2 /*return*/, dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })];
            }); });
        },
    },
    Mission: {
        // make sure the default size is 'large' in case user doesn't specify
        missionPatch: function (mission, _a) {
            var _b = _a === void 0 ? { size: "LARGE" } : _a, size = _b.size;
            return size === "SMALL"
                ? mission.missionPatchSmall
                : mission.missionPatchLarge;
        },
    },
    User: {
        trips: function (_, __, _a) {
            var dataSources = _a.dataSources;
            return __awaiter(_this, void 0, void 0, function () {
                var launchIds;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, dataSources.userAPI.getLaunchIdsByUser()];
                        case 1:
                            launchIds = _b.sent();
                            if (!launchIds.length)
                                return [2 /*return*/, []];
                            // look up those launches by their ids
                            return [2 /*return*/, (dataSources.launchAPI.getLaunchesByIds({
                                    launchIds: launchIds,
                                }) || [])];
                    }
                });
            });
        },
    },
};
