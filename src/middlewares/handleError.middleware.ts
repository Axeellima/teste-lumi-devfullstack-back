import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/appError"

const handleErrorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    })
    return
  }

  res.status(500).json({
    message: "Internal server error",
  })
  return
}

export default handleErrorMiddleware
