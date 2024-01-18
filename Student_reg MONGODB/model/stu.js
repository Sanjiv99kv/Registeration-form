const mongoose = require("mongoose");
const validator = require("validator");

const stu_schema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error("enter valid email");
            }
        }
    },
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    cpass: {
        type: String,
        required: true
    }
});

const student = new mongoose.model("student",stu_schema);

module.exports = student;