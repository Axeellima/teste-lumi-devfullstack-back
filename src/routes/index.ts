import { Express, Request, Response } from "express"
import "express-async-errors"
import handleErrorMiddleware from "../middlewares/handleError.middleware"
import billsRouter from "./bills.routes"
import consumerRouter from "./consumerUnit.routes"

const appRoutes = (app: Express) => {
  app.use("/bills", billsRouter)
  app.use("/consumer", consumerRouter)
  app.use(handleErrorMiddleware)
}

export default appRoutes
