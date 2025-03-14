import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsloading(true)

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            setIsloading(false)
            if (data.success === false) {
                setError(data.message)
                return
            }
            setError(null)
            navigate("/")

        } catch (error) {
            setIsloading(false)
            setError(error.message)
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
