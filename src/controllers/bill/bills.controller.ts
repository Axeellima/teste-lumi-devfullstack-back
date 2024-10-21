import { Request, Response } from "express"
import createBillService from "../../services/bill/createBill.service"
import { billsRepository } from "../../utils/repositores"
import fs from "fs"
import path from "path"
import { IRequestPostBill } from "../../interfaces/bill"
import { AppError } from "../../errors/appError"
import { extractDataFromPDF } from "../../utils/readBills"
import { validate } from "uuid"

const createBillController = async (req: Request, res: Response) => {
  const data = req.body as IRequestPostBill

  const createdBill = createBillService({ ...data })
  res.status(201).send(createdBill)
  return
}

const downloadBillPDFController = async (req: Request, res: Response) => {
  const { id } = req.params

  let isValid = validate(id)
  if (!isValid) {
    throw new AppError("O ID da Fatura é inválido", 400)
  }
  if (!id) {
    throw new AppError("O ID da Fatura é obrigatório", 400)
  }
  const bill = await billsRepository.findOne({ where: { id: id } })

  if (!bill) {
    throw new AppError("Fatura não encontrada", 404)
  }

  const filePath = path.join(__dirname, "../../template/bills", bill.fileName)
  if (!fs.existsSync(filePath)) {
    throw new AppError("Arquivo PDF não encontrado", 404)
  }
  res.download(filePath, bill.fileName)
  return
}

const listBillsController = async (req: Request, res: Response) => {
  const bills = await billsRepository.find({
    relations: ["consumer"],
  })

  res.json(bills)
  return
}

const extractAndCreateBillsController = async (req: Request, res: Response) => {
  const billsDirectory = "./src/template/bills"

  if (!fs.existsSync(billsDirectory)) {
    throw new AppError("Diretório de PDFs não encontrado", 404)
  }

  const files = fs
    .readdirSync(billsDirectory)
    .filter((file) => file.endsWith(".pdf"))

  if (files.length === 0) {
    throw new AppError("Nenhum arquivo PDF encontrado no diretório", 404)
  }

  for (const file of files) {
    const filePath = path.join(billsDirectory, file)

    try {
      // Chama sua função de extração de PDF
      const extractedData = await extractDataFromPDF(filePath) // Supondo que você tenha uma função para isso

      // Cria a Bill usando os dados extraídos

      let month = parseInt(extractedData.dueDate.split("/")[1])
      let year = parseInt(extractedData.dueDate.split("/")[2])
      const billData: IRequestPostBill = {
        consumer: extractedData.consumer,
        referenceMonth: month ? month : 1,
        referenceYear: year ? year : 1970,
        dueDate: new Date(extractedData.dueDate),
        modality: "Alguma modalidade",
        fileName: extractedData.fileName,
        consumptionEE: extractedData.consumptionEE,
        consumptionSCEE: extractedData.consumptionSCEE,
        compensatoryGDI: extractedData.compensatoryGDI,
        consumptionTotal: extractedData.consumptionTotal,
        compensatoryValueGDI: extractedData.compensatoryValueGDI,
        publicContribuition: extractedData.publicContribution,
        value: extractedData.totalValue,
        valueWithoutCompensatoryValue: extractedData.totalBeforeRefund,
        consumerName: extractedData.consumerName,
      }

      // Cria a Bill usando os dados extraídos
      await createBillService(billData)
    } catch (error) {
      throw new AppError(`Erro ao processar o arquivo ${filePath}`, 500)
    }
  }

  res.status(200).json({ message: "Todas as bills cadastradas com sucesso." })
  return
}

const getMonthlyFinancialResults = async (req: Request, res: Response) => {
  const monthlyFinancialResults = await billsRepository
    .createQueryBuilder("bill")
    .select("bill.referenceMonth", "month")
    .addSelect(
      "SUM(bill.valueWithoutCompensatoryValue)",
      "totalValueBillsWithoutGDR"
    )
    .addSelect("SUM(bill.compensatoryGDI)", "totalEconomyGDR")
    .addSelect("SUM(bill.consumptionTotal)", "consumptionTotal")
    .addSelect("SUM(bill.value)", "totalValueBills")
    .groupBy("bill.referenceMonth")
    .orderBy("bill.referenceMonth", "ASC")
    .getRawMany()

  const formattedResults = monthlyFinancialResults.map((result) => ({
    month: result.month,
    totalValueBills: parseFloat(result.totalValueBills) || 0,
    totalValueBillsWithoutGDR:
      parseFloat(result.totalValueBillsWithoutGDR) || 0,
    totalEconomyGDRConsume: result.totalEconomyGDR || 0,
    totalEEConsume: parseFloat(result.consumptionTotal) || 0,
  }))

  res.send(formattedResults)
  return
}

export {
  createBillController,
  listBillsController,
  extractAndCreateBillsController,
  downloadBillPDFController,
  getMonthlyFinancialResults,
}
