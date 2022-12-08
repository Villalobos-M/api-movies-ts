import { Review } from "../interfaces/review.interface";
import movieModel from "../models/movie.model";
import reviewModel from "../models/review.model";
import UserModel from "../models/user.model";


const getAllService = async () => {
  const responseItem = await reviewModel.find({}, {status:0})
                                          .populate('userId', {name: 1, email: 1})
                                          .populate('movieId', {title: 1})
  return responseItem;
};

const getByIdService = async (id: string) => {
  const responseItem = await reviewModel.findOne({ _id: id });
  return responseItem;
};

const insertService= async (newReview: Review, movieId: String, user: any) => {
  const responseInsert = await reviewModel.create({
      title: newReview.title,
      text: newReview.text,
      rating: newReview.rating,
      movieId,
      userId: user,
   });
    await movieModel.findByIdAndUpdate(
    movieId,
    {
      $push: { reviews: responseInsert._id },
    },
    { useFindAndModify: false }
  );
  await UserModel.findByIdAndUpdate(
    user,
    {
      $push: { reviews: responseInsert._id },
    },
    { useFindAndModify: false }
  );
  return responseInsert;
};
const updateService = async (id: string, data: Review) => {
  const responseItem = await reviewModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const deleteService = async (id: string) => {
  const responseItem = await reviewModel.deleteOne({ _id: id });
  return responseItem;
};

export { getAllService, insertService, getByIdService, updateService, deleteService};