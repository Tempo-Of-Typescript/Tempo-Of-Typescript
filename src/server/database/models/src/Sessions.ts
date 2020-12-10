import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "../index";

interface ISessions {
  id: number;
  sessionUUID: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

@Table
export class Sessions extends Model<ISessions> {
  @Column
  sessionUUID!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user?: User;
}
