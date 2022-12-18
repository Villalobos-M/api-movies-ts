import { IUser } from "../interfaces/user.interface";
import userModel from "../models/user.model";

//.populate('reviews', {title: 1, movieId: 1})
const getAllService = async () => {
  const responseItem = await userModel.find({}, {password :0, role: 0, status:0}).
  populate({
    path: 'reviews', 
    select: ["movieId", "title"],

    populate: { path: 'movieId', 
                select: ["title", "image"],
    }
  })
  return responseItem;
};

const getByIdService = async (id: string) => {
  const responseItem = await userModel.findOne({ _id: id });
  return responseItem;
};

const updateService = async (id: string, data: IUser) => {
  const responseItem = await userModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const deleteService = async (id: string) => {
  const responseItem = await userModel.deleteOne({ _id: id });
  return responseItem;
};

export { getAllService, getByIdService, updateService, deleteService};