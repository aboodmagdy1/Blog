const exp = require("constants");
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser')
const app = express();
const connectDB = require("./server/config/database");
const isActiveRoute = require('./server/helpers/routeHelpers')
const port = process.env.PORT || 3000;

//connnect to database
connectDB();

//to can read data from body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))


app.use(express.static("public")); //static files

//templateing engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", "./views");

app.locals.isActiveRoute = isActiveRoute

//routes
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(port, () => {
  console.log(`Server is running on port ${port} ....`);
});
