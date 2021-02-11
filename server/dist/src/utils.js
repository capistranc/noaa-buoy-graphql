var Sequelize = require("sequelize").Sequelize;
module.exports.paginateResults = function (_a) {
    var cursor = _a.after, _b = _a.pageSize, pageSize = _b === void 0 ? 20 : _b, results = _a.results, 
    // can pass in a function to calculate an item's cursor
    _c = _a.getCursor, 
    // can pass in a function to calculate an item's cursor
    getCursor = _c === void 0 ? function () { return null; } : _c;
    if (pageSize < 1)
        return [];
    if (!cursor)
        return results.slice(0, pageSize);
    var cursorIndex = results.findIndex(function (item) {
        // if an item has a `cursor` on it, use that, otherwise try to generate one
        var itemCursor = item.cursor ? item.cursor : getCursor(item);
        // if there's still not a cursor, return false by default
        return itemCursor ? cursor === itemCursor : false;
    });
    return cursorIndex >= 0
        ? cursorIndex === results.length - 1 // don't let us overflow
            ? []
            : results.slice(cursorIndex + 1, Math.min(results.length, cursorIndex + 1 + pageSize))
        : results.slice(0, pageSize);
};
module.exports.createStore = function () {
    var db = new Sequelize({
        dialect: "sqlite",
        storage: "./store.sqlite",
    });
    var users = db.define("user", {
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        email: Sequelize.STRING,
        profileImage: Sequelize.STRING,
        token: Sequelize.STRING,
    });
    var trips = db.define("trip", {
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        launchId: Sequelize.INTEGER,
        userId: Sequelize.INTEGER,
    });
    return { db: db, users: users, trips: trips };
};
