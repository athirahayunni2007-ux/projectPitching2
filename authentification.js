console.log("File js sudah berjaya dimuatkan");

function showPassword(){

    let passwordInput =document.getElementById("password");

    let checkbox = document.getElementById("showPassword")

    if (checkbox.checked){
        passwordInput.type = "text"
    }
    else{
        passwordInput.type = "password";
    }
}
function signUp() {

    let nameInput = document.getElementById("name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let passwordInput = document.getElementById("password").value.trim();

    //if user enter 0
    if (nameInput === "" || emailInput === "" || passwordInput === "") {
        alert("Please fill in all the details before signing up!");
        return;
    }

   // user enter password lenght less than required
    if (passwordInput.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;

    //take data from local storage
    let userList = JSON.parse(localStorage.getItem("allUsers")) || [];


    let newUsers = {
        name: document.getElementById("name").value,
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    }

    userList.push (newUsers);

    localStorage.setItem("allUsers", JSON.stringify(userList));
    localStorage.setItem("activeUser", newUsers.name);

    console.log ("Updated list:",userList);
    alert("Successfully sign up!");

    window.location.href ="screening.html";
}  }

function login() {
    
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;

    let userList = JSON.parse(localStorage.getItem("allUsers")) || [];

    let foundUser = userList.find(user => user.email === loginEmail);

    if (!foundUser) {
        alert("Account not found. Please sign up first!");
        window.location.href = "signup.html"; // Terus hantar dia ke page sign up
    } 

    else if (foundUser.password === loginPassword) {
        localStorage.setItem("activeUser", foundUser.name);
        
        alert("Login successfully!");
        window.location.href = "dashboard.html";
    } 

    else {
        alert("Wrong password. Please try again.");
    }
}