import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.service";

const registerCtrl = async (req: Request, res: Response) => {
  const {email} = req.body
  if (email) {
    
  }
  await registerNewUser(req.body);
  res.status(403).json({
        status: 'success',
        message:  'registro exitoso' 
      })
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  if (responseUser === "PASSWORD_INCORRECT") {
    res.status(403).json({
        status: 'success',
        message:  'credenciales incorrectas' 
      })
  } else {
    res.status(200).json({
        status: 'success',
        data:  responseUser 
      })
  }
};

export { registerCtrl, loginCtrl };