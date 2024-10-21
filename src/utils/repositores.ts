import AppDataSource from "../data-source"
import { Bill } from "../entities/bill.entity"
import { ConsumerUnit } from "../entities/consumerUnit.entity"

export const billsRepository = AppDataSource.getRepository(Bill)
export const consumerUnitsRepository = AppDataSource.getRepository(ConsumerUnit)
