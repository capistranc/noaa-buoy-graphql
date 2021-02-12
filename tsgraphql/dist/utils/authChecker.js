"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
// create auth checker function
const authChecker = ({ root, args, context, info }, roles) => {
    //   const { user } = context;
    //   if (roles.length === 0) {
    //     // if `@Authorized()`, check only if user exists
    //     return user !== undefined;
    //   }
    //   // there are some roles defined now
    //   if (!user) {
    //     // and if no user, restrict access
    //     return false;
    //   }
    //   if (user.roles.some((role: string) => roles.includes(role))) {
    //     // grant access if the roles overlap
    //     return true;
    //   }
    // no roles matched, restrict access
    return true;
};
exports.authChecker = authChecker;
