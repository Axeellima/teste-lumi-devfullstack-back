import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Bill } from "./bill.entity"

@Entity("consumerUnit")
export class ConsumerUnit {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ length: 150, nullable: true })
  name: string

  @Column({ type: "bigint", nullable: false })
  number: number

  @Column({ default: true })
  isActive: boolean

  @Column({ length: 100, nullable: true })
  distributor: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Bill, (bills) => bills.consumer)
  @JoinColumn()
  bills: Bill[]
}
