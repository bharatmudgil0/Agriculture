if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const multer = require("multer")
const {storage} = require("./cloudConfig.js")
const upload = multer({ storage });

const listingRoute = require("./routes/listing.js");
const demandRoute = require("./routes/demand.js");
const demandReview = require("./routes/dreview.js")
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const Demand = require("./models/demand.js");

  


// const MONGO_URL = "mongodb://127.0.0.1:27017/agriculture";
const dbUrl = process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connect to DB");
}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET_KEY
    },
    touchAfter: 24* 3600,
});

store.on("error",()=>{
    console.log("Error in the MONGO SESSION STORE",err); 
})

const sessionOptions = {
    store,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 *24 * 60 * 60 * 1000,
        maxAge: 7 *24 * 60 * 60 * 1000,
        httpOnly: true, // This is used for security purpose form CSS request..
    }
};





app.use(session(sessionOptions));
app.use(flash()); //Always define before the routes

//Below commands for user authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/listings/weather",(req,res)=>{
    res.render("./weather/index.ejs",{ apiKey: process.env.WEATHER_API_KEY });
})

//This is for the demand side listings
app.use("/listings/demand",demandRoute);
app.use("/listings/demand/:id/reviews",demandReview);


//This is for the listings
app.use("/listings",listingRoute);
//Review Routes
app.use("/listings/:id/reviews",reviewRoute);

app.use("/",userRoute);

app.all(("*"),(req,res,next) =>{ //It is used for the all other routes or page which we not define
    next(new ExpressError(404,"Page not found!!"));
});    

app.use((err,req,res,next) =>{
    let {statusCode = 500,message = "Something went wrong!"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{ err });
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})