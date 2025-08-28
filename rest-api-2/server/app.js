import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import forumRoutes from "./routes/forumRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

//connecting to mongoDB server
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("-----");
      console.log("Connected to DB.");
      console.log(`Listening on port ${process.env.PORT}.`);
      console.log(`Hosting: https://localhost:${process.env.PORT}`);
      console.log("-----");
    });
  })
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("-----");
  next();
});

app.use("/api/topic", forumRoutes);
app.use("/api/user", userRoutes);
