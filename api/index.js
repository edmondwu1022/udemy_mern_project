import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connect to Mango DB");
}).catch((e) => {
    console.log("fail to connect to Mango DB");
})

app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})