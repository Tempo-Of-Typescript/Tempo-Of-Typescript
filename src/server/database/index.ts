import { Sequelize } from "sequelize-typescript";
import { Sessions } from "./models/src/Sessions";
import { User } from "./models/src/User";

const db = new Sequelize({
  database: process.env.DATABASE_URL || "tempo-Of-Typescript",
  dialect: "postgres",
  models: [Sessions, User],
});

export { db, User, Sessions };
