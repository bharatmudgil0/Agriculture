const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');
const { isLoggedIn , isOwnerListing , validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,upload.single("listing[image]") ,validateListing,wrapAsync(listingController.createListing));
    

//New Route
router.get("/new", isLoggedIn ,listingController.renderNewForm);
// router.get("/new", saveRedirectUrl, isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwnerListing, upload.single("listing[image]") ,validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwnerListing ,wrapAsync(listingController.destroyListing));



//Edit Route
router.get("/:id/edit", isLoggedIn,isOwnerListing ,wrapAsync(listingController.renderEditForm));
// router.get("/:id/edit", saveRedirectUrl, isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;