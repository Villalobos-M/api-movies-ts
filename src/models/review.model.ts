import { Schema, model } from "mongoose";
import { Review } from "../interfaces/review.interface";

const ReviewSchema = new Schema<Review>(
  {
    title: {
      required: true,
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
      default: 5
    },
    status: {
      type: String,
      default: "active"
   },
    userId: 
      {type: Schema.Types.ObjectId, ref:'users'}
   ,
    movieId: 
      {type: Schema.Types.ObjectId, ref:'movies'}
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ReviewModel = model("reviews", ReviewSchema);
export default ReviewModel;