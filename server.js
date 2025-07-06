const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const patientRoutes = require("./routes/patients");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "secureSecretKey",
  resave: false,
  saveUninitialized: true,
}));

app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Advanced server running at http://localhost:5000");
});
