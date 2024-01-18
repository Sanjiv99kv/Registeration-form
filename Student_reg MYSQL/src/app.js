const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.port || 8000;
const hbs = require("hbs");
var conn = require("../db/conn");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.set("view engine", "hbs");
app.set("views", "C:/Users/vishw/Desktop/FULL STACK/expressjs/stu_reg_sql/tempelate/views");
hbs.registerPartials("C:/Users/vishw/Desktop/FULL STACK/expressjs/stu_reg_sql/tempelate/partials")

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/submit", async (req, res) => {
    console.log(req.body);
    let password = req.body.pass;
    let cpassword = req.body.cpass;
    try {
        if (password === cpassword) {
            var sql = "insert into student_info values(?,?,?,?,?,?,?,?)";
            conn.query(sql, [req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.age, req.body.gender, req.body.pass, req.body.cpass], (err) => {
                if (!err) {
                    console.log("inserted");
                }
                else {
                    console.log(err);
                }
            })
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
        const err = await error.errors;
        res.send(err);
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {
        let emailid = req.body.email;
        let passgiven = req.body.password;
        var sql = "select * from student_info where email = ?";
        conn.query(sql, [req.body.email], async (err, result) => {
            let data = await result;
            if (data.length) {
                if (passgiven === data[0].pass) {
                    res.render("home", {
                        name: data[0].fname
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

        })
    }
    catch (error) {
        res.status(401).send(error);
    }
})

app.get("/submit", async (req, res) => {
    var sql = "select * from student_info";
    conn.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
        }
    })
})

app.get("/update", (req, res) => {
    res.render("update");
})

app.post("/update", async (req, res) => {
    console.log(req.body);
    var sql = "select * from student_info where email = ?";
    conn.query(sql, [req.body.email], (err, result) => {
        var data = result;
        if (data.length) {
            var sql = "update student_info set pass = ?,cpass=? where email = ?";
            conn.query(sql, [req.body.pass, req.body.pass, req.body.email], (err) => {
                if (!err) {
                    console.log('updated');
                }
                else {
                    console.log(err);
                }
            })
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


})

app.get("/delete", (req, res) => {
    res.render("delete");
})

app.post("/delete", async (req, res) => {
    let password;
    var sql = `select pass from student_info where email = ?`;
    console.log(req.body.email);
    conn.query(sql, [req.body.email], async (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (result.length === 0) {
            res.status(404).render("pop1", {
                msg: "Email not found",
            });
            return;
        }

        password = await result[0].pass;
        if (req.body.pass == password) {
            var sql = `delete from student_info where email = ?`;
            conn.query(sql, [req.body.email], (err) => {
                if (!err) {
                    console.log("deleted");
                } else {
                    console.log(err);
                }
            });
            res.status(201).render("pop1", {
                msg: "Successfully deleted the account",
            });
        }
        else {
            res.status(401).render("pop1", {
                msg: "Wrong details",
            });
        }
    });
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})