import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongodb";

const PORT = process.env.PORT || 3001;

const app = express();

//config middleware
app.use(cors());
app.use(express.json());
app.use(router);

//database
db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));

