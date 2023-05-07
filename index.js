import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { noteApiRoutes } from "./routes/api-routes.js";
import { noteRoutes } from "./routes/index.js";

if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/", noteRoutes);
app.use("/api/notes", noteApiRoutes);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", (error) => console.log(error));
// eslint-disable-next-line no-console
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Note app listening at http://localhost:${port}`);
});
