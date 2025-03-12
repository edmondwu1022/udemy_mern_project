import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"

const app = express()
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connect to Mango DB");
}).catch((e) => {
    console.log(e);

    console.log("fail to connect to Mango DB");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.use("/api/user", userRoute)