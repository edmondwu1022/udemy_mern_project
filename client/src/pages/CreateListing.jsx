export default function CreateListing() {
    return (
        <main className="max-w-4xl mx-auto p-3 ">
            <h1 className="text-4xl font-semibold text-center my-7">Create Listing</h1>
            <form className="flex flex-col sm:flex-row gap-5">
                <div className="flex flex-col gap-3 flex-1">
                    <input id="name" placeholder="Name" type="text" minLength={10} maxLength={64} required
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <textarea id="description" placeholder="Description" type="text" required
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <input id="address" placeholder="Address" type="text" required
                        className="border-1 border-slate-700 rounded-md p-2" />
                    <div className="flex flex-row flex-wrap gap-5">
                        <div className="flex gap-3">
                            <input id="sale" type="checkbox" className="w-5" />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="rent" type="checkbox" className="w-5" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="parking" type="checkbox" className="w-5" />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="furnished" type="checkbox" className="w-5" />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-3">
                            <input id="offer" type="checkbox" className="w-5" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-5">
                        <div className="flex gap-3 items-center">
                            <input id="bedrooms" type="number" min={1} max={10} required
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <a>Beds</a>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input id="bathrooms" type="number" min={1} max={10} required
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <a>Beds</a>
                        </div>
                        <div className="flex gap-3 items-center">
                            <input id="regularPrice" type="number" min={1} max={10} required
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <div className="flex flex-col items-center">
                                <a>Regular Price</a>
                                <span>($/ month)</span>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">

                            <input id="discountPrice" type="number" min={1} max={10} required
                                className="border-1 border-slate-700 rounded-md py-2 px-3" />
                            <div className="flex flex-col items-center">
                                <a>Discounted Price</a>
                                <span>($/ month)</span>
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
                            <input id="images" type="file" accept="image/*" multiple
                                className="border border-slate-300 rounded-sm w-full p-3" />
                            <button type="button" className="text-green-700 border rounded-md uppercase p-3 hover:opacity-80 hover:shadow-md">upload</button>
                        </div>
                    </div>
                    <button type="submit" className="rounded-md bg-slate-600 text-white p-3 hover:opacity-90 disabled:opacity-50">Create Listing</button>
                </div>
            </form>
        </main>
    )
}
