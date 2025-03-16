const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require('../models/listing.js'); 

const MONGO_URL = "mongodb://127.0.0.1:27017/agriculture";

main()
    .then(()=>{
        console.log("connect to DB");
    })
    .catch((err)=>{
        console.log(err)
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data =initData.data.map((obj) => ({...obj, owner: "6796844512a0237150a48ab3"}))
    await Listing.insertMany(initData.data); //initData apna aapp m object h hmm usma se key data utha raha h
    console.log("Data was initialized");
}
initDB();