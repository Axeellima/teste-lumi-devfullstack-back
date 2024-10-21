interface IRequestPostBill {
  consumer: number
  referenceMonth: number
  referenceYear: number
  dueDate: Date
  modality: string
  fileName: string
  consumptionEE: number
  consumptionSCEE: number
  compensatoryGDI: number
  consumptionTotal: number
  compensatoryValueGDI: number
  publicContribuition: number
  consumerName?: string
  distributor?: string
  valueWithoutCompensatoryValue: number
  value: number
}

interface IRequestGetBill extends IRequestPostBill {
  id: string
  createdAt: Date
  updatedAt: Date
}

export { IRequestPostBill, IRequestGetBill }
