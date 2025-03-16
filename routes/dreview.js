const express = require("express");
const router = express.Router({mergeParams: true});// mergeparams ka meaning h ki parent se id ko proper fetch kara kyoki hmmna /listings/:id/reviews parent m define ki h or ya id ko fetch kara ga
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Demand = require("../models/demand.js")
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// POST route for creating a new review for a specific listing
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.demandcreateReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.demandDestroyReview));

module.exports = router;  