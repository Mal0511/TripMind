import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    
    process.env.DB_NAME || 'trip_db', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS || "Lelam1234%", 
    {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql'
    }
);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;