import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

const path = require('path');
let app = express();
//config app



app.use(session({
  secret: process.env.SESSION_SECRET,   //  ma bao mat
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }    // true neu dung https
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

connectDB();

let port = process.env.PORT || 9999;
app.listen(port, () => {
    console.log("Backend is running on the port: " + port);
})