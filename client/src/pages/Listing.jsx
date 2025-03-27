import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

export default function Listing() {
    const [listing, setListing] = useState(null)
    const [hasError, setHasError] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const param = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            setIsLoading(true)
            setHasError(false)
            try {
                const res = await fetch(`/api/listing/getListing/${param.id}`)
                const data = await res.json()
                if (data.success === false) {
                    console.log(`${data.errorCode}_${data.message}`)
                    setIsLoading(false)
                    setHasError(true)
                    return
                }
                setIsLoading(false)
                setHasError(false)

                setListing(data)

            } catch (error) {
                setIsLoading(false)
                setHasError(true)
            }
        }
        fetchListing()
    }, [])

    return (
        <main>
            {hasError && <h1 className="text-center text-4xl font-semibold p-6">Something went wrong ...</h1>}
            {listing && <>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}>
                    {listing.imageUrls.map((url, index) =>
                        <SwiperSlide key={url}><img src={url} className="h-[30dvh] w-full object-cover" /></SwiperSlide>
                    )}
                </Swiper>
            </>}
        </main>
    )
}