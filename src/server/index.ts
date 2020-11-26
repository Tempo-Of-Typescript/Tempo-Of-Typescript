import { db } from "./database/index";
import { app } from "./app";
import { green } from "chalk";

const PORT = process.env.port || 8080;

db.sync().then(() => {
  app.listen(PORT, () => console.log(green("listening on port", PORT)));
});
