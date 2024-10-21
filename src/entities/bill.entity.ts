import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { ConsumerUnit } from "./consumerUnit.entity"

@Entity("bill")
export class Bill {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @ManyToOne(() => ConsumerUnit)
  @JoinColumn()
  consumer: ConsumerUnit

  @Column({ nullable: false })
  referenceMonth: number

  @Column({ nullable: false })
  referenceYear: number

  @Column({ type: "date", nullable: false })
  dueDate: Date

  @Column({ length: 20, nullable: false })
  modality: string

  @Column({ length: 20, nullable: true })
  distributor: string

  @Column({ nullable: false, unique: true })
  fileName: string

  @Column({ nullable: false })
  consumptionEE: number

  @Column({ nullable: false })
  consumptionSCEE: number

  @Column({ nullable: false })
  compensatoryGDI: number

  @Column({ type: "numeric", nullable: false })
  compensatoryValueGDI: number

  @Column({ type: "numeric", nullable: false })
  publicContribuition: number

  @Column({ type: "numeric", nullable: false })
  consumptionTotal: number

  @Column({ type: "numeric", nullable: false })
  value: number

  @Column({ type: "numeric", nullable: false })
  valueWithoutCompensatoryValue: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
