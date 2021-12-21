import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";

import { User } from "./User";
import { Pizzeria } from "./Pizzerias";

@Entity("orders")
export class Orders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summ: number;

  @Column()
  discount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => User, (user) => user.order, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Pizzeria, (pizzeria) => pizzeria.order, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  pizzeria: Pizzeria;
}
