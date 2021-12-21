import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from "typeorm";

import { Orders } from "./Orders";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column({
    type: 'numeric'
  })
  phone: number;

  @Column({
    type: 'date'
  })
  birthday: Date;

  @OneToOne(() => Orders, (order) => order.user)
  order: Orders;

  @Column({
    type: "simple-array",
    default: "USER",
  })
  role: string[];
}
