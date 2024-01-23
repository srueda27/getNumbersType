require("dotenv").config();

import express from "express";
import cors from "cors";
import routes from "./routes";

const app: express.Application = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT || 4000}`);
});

app.use(cors());
app.use(express.json());

app.use("/", routes);
