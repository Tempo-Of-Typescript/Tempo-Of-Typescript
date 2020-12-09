declare namespace Express {
  export interface Request {
    currentUser: import("../../src/server/database").User;
  }
}
