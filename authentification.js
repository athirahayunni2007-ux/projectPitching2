console.log("File js sudah berjaya dimuatkan");

function showPassword(){
    let passwordInput = document.getElementById("password");
    let checkbox = document.getElementById("showPassword");

    if (checkbox.checked){
        passwordInput.type = "text"; //change password datatype to text datatype
    }
    else{
        passwordInput.type = "password"; //if not check, then datatype will be password datatype
    }
}

function signUp() {

    //get value from user input
    let nameInput = document.getElementById("name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let passwordInput = document.getElementById("password").value.trim();

    if (nameInput === "" || emailInput === "" || passwordInput === "") {    //user does not enter anything
        alert("Please fill in all the details before signing up!");
        return;
    }

    if (passwordInput.length < 6) {     //if password lenght less than 6
        alert("Password must be at least 6 characters long!");
        return;
    }

    let userList = JSON.parse(localStorage.getItem("allUsers")) || []; //get initial data from local storage

    let newUsers = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
    };

    userList.push(newUsers); //add the new data

    localStorage.setItem("allUsers", JSON.stringify(userList));     //keep the updated data in the local storage 
    localStorage.setItem("activeUser", newUsers.name);  //keept the user name, to display in dashboard

    console.log("Updated list:", userList);     //
    alert("Successfully sign up!");

    window.location.href = "screening.html";    //direct to screening test
}

function login() {
    //get value from user input
    let loginEmail = document.getElementById("email").value.trim(); 
    let loginPassword = document.getElementById("password").value.trim();

    if (loginEmail === "" || loginPassword === "") {    //user does not enter anything
        alert("Please enter both your email and password to log in!");
        return; 
    }

    let userList = JSON.parse(localStorage.getItem("allUsers")) || []; //get data of user from local storage

    let foundUser = userList.find(user => user.email === loginEmail); //compare email entered and email from the local storage

    if (!foundUser) {   //email not found
        alert("Account not found. Please sign up first!");
        window.location.href = "signup.html"; //direct to signup
    } 
    else if (foundUser.password === loginPassword) {    //compare password entered and password from local storage
        localStorage.setItem("activeUser", foundUser.name);     //keep user name as active user to display the name on dashboard
        alert("Login successfully!");
        window.location.href = "dashboard.html";
    } 
    else {
        alert("Wrong password. Please try again.");
    }
}