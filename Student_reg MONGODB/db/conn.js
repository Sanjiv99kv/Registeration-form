const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/student_reg").then(()=>{
    console.log('Connected to MongoDB');
})
.catch((e)=>{
    console.error(e);
});