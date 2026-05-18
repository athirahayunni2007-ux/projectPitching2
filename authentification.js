console.log("File js sudah berjaya dimuatkan");

function showPassword(){
    let passwordInput = document.getElementById("password");
    let checkbox = document.getElementById("showPassword");

    if (checkbox.checked){
        passwordInput.type = "text";
    }
    else{
        passwordInput.type = "password";
    }
}

function signUp() {
    let nameInput = document.getElementById("name").value.trim();
    let emailInput = document.getElementById("email").value.trim();
    let passwordInput = document.getElementById("password").value.trim();

    // 1. Sekat jika ada kotak kosong
    if (nameInput === "" || emailInput === "" || passwordInput === "") {
        alert("Please fill in all the details before signing up!");
        return;
    }

    // 2. Sekat jika password kurang 6 aksara
    if (passwordInput.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    // 3. Simpan data (Gunakan pembolehubah yang telah di-trim tadi)
    let userList = JSON.parse(localStorage.getItem("allUsers")) || [];

    let newUsers = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
    };

    userList.push(newUsers);

    localStorage.setItem("allUsers", JSON.stringify(userList));
    localStorage.setItem("activeUser", newUsers.name);

    console.log("Updated list:", userList);
    alert("Successfully sign up!");

    window.location.href = "screening.html";
}

function login() {
    // 1. Ambil nilai input dan buang ruang kosong (.trim())
    let loginEmail = document.getElementById("email").value.trim();
    let loginPassword = document.getElementById("password").value.trim();

    // 2. [PART BARU] Sekat jika user tidak isi langsung kotak email atau password
    if (loginEmail === "" || loginPassword === "") {
        alert("Please enter both your email and password to log in!");
        return; // Hentikan fungsi serta-merta, tak sempat check login
    }

    let userList = JSON.parse(localStorage.getItem("allUsers")) || [];
    let foundUser = userList.find(user => user.email === loginEmail);

    if (!foundUser) {
        alert("Account not found. Please sign up first!");
        window.location.href = "signup.html"; 
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