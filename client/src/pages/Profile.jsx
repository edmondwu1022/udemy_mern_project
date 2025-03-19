import { useSelector } from "react-redux"

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <section>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-center font-semibold text-3xl pt-5">Profile</h1>
                <form className="flex flex-col gap-4 mt-3">
                    <img src={currentUser.avatar} alt="profile" className="rounded-full size-20 cursor-pointer self-center hover:border-2 border-white"></img>
                    <input type="text" id="username" placeholder="test" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="email" id="email" placeholder="email" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="text" id="password" placeholder="password" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <button type="submit" className="bg-slate-700 text-white uppercase rounded-md h-10 hover:opacity-95 disabled:opactiy-50 ">update</button>
                </form>
                <div className="flex justify-between mt-2">
                    <span className="text-red-700 cursor-pointer">Delete account</span>
                    <span className="text-red-700 cursor-pointer">Sign out</span>
                </div>
            </div>
        </section>
    )
}