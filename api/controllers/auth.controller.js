import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { errorHandler } from "../utils/error.js"
import 'dotenv/config'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save()
        res.status(201).json({ message: "user created successfully!!" })
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "User not found"))
        }
        const validPassword = bcrypt.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: _, ...userInfo } = validUser._doc
        res.cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json({ userInfo })

    } catch (error) {
        next(error)
    }
}