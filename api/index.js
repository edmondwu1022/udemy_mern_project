import express from "express";
import mongoose from "mongoose";

const app = express()
const url = process.env.MONGO

mongoose.connect(url).then(() => {
    console.log("connect to Mango DB");
}).catch(() => {
    console.log("fail to connect to Mango DB");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})