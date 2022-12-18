import { Schema, model } from "mongoose";
import { IActor } from "../interfaces/actor.interface";

const ActorSchema = new Schema<IActor>(
  {
    name: {
      required: true,
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    status: {
      type: String,
      default: "active"
   },
    oscarsPrizes: {
      type : Number
   },
    genre: {
      type : String
   },
    image: {
      type : String
   },
    movies: [
      {type: Schema.Types.ObjectId, ref:'movies'}
   ]
  }, 
  {
    versionKey: false,
    timestamps: true,
  }
);

const ActorModel = model("actors", ActorSchema);
export default ActorModel;