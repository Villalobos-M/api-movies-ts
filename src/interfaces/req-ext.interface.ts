import { JwtPayload } from "jsonwebtoken";
 import { Request } from "express";
export interface RequestExt extends Request {
  user?: JwtPayload | { id: string } 
}
// declare global {
//   namespace Express{
//     interface Request{
//       user?:{id: string}
//     }
//   }
// }

// import { Request } from "express"
// export interface IGetUserAuthInfoRequest extends Request {
//   user?: string // or any other type
// }