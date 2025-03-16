const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Demand = require('../models/demand.js');
const { isLoggedIn , isOwnerDemand , validateDemand } = require("../middleware.js");

const demandController = require("../controllers/demand.js");
const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(demandController.index))
    .post(isLoggedIn,upload.single("demand[image]"),validateDemand,wrapAsync(demandController.createListing));
    

//New Route
router.get("/new", isLoggedIn ,demandController.renderNewForm);
// router.get("/new", saveRedirectUrl, isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(demandController.showListing))
    .put(isLoggedIn, isOwnerDemand, upload.single("listing[image]") ,validateDemand,wrapAsync(demandController.updateListing))
    .delete(isLoggedIn,isOwnerDemand ,wrapAsync(demandController.destroyListing));



//Edit Route
router.get("/:id/edit", isLoggedIn,isOwnerDemand ,wrapAsync(demandController.renderEditForm));
// router.get("/:id/edit", saveRedirectUrl, isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;