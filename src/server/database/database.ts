import {Sequelize} from 'sequelize-typescript'

export const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/tempo-Of-Typescript"
);


