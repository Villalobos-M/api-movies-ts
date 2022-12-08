import { ObjectId } from "mongoose";

export interface Review {
  title: string;
  text: string;
  rating: number;
  userId: ObjectId;
  status: string;
  movieId: ObjectId;
}