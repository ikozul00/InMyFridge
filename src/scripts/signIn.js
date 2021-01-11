// ne koristi se
if (typeof (document) !== "undefined"){
     login=function login(){ 
          console.log("signIn.js");
          var xhttp = new XMLHttpRequest();  
          var username=document.forms["login"]["username"].value;
          var password=document.forms["login"]["password"].value;
          console.log(username);
          console.log(password);
          if (username == ""||password=="") {
               let paragraf=document.querySelector("#errorMessagee");
               paragraf.innerHTML='Please enter Username and Password!';
          }
          else{
               var text="username="+username+"&password="+password;
               xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        alert("Succsesful login");
                    }
                    else if(this.readyState == 4 && this.status == 404){
                         let paragraf=document.querySelector("#errorMessagee");
                         paragraf.innerHTML='Incorrect Username and/or Password!';
                    }
               };
                xhttp.open("POST", "/login", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(text);
          }
     }
}