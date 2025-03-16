const Demand = require("../models/demand.js");

module.exports.index = async (req,res)=>{
  const allDemands = await Demand.find({});
  res.render("demand/index.ejs", {allDemands});
};

module.exports.renderNewForm = (req,res) => { 
  res.render("demand/new.ejs"); 
};

module.exports.showListing = async (req,res) =>{
  let {id} = req.params;
  const listing = await Demand.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
  // console.log("Listing Data:", listing);
  // console.log("Reviews:", listing.reviews);
  res.render("demand/show.ejs", {listing});  
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
    let filename = req.file.filename;
    const newDemand = new Demand(req.body.demand); // Use req.body.demand here
    newDemand.owner = req.user._id;
    newDemand.image = { url , filename };
    await newDemand.save();
    req.flash("success", "New Post Added");
    res.redirect("/listings/demand");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Demand.findById(id);
  res.render("demand/edit.ejs", { listing, }); 
};

module.exports.updateListing = async (req, res) => {

  const { id } = req.params;
  let updatedListing = await Demand.findByIdAndUpdate(id, { ...req.body.demand }, { new: true });

  if (req.file) {
      // Handle file upload (if any)
      let url = req.file.path;
      let filename = req.file.filename;
      updatedListing.image = { url, filename }; // Update image in the DB
      await updatedListing.save();
  }

  if (!updatedListing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
  }

  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/demand/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
  let { id } = req.params;
  let deleteListing = await Demand.findByIdAndDelete(id);
  // console.log(deleteListing);
  req.flash("success","Post Deleted");
  res.redirect("/listings/demand");
  };