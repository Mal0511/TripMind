import Sequelize from "sequelize";
import { sequelize } from "../config/connectDB.js";

// Import models
import UserModel from "./user.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize);

export default db;
