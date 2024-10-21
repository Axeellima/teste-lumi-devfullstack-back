import { consumerUnitsRepository } from "../../utils/repositores"
import { AppError } from "../../errors/appError"
import { IRequestPostConsumerUnit } from "../../interfaces/consumerUnit"

const createConsumerUnitService = async ({
  name,
  number,
  distributor,
}: IRequestPostConsumerUnit) => {
  const consumerAlreadyExists = await consumerUnitsRepository.findOne({
    where: { number: number },
  })
  if (consumerAlreadyExists) {
    throw new AppError("Unidade consumidora já existe", 401)
  }
  const newConsumerUnit = consumerUnitsRepository.create({
    name,
    number,
    distributor,
  })

  await consumerUnitsRepository.save(newConsumerUnit)

  return newConsumerUnit
}
export default createConsumerUnitService
