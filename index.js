import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", router);
app.get("/", (req, res) => {
  res.send("Hello, this is my Memories API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //  useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is runnning on Port: ${PORT}`);
      console.log("mongodb connected");
    })
  )
  .catch((error) => console.log(error.message));
// mongoose.set("useFindAndModify", false);
