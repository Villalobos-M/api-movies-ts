import { IAuth } from "./auth.interface";

export interface IUser extends IAuth {
  _id : string
  name: string;
  status: string;
  role: string;
  reviews: object[];
}