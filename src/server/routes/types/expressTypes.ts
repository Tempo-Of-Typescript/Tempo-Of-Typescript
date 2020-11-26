import { NextFunction, Response, Request, Errback } from "express";

export interface routerActions {
  req: Request;
  res: Response;
  next: NextFunction;
  err: Errback;
}
