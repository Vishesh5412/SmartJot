const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //we have to write it only in the root file //use to manage env variables agar .env files hai tho it is necessary
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));
const cookieParser = require("cookie-parser"); //used to read and parse cookie (res.cookie not need it ie it's a built in feture of node)
app.use(cookieParser()); // ✅ This makes req.cookies work
const port = process.env.PORT;

const PostRouter = require("./routes/Notes");
const UserRouter = require("./routes/User");
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    credentials: true, // Allow cookies (like JWT) to be sent
  })
);

app.use(express.json());
app.use("/api/Notes", PostRouter);
app.use("/api/User", UserRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
