import { Request, Response } from "express";
import {getAllService, getByIdService, insertService, updateService, deleteService
} from "../services/review.service";
import { handleHttp } from "../utils/error.handle";
import {RequestExt} from '../interfaces/req-ext.interface';


const getReview = async (req: Request, res: Response) => {
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
        message:  "review not found" 
      })
    }
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVIEW");
  }
};

const getReviews = async (req: Request, res: Response) => {
  try {
    const response = await getAllService();
    res.status(200).json({
        status: 'success',
        data:  response 
      });
      
  } catch (e) {
    handleHttp(res, "ERROR_GET_REVIEWS", e);
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateService(id, req.body);
   
     res.status(200).json({
        status: 'success',
        message:  'review updated' 
      });

  } catch (e) {
    handleHttp(res, "ERROR_UPDATE_REVIEW", e);
  }
};

const postReview = async (req: RequestExt, res: Response) => {
  try {
    const { movieId } = req.params;
    const responseUser = await insertService(req.body, movieId, req.user);
    res.status(201).json({
        status: 'success',
        data:  responseUser 
      });
  } catch (e) {
    handleHttp(res, "ERROR_POST_REVIEW", e);
   
  }
};

const deleteReview = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    await deleteService(id);

     res.status(200).json({
        status: 'success',
        message:  'review deleted' 
      });
      
  } catch (e) {
    handleHttp(res, "ERROR_DELETE_REVIEW");
  }
};

export { getReview, getReviews, postReview, deleteReview, updateReview };