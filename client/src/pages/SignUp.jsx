import { Link } from "react-router";

export default function SignUp() {
    return (
        <div className="max-w-xl mx-auto sm:max-w-md px-4">
            <h1 className="text-3xl font-semibold text-center my-8">Sign Up</h1>
            <form className="flex flex-col gap-4 justify-center">
                <input type="text" id="username" placeholder="username"
                    className="border border-slate-700 rounded-lg py-2 px-5 focus:outline-none" />
                <input type="email" id="email" placeholder="email"
                    className="border border-slate-700 rounded-lg py-2 px-5 focus:outline-none" />
                <input type="password" id="password" placeholder="password"
                    className="border border-slate-700 rounded-lg py-2 px-5 focus:outline-none" />
                <button type="submit"
                    className="bg-slate-700 text-white rounded-lg py-2 mt-10 min-w-full sm:min-w-2/3 mx-auto hover:bg-slate-800 disabled:opacity-50">
                    Sign Up
                </button>
            </form>
            <div>
                <p className="text-sm mt-1">
                    Have an account?
                    <Link to={"/sign-in"}>
                        <span className=" text-blue-600 ml-2 text-sm">
                            Sign In
                        </span>
                    </Link>
                </p>

            </div>
        </div >
    )
}