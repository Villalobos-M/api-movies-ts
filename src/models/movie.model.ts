import { Schema, model } from "mongoose";
import { IMovie } from "../interfaces/movie.interface";

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "active"
   },
    top: {
      type : Number,
      min: 0,
      max: 10
   },
    genre: {
      type : String
   },
    image: {
      type : String
   },
    reviews: [
      {type: Schema.Types.ObjectId, ref:'reviews'}
   ],
   actorsId: [
      {type: Schema.Types.ObjectId, ref:'actors'}
   ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const MovieModel = model("movies", MovieSchema);
export default MovieModel;