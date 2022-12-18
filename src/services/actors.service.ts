import { IActor } from "../interfaces/actor.interface";
import { IMovie } from "../interfaces/movie.interface";
import actorModel from "../models/actor.model";


const getAllService = async () => {
  const responseItem = await actorModel.find({}, {createdAt:0, status:0, updatedAt:0})
                                            .populate('movies', {title:1, description:1});
  return responseItem;
};

const getByIdService = async (id: string) => {
  const responseItem = await actorModel.findOne({ _id: id }, {createdAt:0, status:0, updatedAt:0})
                                          .populate('movies', {title:1, description:1});
  return responseItem;
};

const insertService= async (actor: IActor, path: string) => {
  const {name, country, age, oscarsPrizes, genre} = actor
  const newUser = {name, country, age, oscarsPrizes, genre, image:path}
  const responseInsert = await actorModel.create(newUser);
  return responseInsert;
};
const updateService = async (id: string, data: IMovie) => {
  const responseItem = await actorModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const deleteService = async (id: string) => {
  const responseItem = await actorModel.deleteOne({ _id: id });
  return responseItem;
};

export { getAllService, insertService, getByIdService, updateService, deleteService};