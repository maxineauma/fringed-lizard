import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import timerRoutes from "./routes/timerRoutes.js";

const app = express();
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/timer', timerRoutes);

app.get('/', (req, res) => {
    res.sendStatus(200);
});

mongoose.connect(DB_URL).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))
});