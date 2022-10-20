require("dotenv").config({path: "./.env"});

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.urlencoded({extended: false}));


app.use("/", require("./src/routes"));

app.listen(8888, ()=>{
  console.log("app listen on port 8888");
});
