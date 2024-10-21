import { Router } from "express"
import {
  createBillController,
  downloadBillPDFController,
  extractAndCreateBillsController,
  getMonthlyFinancialResults,
  listBillsController,
} from "../controllers/bill/bills.controller"

const billsRouter = Router()

billsRouter.post("/", createBillController)
billsRouter.get("/", listBillsController)
billsRouter.get("/extract", extractAndCreateBillsController)
billsRouter.get("/download/:id", downloadBillPDFController)
billsRouter.get("/financial", getMonthlyFinancialResults)

export default billsRouter
