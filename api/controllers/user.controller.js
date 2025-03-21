import { errorHandler } from "../utils/error"
import { findByIdAndUpdate } from "mongoose"
import User from "../models/user.model"
import { hash } from "bcryptjs"

export const user = (req, res) => {
    res.json({
        message: "Hello World"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.parms.id) {
        return next(errorHandler(401, "unauthorized"))
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.parms.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true }
        )
        const { password: _, ...user } = updatedUser._doc

        res.status(200)
            .json(user)

    } catch (error) {
        next(error)
    }

}