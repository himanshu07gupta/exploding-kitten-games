const express = require("express");
const cors = require("cors")
const port =3000;
const app = express();
const {mainrouter} = require("./routes/index")
const {client} = require("./db/redis_client")

app.use(express.json());
app.use(cors())

app.use("/kittenapp/v1",mainrouter)

app.listen(port)