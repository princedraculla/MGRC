import express from "express";
import * as userRoutes from "./userRoutes.js";
const app = express();

const allRoutes = [[userRoutes.route]];



for (const router of allRoutes) {
    app.use(router)
} 

export { app }