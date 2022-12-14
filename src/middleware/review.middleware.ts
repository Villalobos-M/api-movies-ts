import { NextFunction, Response, Request } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import reviewModel from "../models/review.model";


const reviewOwner = async (req: RequestExt, res: Response, next: NextFunction) => {
   const { id } = req.params;// /3
   const review = await reviewModel.findOne({ _id: id });
   
   if (review?.userId.valueOf() !== req.user) return res.status(403).json({
                                             status: 'error',
                                             message:  'Acceso denegado, No tienes permiso para editar esta reseña' 
                                          })
   next();
};

export { reviewOwner };