const {ref} = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const demandSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    quantity: Number,

    price: Number, 
    state: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});
// The post middleware is used for delete the reviews when the listing is delete automatically
demandSchema.post("findOneAndDelete",async(demand) =>{
    if(demand){
        await Review.deleteMany({_id : {$in : demand.reviews}})
    }
})

const Demand = mongoose.model("Demand",demandSchema);
module.exports = Demand;