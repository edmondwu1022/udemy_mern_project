import Listing from '../models/listing.model.js'
import { errorHandler } from '../utils/error.js'

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json({ listing })

    } catch (error) {
        next(error)
    }
}

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if (req.user.id !== listing.userRef)
        return next(errorHandler(403, "Forbidden"))
    else if (!listing)
        return next(errorHandler(404, "Listing not found"))

    try {
        await Listing.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Listing deleted successfully" })

    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)

    if (req.user.id !== listing.userRef)
        return next(errorHandler(403, "Identity verification failed"))

    if (!listing)
        return next(errorHandler(404, "Listing not found"))

    try {
        const update = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json(update)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    if (req.user.id !== listing.userRef)
        return next(errorHandler(403, "Identity verification failed"))

    if (!listing)
        return next(errorHandler(404, "Listing not found"))

    try {
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}