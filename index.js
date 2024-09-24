const cookieParser = require("cookie-parser");
const express = require("express");
const multer = require("multer"); // Add multer for file uploads
const app = express();
const mvcRoutes = require("./routes/mvcRoutes.js");
const doctorsRouter = require("./routes/doctorRoutes");
const specialityRoute = require("./routes/specialityRoute");
const apiDoctorRoutes = require("./routes/api/doctors.js");
const connectDb = require("./models/db.js");
const path = require("path");
const port = 8000;

// Set Pug as the view engine
app.set("view engine", "pug");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDb();

// Define routes after middleware
app.use("/", mvcRoutes, doctorsRouter, specialityRoute);
app.use("/api", apiDoctorRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
