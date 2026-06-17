import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes.js";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;
const uri = "mongodb://admin:mongo721887@192.168.0.62/travel?authSource=admin";
//const uri = "mongodb://localhost:27017/travel_agency";
const frontendPath = path.join(path.resolve(), 'frontend');
console.log("Frontend path:", frontendPath);
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",routes);

const uploadsPath = path.join(path.resolve(), 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.use(express.static(frontendPath));

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