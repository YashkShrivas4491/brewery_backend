
const mongoose = require("mongoose");





const { Schema } = mongoose;

const reviewSchema = new Schema({
  breweryId: { type: String, required: true },
  breweryName: { type: String, required: true },
  stars: { type: Number, required: true },
  email: { type: String, required: true },
  reviewComment: { type: String, required: true },
});


const BreweryReview = mongoose.model("BreweryReview", reviewSchema);

module.exports = BreweryReview;