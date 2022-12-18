import { ObjectId } from "mongoose";

export interface IReview {
  title: string;
  text: string;
  rating: number;
  userId: ObjectId;
  status: string;
  movieId: ObjectId;
}