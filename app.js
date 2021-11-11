var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
import routes from "./routes/routes";
// Gives us access to variables set in the .env file
// Middleware for request authentication.

var app = express();
const mongoose = require("mongoose");
// Set up mongoose connection
let dev_db_url = 'mongodb+srv://dbBasma:@basma123@dbpmo.fb9qa.mongodb.net/dbPmo?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(
	mongoDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.log("Error during mongoose connection: " + err);
    else {
      console.log("Successful mongoose connection.");
    }
  }
);

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/uploads")));
app.use("/uploads/", express.static("uploads"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// We plugin our jwt strategy as a middleware so only verified users can access specified routes
routes(app);
module.exports = app;
