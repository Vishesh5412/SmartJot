const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //we have to write it only in the root file //use to manage env variables agar .env files hai tho it is necessary
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
const cookieParser = require("cookie-parser"); //used to read and parse cookie (res.cookie not need it ie it's a built in feture of node)
app.use(cookieParser()); // ✅ This makes req.cookies work
const port = process.env.PORT || 5500;

const PostRouter = require("./routes/Notes");
const UserRouter = require("./routes/User");
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/Notes", PostRouter);
app.use("/api/User", UserRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
