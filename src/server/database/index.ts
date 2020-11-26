import { db } from "./database";
import { UserFactory, SessionsFactory } from "./models/index";

const User = UserFactory(db);
const Sessions = SessionsFactory(db);

User.hasMany(Sessions);

export { db, User, Sessions };
