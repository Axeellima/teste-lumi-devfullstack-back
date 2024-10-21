import { Request, Response } from "express"
import getConsumerUnitsWithBillsService from "../../services/consumerUnit/getConsumerUnitsWithBills.service"
import { AppError } from "../../errors/appError"

const consumerUnitCreateController = async (req: Request, res: Response) => {
  res.status(201).send()
  return
}

const getConsumerUnitsWithBillsController = async (
  req: Request,
  res: Response
) => {
  const { year, clientNumber } = req.query
  let yearSearchNumber = Number(year)
  let clientSearchNumber = Number(clientNumber)

  if (!year) {
    throw new AppError("Ano é obrigatório", 400)
  }

  if (
    isNaN(yearSearchNumber) ||
    (clientSearchNumber && isNaN(clientSearchNumber))
  ) {
    throw new AppError("Dados de pesquisa inválidos", 400)
  }

  let allConsumerUnitsWithBills = await getConsumerUnitsWithBillsService({
    year: yearSearchNumber,
    clientNumber: clientSearchNumber,
  })
  res.status(200).send(allConsumerUnitsWithBills)
  return
}

export { getConsumerUnitsWithBillsController }
