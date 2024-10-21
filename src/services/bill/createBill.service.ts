import { Request, Response } from "express"
import {
  billsRepository,
  consumerUnitsRepository,
} from "../../utils/repositores"
import { IRequestPostBill } from "../../interfaces/bill"

const createBillService = async ({
  consumer, // Pode ser um número ou objeto de consumidor
  referenceMonth,
  referenceYear,
  dueDate,
  modality,
  distributor,
  consumptionEE,
  consumptionSCEE,
  compensatoryValueGDI,
  publicContribuition,
  compensatoryGDI,
  consumptionTotal,
  fileName,
  value,
  valueWithoutCompensatoryValue,
  consumerName,
}: IRequestPostBill) => {
  let consumerUnit
  consumerUnit = await consumerUnitsRepository.findOne({
    where: { number: consumer },
  })

  // Se o consumidor não existir, cria um novo
  if (!consumerUnit) {
    consumerUnit = consumerUnitsRepository.create({
      number: consumer,
      name: consumerName,
      distributor: distributor ? distributor : "Não encontrado",
    })
    await consumerUnitsRepository.save(consumerUnit)
  }

  const existingBill = await billsRepository.findOne({
    where: { fileName: fileName },
  })

  // Se a fatura já existe, ignorar e retornar uma mensagem
  if (existingBill) {
    return
  }

  const newBill = billsRepository.create({
    referenceMonth: referenceMonth - 2,
    referenceYear,
    distributor,
    dueDate,
    consumptionEE,
    consumptionSCEE,
    fileName,
    compensatoryValueGDI,
    compensatoryGDI,
    consumptionTotal,
    consumer: consumerUnit,
    publicContribuition,
    valueWithoutCompensatoryValue,
    value,
    modality,
  })

  await billsRepository.save(newBill)
  return newBill
}

export default createBillService
