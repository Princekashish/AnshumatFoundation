import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./api/routers/user.routes";
import adminRoute from "./api/routers/admin.route";
import connectDB from "./server";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = 8000;

const app = express();
app.use(
  cors({
    origin: "https://anshumat-foundation-kappa.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on localhost ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/auth/v1", userRoute);
app.use("/", adminRoute);
