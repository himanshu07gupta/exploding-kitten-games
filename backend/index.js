const express = require("express");
const {config} = require("dotenv")
config()
const cors = require("cors")
const port =3000;
const app = express();
const {mainrouter} = require("./routes/index")


// import swaggerUi from 'swagger-ui-express'
// import YAML from 'yamljs'

// const {swaggerUi} = require("swagger-ui-express")
// const {YAML} = require("yamljs")


app.use(express.json());
app.use(cors())

app.use("/kittenapp/v1",mainrouter)

console.log("I am working");

// const swaggerDocument = YAML.load('api.yaml')
// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port)