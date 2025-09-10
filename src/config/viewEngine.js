import express from "express";



let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.use("/js", express.static("./src/views/js"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
module.exports = configViewEngine;



