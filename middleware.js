const Listing = require("./models/listing.js");
const Demand = require("./models/demand.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema, demandSchema } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create Post!!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwnerDemand = async(req,res,next) =>{
    const { id } = req.params;
    let listing = await Demand.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){ // give the permission only those who can create the post
        req.flash("error","You don't have the permission to edit");
        return res.redirect(`/listings/demand/${id}`)
    }
    next();
};


module.exports.validateDemand = (req, res, next) => {
    const { error } = demandSchema.validate({ demand: req.body.demand }); 
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isOwnerListing = async(req,res,next) =>{
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){ // give the permission only those who can create the post
        req.flash("error","You don't have the permission to edit");
        return res.redirect(`/listings/${id}`)
    }
    next();
};
module.exports.validateListing = (req, res, next) => {
    // Joi method, now accessing req.body.listing
    const { error } = listingSchema.validate({ listing: req.body.listing });
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
module.exports.validateReview = (req,res,next) =>{
    //Joi method
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async(req,res,next) =>{
    const { reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){ // give the permission only those who can create the post
        req.flash("error","You don't have the permission to edit review");
        return res.redirect(`/listings/${reviewId}`)
    }
    next();
};