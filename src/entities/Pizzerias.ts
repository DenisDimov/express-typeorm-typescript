import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from "typeorm";
import { Orders } from "./Orders";

@Entity("pizzeria")
export class Pizzeria extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @OneToOne(() => Orders, order => order.pizzeria)
  order: Orders;
}
