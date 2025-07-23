require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const bodyParser = require("body-parser");

const contactRouter = require("./routes/contactRoute");
const authRouter = require("./routes/authRouter");
const leadRouter = require("./routes/leadRouter");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", contactRouter);
app.use("/api", authRouter);
app.use("/api", leadRouter);

app.get("/", (req, res) => {
  res.send("API de contacto funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log("Swagger en http://localhost:5000/api-docs");
});
