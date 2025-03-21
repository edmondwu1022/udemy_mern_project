import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"

export const user = (req, res) => {
    res.json({
        message: "Hello World"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "unauthorized"))
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
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

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token")
        res.status(200).json({
            message: "Account has been deleted"
        });
    } catch (error) {
        next(error);
    }
};
