import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001", // Substitua pela URL do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
