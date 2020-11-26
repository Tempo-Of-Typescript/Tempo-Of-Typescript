import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { User, Sessions } from "../../database/index";
import { blue } from "chalk";
interface serverActions {
  req: Request;
  res: Response;
  next: NextFunction;
}

export const cookieProvider = async ({ req, res, next }: serverActions) => {
  console.log(blue("reeeeeeeeeeeeeeeeeeeeeee"));
  try {
    if (req.cookies.length > 0) {
      console.log("do something with cookies");
    } else {
      const newUserUUID = uuidv4();

      const newUser = await User.create({ name: newUserUUID });

      console.log(newUser);
      console.log("reeee");
      next();
    }
  } catch (err) {
    next(err);
  }
};
