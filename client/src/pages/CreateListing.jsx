import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { use, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [uploadError, setUploadError] = useState(false);
    const [errorMessages, setErrorMessages] = useState(false);
    const [isUploding, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        regularPrice: 50,
        discountedPrice: 0,
        bedrooms: 1,
        bathrooms: 1,
        furnished: false,
        parking: false,
        type: "rent",
        offer: false,
        imageUrls: [],
    })
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handlerImageUpload = (e) => {
        if (files.length > 0 && (formData.imageUrls.length + files.length) < 7) {
            setUploadError("Uploading images...")
            const promises = []

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }

            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
                setUploadError(false)
            }).catch((e) => {
                setUploadError("Error uploading images!!")
            })
        } else {
            files.length === 0 ? setUploadError("Please select any image") : setUploadError("Upload more than 6 images!!")
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = `${new Date().getTime()}_${file.name}`
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                }, (e) => {
                    reject(e)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        resolve(downloadURL)
                    })
                })
        })
    }

    const handlerRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }

    const handlerOnChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({ ...formData, type: e.target.id })
        }

        if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setFormData({ ...formData, [e.target.id]: e.target.checked })
        }

        if (e.target.id === "name" || e.target.id === "description" || e.target.id === "address") {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }

        if (e.target.id === "bedrooms" || e.target.id === "bathrooms" || e.target.id === "regularPrice" || e.target.id === "discountedPrice") {
            setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) })
        }
    }

    const hadlerSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.imageUrls.length < 1)
                return setErrorMessages("Please upload at least one image")

            setIsUploading(true)

            const res = await fetch("/api/listing/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, userRef: currentUser._id })
            })
            const data = await res.json()

            if (data.success === false) {
                console.log(`${data.statusCode} - ${data.message}`)
                setErrorMessages(data.message)

            }
            setIsUploading(false)
            navigate(`/listing/${data.listing._id}`)

        } catch (error) {
            setErrorMessages(error.message)
            setIsUploading(false)
        }
    }


    return (
        <main className="max-w-4xl mx-auto p-3 ">
            <h1 className="text-4xl font-semibold text-center my-7">Create Listing</h1>
            <form onSubmit={hadlerSubmit} className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-3 flex-1">
                    <input id="name" placeholder="Name" type="text" minLength={10} maxLength={64} required value={formData.name} onChange={handlerOnChange}
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <textarea id="description" placeholder="Description" type="text" required value={formData.description} onChange={handlerOnChange}
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <input id="address" placeholder="Address" type="text" required value={formData.address} onChange={handlerOnChange}
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <div className="flex flex-row flex-wrap gap-5">
                        <div className="flex gap-3">
                            <input id="sale" type="checkbox" className="w-5" checked={formData.type == "sale"} onChange={handlerOnChange} />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="rent" type="checkbox" className="w-5" checked={formData.type == "rent"} onChange={handlerOnChange} />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="parking" type="checkbox" className="w-5" checked={formData.parking} onChange={handlerOnChange} />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="furnished" type="checkbox" className="w-5" checked={formData.furnished} onChange={handlerOnChange} />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="offer" type="checkbox" className="w-5" checked={formData.offer} onChange={handlerOnChange} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-5">
                        <div className="flex gap-3 items-center">
                            <input id="bedrooms" type="number" min={1} max={10} required value={formData.bedrooms} onChange={handlerOnChange}
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <a>Beds</a>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input id="bathrooms" type="number" min={1} max={10} required value={formData.bathrooms} onChange={handlerOnChange}
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <a>Beds</a>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input id="regularPrice" type="number" min={50} max={100000} required value={formData.regularPrice} onChange={handlerOnChange}
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <div className="flex flex-col items-center">
                                <a>Regular Price</a>
                                {formData.type === "rent" ? <span>($/ month)</span> : <span></span>}
                            </div>
                        </div>
                        <div className="flex gap-3 items-center" hidden={!formData.offer}>
                            <input id="discountedPrice" type="number" min={0} max={99999} required value={formData.discountedPrice} onChange={handlerOnChange}
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <div className="flex flex-col items-center">
                                <a>Discounted Price</a>
                                {formData.type === "rent" ? <span>($/ month)</span> : <span></span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 flex-1 justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="font-black text-black text-sm">Images:
                            <span className="font-normal text-sm text-slate-600">The first image will be the cover (max 6)</span>
                        </p>
                        <div className="flex flex-row gap-3">
                            <input
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                                className="border border-slate-300 rounded-sm w-full p-3" />
                            <button
                                type="button"
                                onClick={handlerImageUpload}
                                className="text-green-700 border rounded-md uppercase p-3 hover:opacity-80 hover:shadow-md">
                                upload
                            </button>
                        </div>
                        <p className="text-red-500 text-sm">{uploadError && uploadError}</p>
                        {
                            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) =>
                                <div key={url} className="flex flrx-row items-center justify-between border px-5">
                                    <img src={url} alt="Listing Image" className="size-30 object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => handlerRemoveImage(index)}
                                        className="text-red-500 font-semibold hover:opacity-75">
                                        Delete
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <button type="submit" className="rounded-md bg-slate-600 text-white p-3 hover:opacity-90 disabled:opacity-50">
                        {isUploding ? "Uploading..." : "Create Listing"}
                    </button>
                </div>
            </form>
        </main>
    )
}
