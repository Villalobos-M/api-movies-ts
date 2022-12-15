import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../services/auth.service";

const registerCtrl = async (req: Request, res: Response) => {
  const {email} = req.body
  if (email) {
    
  }
  await registerNewUser(req.body);
  res.status(201).json({
        status: 'success',
        message:  'successful sign in' 
      })
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  if (responseUser === "PASSWORD_INCORRECT") {
    res.status(403).json({
        status: 'error',
        message:  'credentials are invalid' 
      })
  } else {
    res.status(200).json({
        status: 'success',
        token:  responseUser 
      })
  }
  if(responseUser === "NOT_FOUND_USER"){
    res.status(404).json({
        status: 'error',
        message:  'email not registered' 
      })
  }
};

export { registerCtrl, loginCtrl };