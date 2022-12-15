import { Request, Response } from "express";
import {getAllService, getByIdService, insertService, updateService, deleteService
} from "../services/actors.service";
import { handleHttp } from "../utils/error.handle";

const getActor = async (req: Request, res: Response) => {
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
        message:  "actor not found" 
      })
    }
  } catch (e) {
    handleHttp(res, "ERROR_GET_ACTOR");
  }
};

const getActors = async (req: Request, res: Response) => {
  try {
    const response = await getAllService();
    res.status(200).json({
        status: 'success',
        data:  response 
      });
  } catch (e) {
    handleHttp(res, "ERROR_GET_ACTORS", e);
  }
};

const updateActor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateService(id, req.body);
    res.status(201).json({
        status: 'success',
        message:  'actor updated' 
      });
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_USER", e);
  }
};

const postActor = async (req: Request, res: Response) => {
  const newActor = req.body
  try {
    await insertService(newActor, `${req.file?.path}`);
    res.status(200).json({
        status: 'success',
        message:  'actor created' 
      });
  } catch (e) {
    handleHttp(res, "ERROR_POST_ACTOR", e);
   
  }
};

const deleteActor = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    await deleteService(id);
    res.status(200).json({
        status: 'success',
        message:  'an actor was deleted' 
      });
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_ACTOR");
  }
};

export { getActor, getActors, postActor, deleteActor, updateActor };