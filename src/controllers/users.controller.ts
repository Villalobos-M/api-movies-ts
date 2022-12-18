import { Request, Response } from "express";
import {getAllService, getByIdService, updateService, deleteService
} from "../services/user.service";
import { handleHttp } from "../utils/error.handle";

const getUser = async (req: Request, res: Response) => {
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
        message:  "NOT FOUND" 
      })
    }
  } catch (e) {
    handleHttp(res, "ERROR_GET_USER");
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const response = await getAllService();

    res.status(200).json({
        status: 'success',
        data:  response 
      });

  } catch (e) {
    handleHttp(res, "ERROR_GET_ITEMS", e);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateService(id, req.body);

    res.status(200).json({
      status: 'success',
      message:  'an user was updated' 
    });
  
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_USER", e);
  }
};

const deleteUser = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    await deleteService(id);

    res.status(200).json({
      status: 'success',
      message:  'an user was deleted' 
    });

  } catch (e) {
    handleHttp(res, "ERROR_DELETE_USER");
  }
};

export { getUser, getUsers, deleteUser, updateUser };