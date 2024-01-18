function check() {
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let age = document.getElementById("age");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let pass = document.getElementById("pass");
    let cpass = document.getElementById("cpass");

    if (fname.value == "" || fname.value == null) {
        alert("Enter the first name");
    }
    else if (email.value == "") {
        alert("Enter the email adress");
    }
    else if (!(email.value.includes("@gmail.com"))) {
        alert("Enter valid email adress");
    }
    else if (phone.value == "") {
        alert("Enter the phone number");
    }
    else if (phone.value.length > 10) {
        alert("Enter a valid phone number");
    }
    else if(age.value<0){
        alert("Enter a valid age");
    }
    else if (pass.value.length < 8) {
        alert("Password should be at least 8 characters long")
    }
    else if (pass.value != cpass.value) {
        alert("Confirm password not matching");
    }
    else {
        document.write("Registeration completed successfully");
    }

}




