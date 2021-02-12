import { User } from "./user.interface";
import { Request } from "request";

export interface Context {
  user?: User;
}

export interface IRequest {
  req: Request;
}
