import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/mongodb";
import { router } from "./routes";
import {sawggerDocs} from './docs/swagger'

const PORT = process.env.PORT || 3001;
const app = express();

//config middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

//database
db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => {
   console.log(`Listo por el puerto ${PORT}`)
   sawggerDocs(app)//documentation
});

