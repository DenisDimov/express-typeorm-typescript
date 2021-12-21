import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("catalog")
export class Catalog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "simple-array",
    default: [],
  })
  type: string[];

  @Column()
  price: number;
}
