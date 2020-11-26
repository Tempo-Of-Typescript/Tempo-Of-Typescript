import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface SessionAttributes {
  id: number;
  sessionUUID: string;
}
export interface SessionsModel
  extends Model<SessionAttributes>,
    SessionAttributes {}
export class Sesssions extends Model<SessionsModel, SessionAttributes> {}

export type SessionsStatic = typeof Model & {
  //ignored because our new input is always going to be an object
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (values?: object, options?: BuildOptions): SessionsModel;
};

export function SessionsFactory(sequelize: Sequelize): SessionsStatic {
  return <SessionsStatic>sequelize.define("sessions", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionUUID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
