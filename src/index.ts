require("dotenv").config({ path: "./config/.env" });
import "reflect-metadata";
import express from "express";
import configMiddlewares from "./main/config/middlewares";
import configRoutes from "./main/config/routes";

const app = express();
configMiddlewares(app);
configRoutes(app);

module.exports = { app };

//app.listen(8080, () => console.log(`Server running at http://localhost:8080`));
