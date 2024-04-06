import express from "express";
import * as userRoutes from "./userRoutes.js";
import * as chargeRouter from "./chargeRoutes.js"
const app = express();
app.use(express.json())
const allRoutes = [[userRoutes.route], [chargeRouter.router]];

for (const router of allRoutes) {
    app.use(router)
} 

export { app }