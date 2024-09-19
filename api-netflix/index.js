require("dotenv").config();
const cors = require("cors");
const YAML = require("yamljs");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const path = require("path");
const express = require("express");
const routes = require("./routes/index.route");

const swaggerDocs = YAML.load(path.join(__dirname, "swagger.yaml"));

const { API_PORT, MONGO_URL } = process.env;

const app = express();
const PORT = API_PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://react-netflix-clone-sand.vercel.app', 
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));

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
