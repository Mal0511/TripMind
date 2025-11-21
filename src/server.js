// src/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import initApiRoutes from "./route/api.js";
import connectDB from "./config/connectDB.js";

// __dirname cho ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FE_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Session — dev config (use a store in production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "tripmind_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Static public if needed
app.use(express.static(path.join(__dirname, "..", "public")));

// Configure view engine (if you use ejs)
try {
  viewEngine(app);
} catch (err) {
  console.warn("viewEngine config skipped:", err.message);
}

// Start: connect DB -> mount routes -> start server
const FE_DIST = path.join(__dirname, "..", "FE", "dist");
const isProd = process.env.NODE_ENV === "production";

const start = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully!");

    // Mount routes AFTER DB is ready
    initWebRoutes(app); // mounts "/" web routes (server-side)
    initApiRoutes(app); // mounts "/api" routes

    // DEV: redirect root to Vite dev server so visiting :3000 opens FE dev
    if (!isProd) {
      const VITE_URL = process.env.FE_URL || "http://localhost:5173";
      app.get("/", (req, res) => res.redirect(VITE_URL));
    } else {
      // PROD: serve built FE
      app.use(express.static(FE_DIST));
      app.get("*", (req, res) => res.sendFile(path.join(FE_DIST, "index.html")));
    }

    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
      console.log(`=> Backend is running on port: ${port}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();
