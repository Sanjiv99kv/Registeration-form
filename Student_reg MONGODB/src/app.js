const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const hbs = require("hbs");
require("../db/conn");
const student = require("../model/stu");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "hbs");
app.set("views", "C:/Users/vishw/Desktop/FULL STACK/expressjs/student_registeration/tempelate/views");
hbs.registerPartials("C:/Users/vishw/Desktop/FULL STACK/expressjs/student_registeration/tempelate/partials")

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/submit", async (req, res) => {
    let password = req.body.pass;
    let cpassword = req.body.cpass;
    try {
        if (password === cpassword) {
            let stu = new student({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                age: req.body.age,
                gender: req.body.gender,
                pass: req.body.pass,
                cpass: req.body.cpass
            })
            let result = await stu.save();
            res.status(201).render("pop", {
                msg: "Registeration completed successfully"
            });
        }
        else {
            res.status(404).render("pop", {
                msg: "Password and confirm password not matching"
            });
        }
    } catch (error) {
        console.error(error); // log the error to the console for debugging
        res.status(500).render("pop", {
            msg: "An error occurred while registering. Please try again."
        });
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {
        let emailid = req.body.email;
        let passgiven = req.body.password;
        let data = await student.find({ email: emailid });
        if (data.length) {
            if (passgiven === data[0].pass) {
                res.render("home", {
                    name: data[0].first_name
                });
            }
            else {
                res.status(401).render("pop1", {
                    msg: "Wrong password"
                });
            }
        }
        else {
            res.status(401).render("pop1", {
                msg: "User not found"
            });
        }
    } catch (error) {
        res.status(401).send(error);
    }
})

app.get("/submit", async (req, res) => {
    const result = await student.find({}, { _id: 0 });
    res.send(result);
})

app.get("/update", (req, res) => {
    res.render("update");
})

app.post("/update", async (req, res) => {
    console.log(req.body);
    var data = await student.find({ email: req.body.email });
    if (data.length) {
        var result = await student.updateOne({ email: req.body.email }, { $set: { pass: req.body.pass, cpass: req.body.pass } });
        res.status(401).render("pop1", {
            msg: "Updated successfully"
        })
    }
    else {
        res.status(401).render("pop1", {
            msg: "User not found"
        })
    }

})

app.get("/delete", (req, res) => {
    res.render("delete");
})

app.post("/delete", async (req, res) => {
    var pass = await student.find({ email: req.body.email }, { pass: 1, _id: 0 });
    if (req.body.pass == pass[0].pass) {
        const result = await student.deleteOne({ email: req.body.email });
        res.status(201).render("pop1", {
            msg: "Successfully deleted the account"
        })
    }
    else {
        res.status(401).render("pop1", {
            msg: "Wrong details"
        })
    }
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})