require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/index.route");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocs = YAML.load("./swagger.yaml");

const { API_PORT, MONGO_URL } = process.env;

const app = express();
const PORT = API_PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(MONGO_URL).catch((error) => {
  if (error) {
    console.log("Failed to connect to MongoDB");
    throw error;
  }
  console.log("Connected to MongoDB");
});

app.use(routes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
