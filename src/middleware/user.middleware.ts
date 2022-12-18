import { NextFunction, Response, Request } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { IUser } from "../interfaces/user.interface";
import { getByIdService } from "../services/user.service";

const protectAccountOwner = async (req: RequestExt, res: Response, next: NextFunction) => {
   const id  = req.params.id;
   const user : IUser | null = await getByIdService(`${req.user}`)
   const idUserFind = user?._id
   if (id !== idUserFind?.valueOf()) return res.status(403).json({
                                             status: 'error',
                                             message:  'Access denied, you do not have permission to edit this profile' 
                                          })
   next();
};

export { protectAccountOwner };