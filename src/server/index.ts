import { db } from "./database/index";
import { app } from "./app";
import { green } from "chalk";
import env from "dotenv";
env.config();

const PORT = process.env.port || 8080;

const dropTables = process.env.DEV_MODE === "true" ? true : false;

db.sync({ force: dropTables }).then(() => {
  app.listen(PORT, () => console.log(green("listening on port", PORT)));
});
