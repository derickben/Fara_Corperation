var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    xoauth2 = require("xoauth2"),
    Swal = require('sweetalert2'),
    nodemailer = require("nodemailer");

var htmlToText = require('nodemailer-html-to-text').htmlToText;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));

app.get("/", (req, res) => {
    res.render("index");
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        type: 'error',
        confirmButtonText: 'Cool'
      });
});


app.get("/love", (req, res) => {
    res.render("love");
});

app.get("/form", (req, res) => { 
    //var message = "successful";
    res.render("contact");
});

app.post("/send", (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</P>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                type: "OAuth2",
                user: "benedictuyioghosa@gmail.com",
                clientId: "88410084868-nsnvcot7clr3c4sup5ob788uh111fv1o.apps.googleusercontent.com",
                clientSecret: "f3a4wCe_iT-kSBNGUPCMUBtw",
                refreshToken: "1/M7Ot02cMeiLqbIV_RxCommtViL2b1jdMg1f1zj3JK9M",
                accessToken: "ya29.GlvpBu7eY24gvywD8OFrX3duoYwZK9N3jXXsPeLZ-cVOQkJN6GKV5LxPOPV0m5darcBosM3NKNq0-3FUTH6IgsExc-mLBk0xonSiMxN86apgUPPxTYJU7uTmmJT8"
        }
    });
    transporter.use('compile', htmlToText());
    
    var mailOptions = {
        from: "Uyi <benedictuyioghosa@gmail.com>",
        to: "benedictuyioghosa@yahoo.com",
        subject: "Nodemailer",
        text: output
    };
    
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
        } else{
            console.log("Email sent");
        }
    });
    res.render("contact", {message });
});


app.listen(process.env.PORT || 5000, () => {
    console.log("Fara server has started"); 
});
