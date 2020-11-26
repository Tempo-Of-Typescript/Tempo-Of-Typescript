import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import path from "path";
import morgan from "morgan";

export const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const staticPath: string = path.join(__dirname, "../../", "public");
app.use(express.static(staticPath));

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
