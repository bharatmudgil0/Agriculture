const Listing = require("../models/listing.js")


module.exports.index = async (req,res) =>{
    const allListings = await Listing.find({}); // It find all the post of the user
    res.render("listings/index.ejs",{ allListings });
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params; //I t can fetch the ID of the user
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");

    if (!listing) {
        req.flash("error", "Post you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing }); // Ensure you're passing `listing` here
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing); // Use req.body.listing here
    newListing.owner = req.user._id;
    newListing.image = { url , filename };
    await newListing.save();
    req.flash("success", "New Post Added");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    // let originalImageUrl = listing.image.url;
    // originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");  
    res.render("listings/edit.ejs", { listing, });  // Ensure you're passing `listing` to the view
};
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing} ); //req.body.listing, { new: true }
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = { url , filename };
    await updatedListing.save();
    }
    if (!updatedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    // console.log(deleteListing);
    req.flash("success","Post Deleted");
    res.redirect("/listings");
    };