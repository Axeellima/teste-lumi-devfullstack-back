interface IRequestPostConsumerUnit {
  name: string
  number: number
  distributor: string
}

interface IRequestGetConsumerUnit extends IRequestPostConsumerUnit {
  id: string
  createdAt: Date
  updatedAt: Date
}
export { IRequestPostConsumerUnit, IRequestGetConsumerUnit }
