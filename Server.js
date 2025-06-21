const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dburl = process.env.mongodburl;
mongoose
  .connect(dburl)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) => console.log("❌ DB Connection Error:", err.message));

// Import Routes
const adminRouter = require("./routes/adminRoutes");
const learnerRouter = require("./routes/learnerRoutes");
const trainerRouter = require("./routes/trainerRoutes");
const saathiRouter = require("./routes/saathiRoutes");

// Register Routes
app.use("/admin", adminRouter);
app.use("/learner", learnerRouter);
app.use("/trainer", trainerRouter);
app.use("/saathi", saathiRouter);

// Start Server
const PORT = process.env.PORT || 2003;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
