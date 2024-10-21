import { Router } from "express"

import { getConsumerUnitsWithBillsController } from "../controllers/consumerUnit/consumerUnit.controller"

const consumerRouter = Router()

consumerRouter.get("/", getConsumerUnitsWithBillsController)

export default consumerRouter
