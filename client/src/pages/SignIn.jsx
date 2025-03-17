import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInScuess, signInFailure } from "../redux/user/userSlice";

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const { isLoading, error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            dispatch(signInStart())

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success === false) {
                dispatch(signInFailure(data.message))
                return
            }
            dispatch(signInScuess(data))
            navigate("/")

        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className="max-w-xl mx-auto sm:max-w-md px-4">
            <h1 className="text-3xl font-semibold text-center my-8">Sign In</h1>
            <form className="flex flex-col gap-4 justify-center" onSubmit={onSubmitHandler}>
                <input type="email" id="email" placeholder="email" onChange={onChangeHandler}
                    className="border border-slate-700 rounded-lg py-2 px-5 focus:outline-none" />
                <input type="password" id="password" placeholder="password" onChange={onChangeHandler}
                    className="border border-slate-700 rounded-lg py-2 px-5 focus:outline-none" />
                <button type="submit" disabled={isLoading}
                    className="bg-slate-700 text-white rounded-lg py-2 mt-10 min-w-full sm:min-w-2/3 mx-auto hover:bg-slate-800 disabled:opacity-50">
                    {isLoading ? "Loading..." : "Sign In"}
                </button>
            </form>
            <div>
                <p className="text-sm mt-1">
                    Dont Have an account?
                    <Link to={"/sign-up"}>
                        <span className=" text-blue-600 ml-2 text-sm">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
            {error && <p className="text-red-500 mt1">{error}</p>}
        </div >
    )
}
