import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middlewares
app.use(express.json());

// Definir rotas aqui
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
