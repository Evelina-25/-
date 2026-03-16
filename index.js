import express from "express";
import mongoose from "mongoose";
import clientRouter from "./Clients/clientRouter.js";
import tourRouter from "./Tour/tourRouter.js";
import authRouter from "./User/authRouter.js";
import applicationRouter from "./Application/applicationRouter.js";
import paymentRouter from "./Payment/paymentRouter.js";
import documentRouter from "./Document/documentRouter.js";

const PORT = 5000;
//const uri = mongodb://admin:mongo721887@192.168.0.62/cosmetica?authSource=admin;
const uri = "mongodb://localhost:27017/travel_agency";

const app = express();

app.use(express.json());
app.use("/api/clients", clientRouter);
app.use("/api/tours", tourRouter);
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/documents", documentRouter)


async function startApp() {
    try {
        await mongoose.connect(uri);
        app.listen(PORT, () =>
            console.log("SERVER STARTED ON PORT " + PORT)
        );
    } catch (e) {
        console.log(e);
    }
}

startApp();