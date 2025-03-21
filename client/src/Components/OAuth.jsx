import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"
import { signInSuccess } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"


export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        try {
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })

            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Something went wrong with google", error)
        }
    }

    return (
        <button type="button" onClick={handleGoogleClick} className="bg-red-600 uppercase p-3 rounded-xl text-white hover:opacity-80 hover:cursor-pointer">continue witg google</button>
    )
}