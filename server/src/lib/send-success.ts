import { Response } from "express";

export const success = (res:Response, data :any = null, message = "OK", status = 200) => {
  res.status(status).json({
    success: true,
    data,
    message
  });
};