var reg_users = [];
addAdminUser();
function addAdminUser(){
    reg_users.push({username:"a",password:"a",firstname: "b", lastname: "c", email: "a@a.a", birthdate: "17-05-1993"});
}

function saveUser(register_form){
    var user_name = register_form[0].value;
    var password = register_form[1].value;
    var first_name = register_form[2].value;
    var last_name = register_form[3].value;
    var email = register_form[4].value;
    var birthdate = register_form[5].value;
    reg_users.push({username:user_name,password:password,firstname: first_name, lastname: last_name, email: email, birthdate: birthdate});
    alert("Registered Succesfully");
}

function logIn(){
    var username = document.getElementById("username_login").value;
    var password = document.getElementById("password_login").value;
    for (let i = 0; i < reg_users.length; i++) {
        var user = reg_users[i];
        if (user.username == username && user.password == password) {
            alert("login successful");
            showLoggedUser(username,true);
            goTo("settings");
            return;
        }
    }
    alert("Wrong username or password")
}

function showLoggedUser(name, isLogged){
    var logged = document.getElementById("logged_user");
    logged.innerText=logged.innerText.concat(" " ,name);
    if(isLogged)
        logged.hidden=false;
    else
        logged.hidden=true;
}