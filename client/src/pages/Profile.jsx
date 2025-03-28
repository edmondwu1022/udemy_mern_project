import { useSelector } from "react-redux"
import { Link } from "react-router"
import { useEffect, useInsertionEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, list, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase.js"
import { useDispatch } from "react-redux"
import { userUpdateFailure, userUpdateSuccess, userUpdateStart, userDeleteFailure, userDeleteStart, userDeleteSuccess, userSignOutStart, userSignOutSuccess, userSignOutFailure } from "../redux/user/userSlice.js"

export default function Profile() {
    const { currentUser, isLoading, error } = useSelector((state) => state.user)
    const iconFileRef = useRef()
    const [file, setFile] = useState(undefined)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [userListingsData, setUserListingsData] = useState([])
    const dispatch = useDispatch()
    const [showListings, setsShowListings] = useState(false)

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }
    }, [file])

    useEffect(() => {
        checkUserListings()
    }, [])

    const checkUserListings = async () => {
        try {
            const listings = await fetch(`/api/user/listings/${currentUser._id}`, { method: "GET" })
            const data = await listings.json()
            setUserListingsData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileUpload = (file) => {
        const storage = getStorage(app)
        const fileName = `${new Date().getTime()}_${file.name}`
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setUploadProgress(Math.round(progress))
            }, (e) => {
                setUploadError(true)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL })
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleDelete = async () => {
        try {
            dispatch(userDeleteStart())
            const res = await fetch(`api / user / delete/${currentUser._id}`, {
                method: "DELETE"
            })

            const data = await res.json()
            if (data.success === false) {
                dispatch(userDeleteFailure(data.message))
                return
            }
            dispatch(userDeleteSuccess(data))

        } catch (error) {
            dispatch(userDeleteFailure(error.message))
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            dispatch(userUpdateStart())

            const res = await fetch(`api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success === false) {
                dispatch(userUpdateFailure(data.message))
                return
            }
            dispatch(userUpdateSuccess(data))

        } catch (error) {
            dispatch(userUpdateFailure(error.message))
        }
    }
    const handleSignout = async () => {
        try {
            dispatch(userSignOutStart())
            const res = await fetch("api/auth/signout")
            const data = await res.json()

            if (data.success === false) {
                dispatch(userSignOutFailure(data.message))
                return
            }
            dispatch(userSignOutSuccess(data))

        } catch (error) {
            dispatch(userSignOutFailure(error.message))
        }
    }

    const showListingsClick = () => {
        setsShowListings(!showListings)
    }

    const onDeleteClick = async (id) => {
        try {
            const res = await fetch(`/api/listing/delete/${id}`, {
                method: "DELETE"
            })
            const data = await res.json()

            if (data.success === false)
                return console.log(data.message)

            setUserListingsData(userListingsData.filter((listing) => listing._id !== id))

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-center font-semibold text-3xl pt-5">Profile</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
                    <input id="fileInput" type="file" accept="image/*" ref={iconFileRef} hidden onChange={(e) => setFile(e.target.files[0])} />
                    <img id="profileIcon" src={formData.avatar || currentUser.avatar} alt="profile" onClick={() => iconFileRef.current.click()} className="rounded-full size-20 cursor-pointer self-center border-white  hover:border-2"></img>
                    <p className="text-center">
                        {uploadError ? (
                            <span className="text-red-500">Error Image upload</span>
                        ) : uploadProgress > 0 && uploadProgress < 100 ? (
                            <span className="text-slate-700">Uploading {uploadProgress}%</span>
                        ) : uploadProgress === 100 ? (
                            <span className="text-green-700 text-sm">Upload Successful</span>
                        ) : (
                            ""
                        )}
                    </p>
                    <input type="text" id="username" placeholder="username" onChange={handleChange} defaultValue={currentUser.username} className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="email" id="email" placeholder="email" onChange={handleChange} defaultValue={currentUser.email} className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="password" id="password" placeholder="password" onChange={handleChange} className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <button type="submit" disabled={isLoading} className="bg-slate-700 text-white uppercase rounded-md h-10 hover:opacity-95 disabled:opacity-50 "> {isLoading ? "update..." : "update"}</button>
                    <Link to={"/create-listing"} className="bg-green-700 text-center text-white rounded-md p-2 uppercase hover:opacity-90">Create Listing
                    </Link>
                </form>
                <div className="flex justify-between mt-2">
                    <span onClick={handleDelete} className="text-red-500 cursor-pointer">Delete account</span>
                    <span onClick={handleSignout} className="text-red-500 cursor-pointer">Sign out</span>
                </div>
                {error ? (<p className="text-red-500">{error}</p>) : ""}
                {userListingsData && userListingsData.length > 0 &&
                    <button onClick={showListingsClick} type="button" className="w-full text-green-700 font-semibold m-3 cursor-pointer hover:opacity-90"> {showListings ? "Hide Listings" : "Show Listings"}</button>}
                {showListings &&
                    <div className="flex flex-col gap-3">
                        <h1 className="text-center font-semibold text-4xl mt-7">Listings</h1>
                        {userListingsData.map((listing, index) =>
                            <div key={listing._id} className="flex flex-row gap-3 items-center justify-between p-3 border border-slate-300 hover:shadow-md">
                                <Link to={`/listing/${listing._id}`} className="flex-4/5">
                                    <div className="flex flex-row gap-3 items-center">
                                        <img src={listing.imageUrls[0]} alt="Image" className="w-30 object-contain" />
                                        <p className="font-black hover:underline">{listing.name}</p>
                                    </div>
                                </Link>
                                <div className="flex flex-col flex-1/5 gap-1">
                                    <button type="button" onClick={() => onDeleteClick(listing._id)} className="uppercase text-red-500 text-sm font-bold cursor-pointer hover:underline">Delete</button>
                                    <Link to={`/update-listing/${listing._id}`} >
                                        <button type="button" className="uppercase text-green-600 text-sm font-bold w-full cursor-pointer hover:underline">Edit</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </section >
    )
}