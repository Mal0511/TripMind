import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { createProxyMiddleware } from 'http-proxy-middleware';

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();


const path = require('path');
let app = express();

//config app
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(
  session({
    secret: process.env.SESSION_SECRET, //  ma bao mat
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // true neu dung https
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, 'src/public')));



viewEngine(app);
initWebRoutes(app);
initApiRoutes(app);
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/auth')) return next();
  createProxyMiddleware({
    target: 'http://localhost:5173',
    changeOrigin: true,
    
  })(req, res, next);
});

connectDB()
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB connect error:", err));


let port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log("Backend is running on the port: " + port);
});
