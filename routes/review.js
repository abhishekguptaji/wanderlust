const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing =require("../models/listing.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewControllers = require("../controllers/review.js")

const validateReview = (req,res,next) =>{
  let {error} = reviewSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   } else{
    next();
   } 
};

// Reviews -->Post Route
router.post("/",isLoggedIn,validateReview,
  wrapAsync(reviewControllers.createReview));

// Reviews -->Delete Route
router.delete("/:reviewId",isLoggedIn,
  isReviewAuthor,wrapAsync(reviewControllers.deleteReview));

module.exports = router;