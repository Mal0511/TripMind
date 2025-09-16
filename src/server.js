import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
//config app



app.use(session({
  secret: process.env.SESSION_SECRET,   //  ma bao mat
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }    // true neu dung https
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 9999;
app.listen(port, () => {
    console.log("Backend is running on the port: " + port);
})