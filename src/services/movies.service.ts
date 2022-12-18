import { IMovie } from "../interfaces/movie.interface";
import ActorModel from "../models/actor.model";
import movieModel from "../models/movie.model";


const getAllService = async () => {
  const responseItem = await movieModel.find({}, {status:0, createdAt:0, updatedAt:0})
                                                .populate('reviews', {movieId:0, status:0})
                                                .populate('actorsId',{name:1, genre:1})
  return responseItem;
};

const getByIdService = async (id: string) => {
  const responseItem = await movieModel.findOne({ _id: id });
  return responseItem;
};

const insertService= async (Movie: IMovie, path: string) => {
  const {title, description, duration, top, genre, actorsId} = Movie
  const newMovie = {title, description, duration, top, genre, actorsId, image: path}
  const responseInsert = await movieModel.create(newMovie);
  return responseInsert;
};
// subir img a actors, documentar el swagger de actors, notion de swagger y multer

const updateService = async (id: string, data: IMovie) => {
  const responseItem = await movieModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseItem;
};

const assignActorService = async (idMovie: string, actorId: string) => {
  const movieUpdate = await movieModel.findByIdAndUpdate(
    idMovie,
    {
      $push: { actorsId: actorId },
    },
    { useFindAndModify: false }
  );
  await ActorModel.findByIdAndUpdate(
    actorId,
    {
      $push: { movies: idMovie },
    },
    { useFindAndModify: false }
  );
  return movieUpdate;
};

const deleteActorService = async (idMovie: string, actorId: string) => {
  const deleteActor = await movieModel.findByIdAndUpdate(
      idMovie,
      {
        $pull: { actorsId: actorId },
      },
      { useFindAndModify: false }
    );
    await ActorModel.findByIdAndUpdate(
      actorId,
      {
        $pull: { movies: idMovie },
      },
      { useFindAndModify: false }
    );
    return deleteActor
};

const deleteService = async (id: string) => {
  const responseItem = await movieModel.deleteOne({ _id: id });
  return responseItem;
};

export { getAllService, insertService, getByIdService, updateService, deleteService, assignActorService, deleteActorService};