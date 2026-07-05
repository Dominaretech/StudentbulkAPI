const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");


const studentRoutes = require("./routes/student.routes");
const errorRoutes = require("./routes/error.routes");
const studentManagementRoutes = require("./routes/studentManagement.routes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Student Bulk Upload API Running",
  });
});


app.use("/api/students", studentRoutes);

app.use("/api/errors", errorRoutes);

app.use("/api/student-management", studentManagementRoutes);
// Route Not Found
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;

module.exports = app;
