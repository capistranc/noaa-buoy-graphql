import { AuthChecker } from "type-graphql";

import { Context } from "./types";
// create auth checker function
export const authChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
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
