const cookieParser = require("cookie-parser");
const express = require("express");
const multer = require("multer");
const app = express();
const mvcRoutes = require("./routes/mvcRoutes.js");
const doctorsRouter = require("./routes/doctorRoutes");
const specialityRoute = require("./routes/specialityRoute");
const apiDoctorRoutes = require("./routes/api/doctors.js");
const apiSpecialityRoutes = require("./routes/api/specialities.js");
const apiServiceRoutes = require("./routes/api/services");
const apiNewseRoutes = require("./routes/api/news");
const apiUsersRoutes = require("./routes/api/user");
const connectDb = require("./models/db.js");
const cors = require("cors");

const path = require("path");
const port = 8000;

app.set("view engine", "pug");

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectDb();

app.use("/", mvcRoutes, doctorsRouter, specialityRoute);
app.use(
  "/api",
  apiDoctorRoutes,
  apiSpecialityRoutes,
  apiServiceRoutes,
  apiUsersRoutes,
  apiNewseRoutes
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
