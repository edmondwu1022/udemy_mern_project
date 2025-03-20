import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase.js"

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user)
    const iconFileRef = useRef()
    const [file, setFile] = useState(undefined)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadError, setUploadError] = useState(false)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (file) {
            handleFileUpload(file)
        }
    }, [file])

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

    return (
        <section>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-center font-semibold text-3xl pt-5">Profile</h1>
                <form className="flex flex-col gap-4 mt-3">
                    <input id="fileInput" type="file" accept="image/*" ref={iconFileRef} hidden onChange={(e) => setFile(e.target.files[0])} />
                    <img id="profileIcon" src={formData.avatar || currentUser.avatar} alt="profile" onClick={() => iconFileRef.current.click()} className="rounded-full size-20 cursor-pointer self-center border-white  hover:border-2"></img>
                    <p className="text-center">
                        {uploadError ? (
                            <span className="text-red-500">Error Image upload</span>
                        ) : uploadProgress > 0 && uploadProgress < 100 ? (
                            <span className="text-salt-700 text-sm">Uploading {uploadProgress}%</span>
                        ) : uploadProgress === 100 ? (
                            <span className="text-green-700 text-sm">Upload Successful</span>
                        ) : (
                            ""
                        )}
                    </p>
                    <input type="text" id="username" placeholder="username" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="email" id="email" placeholder="email" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <input type="text" id="password" placeholder="password" className="border border-slate-400 rounded-md p-3 h-10 focus:outline-none" />
                    <button type="submit" className="bg-slate-700 text-white uppercase rounded-md h-10 hover:opacity-95 disabled:opactiy-50 ">update</button>
                </form>
                <div className="flex justify-between mt-2">
                    <span className="text-red-500 cursor-pointer">Delete account</span>
                    <span className="text-red-500 cursor-pointer">Sign out</span>
                </div>
            </div>
        </section >
    )
}