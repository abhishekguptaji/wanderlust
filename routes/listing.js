const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema} = require("../schema.js");

const ExpressError = require("../utils/ExpressError.js");
const{isLoggedIn} = require("../middleware.js"); 

const listingController = require("../controllers/listings.js");

const  validateListing = (req,res,next) =>{
  let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else{
    next();
   }
}



// Index Route...
router.get("/",wrapAsync(listingController.index));

// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// Show Route...
router.get("/:id",wrapAsync(listingController.showListing));

// Create Route
router.post("/",validateListing,
  isLoggedIn,wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));

//update route.
router.put("/:id",validateListing,isLoggedIn,
  wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,wrapAsync(listingController.deleteListing));

module.exports =router;