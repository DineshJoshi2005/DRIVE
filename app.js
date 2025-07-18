const express = require('express');
const userRoute = require("./routes/user.routes");
const dotenv = require('dotenv');
const connectToDB = require("./config/db");

const app = express();
dotenv.config();

connectToDB();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/user", userRoute);

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(3000, ()=>{
    console.log("Server is Listening at port number 3000");
})