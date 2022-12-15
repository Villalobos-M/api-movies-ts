import { Request, Response } from "express";
import { Movie } from "../interfaces/movie.interface";
import {RequestExt} from '../interfaces/req-ext.interface';
import {getAllService, getByIdService, insertService, updateService, deleteService, assignActorService, deleteActorService
} from "../services/movies.service";
import { handleHttp } from "../utils/error.handle";


const getMovie = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const response = await getByIdService(id);
     if (response) {
      res.status(200).json({
        status: 'success',
        data:  response 
      });
    }else{
      res.status(404).json({
        status: 'error',
        message:  "movie not found" 
      })
    }
  } catch (e) {
    handleHttp(res, "ERROR_GET_MOVIE");
  }
};
const getMovies = async (req: RequestExt, res: Response) => {
  try {
    const response = await getAllService()
    
    res.status(200).json({
      status: 'success',
      data: response
    })
  } catch (e) {
    handleHttp(res, "ERROR_GET_MOVIES", e);
  }
};
const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateService(id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'an movie was updated'
    })
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_MOVIE", e);
  }
};
const postMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = req.body
    
    const responseUser : Movie = await insertService(newMovie, `${req.file?.path}`);
    res.status(201).json({
      status: 'success',
        data:  responseUser 
      });
  } catch (e) {
    handleHttp(res, "ERROR_POST_USER", e);
   
  }
};

const deleteMovie = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    await deleteService(id);
    
    res.status(200).json({
        status: 'success',
        message:  'movie deleted' 
      });
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_MOVIE");
  }
};

const assignActor = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  const { actorId } = req.body;
  await assignActorService(movieId, actorId)
  res.status(201).json({
        status: 'success',
        message:  'an actor was added' 
      });
}
const deleteActor = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { actorId } = req.body;
    await deleteActorService(movieId, actorId);

    res.status(200).json({
        status: 'success',
        message:  'actor deleted' 
      });
    
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_ACTOR");
  }
};



export { getMovie, getMovies, postMovie, deleteMovie, updateMovie, assignActor, deleteActor };