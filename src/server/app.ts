import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import path from "path";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import { cookieProvider } from "./middleware/index";

export const app = express();

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const staticPath: string = path.join(__dirname, "../../", "public");
app.use(express.static(staticPath));
app.use(cookieparser());

//providing or getting session ID

app.use(cookieProvider);

//routes
import routes from "./routes";
app.use("/api", routes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.sendFile(staticPath);
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
