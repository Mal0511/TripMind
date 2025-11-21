// /mnt/data/connectDB.js  <-- sửa/ghi đè file này
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    dialect: "mysql",
    logging: false,
    define: {
      // nếu bạn muốn Sequelize tự động thêm createdAt/updatedAt, hoặc tắt global setting
      // timestamps: true
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // DEV: Đồng bộ model -> database (thêm/alter cột để khớp model)
    await sequelize.sync({ alter: true });
    console.log("✅ Models synced with DB (alter).");
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
    throw err;
  }
};

export default connectDB;
export { sequelize };
