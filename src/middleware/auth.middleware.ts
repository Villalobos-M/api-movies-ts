import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { verifyToken } from "../utils/jwt.handle";
import {getByIdService} from "../services/user.service"
import userModel from '../models/user.model'

const getUserbyEmail = async (email: string) =>  await userModel.findOne({ email });
  
const validateSesion = async(req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
// isUser no es boolean, es el usuario desencriptado
    const isUser = verifyToken(`${jwt}`) as { id: string };
    const user = await getUserbyEmail(isUser.id)
    
    if (!isUser) {
      res.status(401).json({
        status: 'error',
        message:  'Unauthorized, you do not have an authorized jwt' 
       })
   next();
    } else {
      req.user = user?.id;
      next();
    }
    } catch (e) {
    console.log({ e });
    res.status(400);
    res.send("SESSION_NO_VALIDAD");
  }
};

const protectAdmin = async (req: RequestExt, res: Response, next: NextFunction) => {
  const user = await getByIdService(`${req?.user}`)
  
  if (!user || user.role !== 'admin') {
    res.send('No tienes permisos para ejecutar esta accion') 
  }else{
    next();
  }
};

export { validateSesion, protectAdmin };