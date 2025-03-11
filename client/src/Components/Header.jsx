import { FaSearch } from "react-icons/fa"
import { Link } from "react-router"

export default function Header() {

    return (
        <header className="bg-slate-200 shadow-md p-5">
            <div className="flex justify-between items-center max-w-7xl max-h-5 mx-auto">
                <Link to={"/"}>
                    <h1 className="text-xl sm:text-md font-bold flex flex-wrap">
                        <span className="text-blue-800">Digital</span>
                        <span className="text-cyan-500">Creation</span>
                    </h1>
                </Link>
                <form className="bg-slate-100 rounded-lg flex items-center p-3 sm:p-1">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm ml-3 focus:outline-none focus:py-1 w-20 sm:w-40 ease-initial duration-200"
                    />
                    <FaSearch className="text-slate-600 mr-3" />
                </form>
                <div >
                    <ul className="flex gap-4 justify-between items-center flex-wrap uppercase text-sm">
                        <Link to={"/"}>
                            <li className="hidden sm:inline font-normal text-slate-600 py-3 cursor-pointer hover:border-b-1 hover:text-slate-700 hover:font-black">Home</li>
                        </Link>
                        <Link to={"/about"}>
                            <li className="hidden sm:inline font-normal text-slate-600 py-3 cursor-pointer hover:border-b-1 hover:text-slate-700 hover:font-black">About</li>
                        </Link>
                        <Link to={"/sign-in"}>
                            <li className="font-normal text-slate-600 py-3 cursor-pointer hover:border-b-1 hover:text-slate-700 hover:font-black">Sign in</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    )
}