import fs from "fs"
import path from "path"
import pdfParse from "pdf-parse"

interface BillData {
  monthRef: string
  dueDate: string
  totalValue: number
  fileName: string
  consumptionEE: number
  consumptionSCEE: number
  consumptionTotal: number
  compensatoryGDI: number
  compensatoryValueGDI: number
  publicContribution: number
  totalBeforeRefund: number
  consumer: number
  consumerName: string
}

const extractDataFromPDF = async (pdfPath: string): Promise<BillData> => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath)
    const data = await pdfParse(dataBuffer)
    const text = data.text
    // Captura os dados principais
    const lineMatch = text.match(
      /Referente a\s+Vencimento\s+Valor a pagar \(R\$\)[\s\S]*?(\w+\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+([\d,.]+)/
    )
    const monthRef = lineMatch ? lineMatch[1] : "Não encontrado"
    const dueDate = lineMatch ? lineMatch[2] : "Não encontrado"
    const totalValue = lineMatch
      ? parseFloat(lineMatch[3].replace(",", "."))
      : NaN

    // Captura as quantidades de energia elétrica e SCEE
    const consumptionMatch = text.match(
      /Energia Elétrica\s*kWh\s+(\d{1,3}(?:\.\d{3})*)/
    )
    const consumptionSCEEMatch = text.match(
      /Energia SCEE s\/ ICMS\s*kWh\s+(\d{1,3}(?:\.\d{3})*)/
    )

    const compensatoryGDIMatch = text.match(
      /Energia compensada GD IkWh\s+(\d{1,3}(?:\.\d{3})*)/
    )

    const compensatoryValueGDIMatch = text.match(
      /Energia compensada GD IkWh\s*\d{1,3}(?:\.\d{3})*\s+\d{1,3}(?:,\d+)*\s+(-?\d{1,3}(?:\.\d{3})*,\d{2})/
    )

    const consumptionEE = consumptionMatch
      ? parseFloat(consumptionMatch[1].replace(".", "").replace(",", "."))
      : 0
    const consumptionSCEE = consumptionSCEEMatch
      ? parseFloat(consumptionSCEEMatch[1].replace(".", "").replace(",", "."))
      : 0

    const compensatoryGDI = compensatoryGDIMatch
      ? parseFloat(compensatoryGDIMatch[1].replace(".", "").replace(",", "."))
      : 0
    const compensatoryValueGDI = compensatoryValueGDIMatch
      ? parseFloat(
          compensatoryValueGDIMatch[1].replace(".", "").replace(",", ".")
        )
      : 0
    const consumptionTotal = consumptionEE + consumptionSCEE

    // Captura o valor de Contrib Ilum Publica Municipal
    const publicContributionMatch = text.match(
      /Contrib Ilum Publica Municipal\s+([\d,.]+)/
    )
    const publicContribution = publicContributionMatch
      ? parseFloat(publicContributionMatch[1].replace(",", "."))
      : NaN

    // Captura o valor total antes do Ressarcimento de Danos
    const totalBeforeRefund = totalValue - compensatoryValueGDI

    // Captura o número do cliente
    const consumerMatch = text.match(/Nº DA INSTALAÇÃO\s+(\d{4,})/)
    const consumer = consumerMatch ? parseFloat(consumerMatch[1]) : 0

    const barcodePattern =
      /\d{11,}-\d{1,}[\s\n]+(?:ATENÇÃO:)?[\s\n]*(?:DÉBITO AUTOMÁTICO)?[\s\n]*([A-Z\s]+[A-Z0-9]+)/i
    const consumerNameMatch = text.match(barcodePattern)

    // Se o nome for encontrado, removemos espaços desnecessários
    const consumerName = consumerNameMatch
      ? consumerNameMatch[1].trim()
      : "Não encontrado"

    return {
      monthRef,
      dueDate,
      totalValue,
      fileName: path.basename(pdfPath),
      consumptionEE,
      consumptionSCEE,
      consumptionTotal,
      compensatoryValueGDI,
      compensatoryGDI,
      publicContribution,
      totalBeforeRefund,
      consumer,
      consumerName,
    }
  } catch (error) {
    console.error(`Erro ao processar o PDF ${pdfPath}:`, error)
    throw error
  }
}

export { extractDataFromPDF }
