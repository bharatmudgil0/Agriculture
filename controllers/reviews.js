const Listing = require("../models/listing.js");
const Demand = require("../models/demand.js");
const Review = require("../models/review.js");


module.exports.createReview = async (req, res) => {
    const { id } = req.params;  // Retrieve the id of the listing from the URL
    const listing = await Listing.findById(id);  // Find the listing by its id

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const newReview = new Review(req.body.review);  // Create a new review from the request body
    newReview.author = req.user._id;
    listing.reviews.push(newReview);  // Add the review to the listing's reviews array

    await newReview.save();  // Save the review to the database
    await listing.save();  // Save the updated listing to the database

    req.flash("success", "New Review Added!!");
    res.redirect(`/listings/${id}`);  // Redirect to the listing page after adding the review
};

module.exports.destroyReview = async(req,res) => {
    let {id , reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!!");
    res.redirect(`/listings/${id}`);
    };
    
    //This is for the demand page review
module.exports.demandcreateReview = async (req, res) => {
    const { id } = req.params;  // Retrieve the id of the listing from the URL
    // console.log("Received ID:", id);

    const listing = await Demand.findById(id);  // Find the listing by its id

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings/demand");
    }

    const newReview = new Review(req.body.review);  // Create a new review from the request body
    newReview.author = req.user._id;
    listing.reviews.push(newReview);  // Add the review to the listing's reviews array

    await newReview.save();  // Save the review to the database
    await listing.save();  // Save the updated listing to the database

    req.flash("success", "New Review Added!!");
    res.redirect(`/listings/demand/${id}`);  // Redirect to the listing page after adding the review
};

module.exports.demandDestroyReview = async(req,res) => {
    let {id , reviewId} = req.params;

    await Demand.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!!");
    res.redirect(`/listings/demand/${id}`);
    }; 