var express = require("express");
const layout = require("express-ejs-layouts");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var flash = require("express-flash");
const fileUpload = require("express-fileupload");

app.use(layout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(flash());
app.use(cookieParser());
app.use(
  session({
    secret: "secREt$#code$%3245",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 120000000 },
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var tourRouter = require("./routes/tours");
var programRouter = require("./routes/program");
var appointRouter = require("./routes/appointTable");
var anotherRouter = require("./routes/another");
var reserveRouter = require("./routes/reserve");
var programTableRouter = require("./routes/programTable");
var tableRouter = require("./routes/tables");
var staffBookRouter = require("./routes/staff-book");
var tourDashRouter = require("./routes/tourDash");
var tourbookRouter = require("./routes/tour-book");
var tourProfileRouter = require("./routes/tourProfile");
var tourUserRouter = require("./routes/tourUsers");

app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/tours", tourRouter);
app.use("/program", programRouter);
app.use("/appointTable", appointRouter);
app.use("/another", anotherRouter);
app.use("/reserve", reserveRouter);
app.use("/programTable", programTableRouter);
app.use("/Table", tableRouter);
app.use("/staffbook", staffBookRouter);
app.use("/tourDash", tourDashRouter);
app.use("/tourbook", tourbookRouter);
app.use("/tourtable", tourProfileRouter);
app.use("/tourusers", tourUserRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to http://localhost:${port}`);
});
