import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Sessions } from "../index";

interface IUser {
  id: number;
  name: string;
  authToken: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table
export class User extends Model<IUser> {
  @Column
  name!: string;

  @Column
  authToken!: string;

  @Column
  refreshToken!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Sessions)
  sessions?: Sessions[];
}
