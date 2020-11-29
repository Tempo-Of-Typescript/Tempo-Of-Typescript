import express, {
  json,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import path from "path";
import morgan from "morgan";
import cookieparser from "cookie-parser";

export const app = express();

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const staticPath: string = path.join(__dirname, "../../", "public");
app.use(express.static(staticPath));

//routes
import routes from "./routes";
app.use("/api", routes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("reeee");
    res.sendFile(path.join(staticPath, "index.html"));
  } catch (err) {
    next(err);
  }
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).send(err);
  }
);
