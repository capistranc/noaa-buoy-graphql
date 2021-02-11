"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var apollo_server_1 = require("apollo-server");
var type_defs_1 = __importDefault(require("./type-defs"));
var resolvers_1 = __importDefault(require("./resolvers"));
var utils_1 = require("./utils");
var launch_1 = __importDefault(require("./datasources/launch"));
var user_1 = __importDefault(require("./datasources/user"));
var internalEngineDemo = require("./engine-demo");
// creates a sequelize connection once. NOT for every request
var store = utils_1.createStore();
// set up any dataSources our resolvers need
var dataSources = function () { return ({
    launchAPI: new launch_1.default(),
    userAPI: new user_1.default({ store: store }),
}); };
var jwt = require("./auth");
// the function that sets up the global context for each resolver, using the req
var context = function (_a) {
    var req = _a.req;
    return __awaiter(void 0, void 0, void 0, function () {
        var token, decodedToken, users, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = req.headers.authorization || "";
                    decodedToken = jwt.verifyToken(token);
                    if (!decodedToken)
                        return [2 /*return*/, { user: null }];
                    return [4 /*yield*/, store.users.findOrCreate({ where: { email: 'test@test.com' } })];
                case 1:
                    users = _b.sent();
                    user = users && users[0] ? users[0] : null;
                    return [2 /*return*/, { user: __assign(__assign({}, user), { token: token }) }];
            }
        });
    });
};
// Set up Apollo Server
var server = new apollo_server_1.ApolloServer({
    typeDefs: type_defs_1.default,
    resolvers: resolvers_1.default,
    dataSources: dataSources,
    context: context,
    introspection: true,
    playground: true,
    engine: __assign({ apiKey: process.env.ENGINE_API_KEY }, internalEngineDemo),
});
// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
    server.listen({ port: process.env.PORT || 4000 }).then(function (_a) {
        var url = _a.url;
        console.log("\uD83D\uDE80 app running at " + url);
    });
}
// export all the important pieces for integration/e2e tests to use
module.exports = {
    dataSources: dataSources,
    context: context,
    typeDefs: type_defs_1.default,
    resolvers: resolvers_1.default,
    ApolloServer: apollo_server_1.ApolloServer,
    LaunchAPI: launch_1.default,
    UserAPI: user_1.default,
    store: store,
    server: server,
};
