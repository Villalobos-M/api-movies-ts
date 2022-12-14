import { IAuth } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, name, role }: IUser) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) return "ALREADY_USER";
  const passHash = await encrypt(password); //TODO 1234567 
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name,
    role
  });
  //TODO 123459
  return registerNewUser;
};

const loginUser = async ({ email, password }: IAuth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password; //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.email);
  return token;
};

export { registerNewUser, loginUser };