var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/works", (req, res) => {
    res.render("love");
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Fara server has started"); 
});
