import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { noteApiRoutes } from "./api/routes/api-routes.js";

if (process.env.NODE_ENV !== "production") {
  config();
}

const app = express();
const port = 3001;
const rootPath = path.resolve();

app.use(bodyParser.json());

app.use(express.static(path.join(rootPath, "public"), { index: "index.html" }));
app.use("/api/notes", noteApiRoutes);

app.use((req, res, next) => {
  next(createHttpError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  res.json({
    message: err.message,
    error: err,
  });
});

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on("error", (error) => console.log(error));
// eslint-disable-next-line no-console
db.once("open", () => console.log("Connected to Mongoose"));

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Note app listening at http://localhost:${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("message", (payload) => {
    io.emit("message", payload);
  });
  socket.on("theme", (payload) => {
    io.emit("theme", payload);
  });
});
