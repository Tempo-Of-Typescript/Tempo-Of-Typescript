import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Default,
} from "sequelize-typescript";
import { Sessions } from "../index";

interface IUser {
  id: number;
  name: string;
  accessToken: number;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table
export class User extends Model<IUser> {
  @Column
  name!: string;

  @Default("not logged in")
  @Column
  accessToken!: string;

  @Default("not logged in")
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
