import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
  {
    name: {
      required: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: "active"
   },
    role: {
      type: String,
      default: "guest",
   },
    reviews: [
      {type: Schema.Types.ObjectId, ref:'reviews'}
   ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;