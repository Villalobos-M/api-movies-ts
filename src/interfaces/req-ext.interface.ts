import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface RequestExt extends Request {
  user?: JwtPayload | string 
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1hckBnbWFpbC5jb20iLCJpYXQiOjE2NzExMzAxNzAsImV4cCI6MTY3MTEzNzM3MH0.Z6Sfl9pDWsnERk0iB7hPne8-4QOw0JlDFMqI1ZElQZo
