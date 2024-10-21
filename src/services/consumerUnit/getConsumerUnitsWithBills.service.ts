import { consumerUnitsRepository } from "../../utils/repositores"

const getConsumerUnitsWithBillsService = async ({
  year,
  clientNumber,
}: {
  year: number
  clientNumber?: number
}) => {
  const queryConditions: any = {
    where: {
      bills: {
        referenceYear: year,
      },
    },
    relations: ["bills"],
  }

  const consumerUnits = await consumerUnitsRepository.find(queryConditions)
  if (clientNumber && consumerUnits) {
    const filteredConsumerUnits = consumerUnits.filter((c) =>
      c.number.toString().includes(clientNumber.toString())
    )
    if (!filteredConsumerUnits) {
      return []
    }
    return filteredConsumerUnits
  }

  return consumerUnits
}

export default getConsumerUnitsWithBillsService
