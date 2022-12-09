import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongodb";
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from "./docs/swagger"

const PORT = process.env.PORT || 3001;

const app = express();

//config middleware
app.use(cors());
app.use(express.json());
app.use(router);

//documentation
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))

//database
db().then(() => console.log("Conexion Ready"));

app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`));

