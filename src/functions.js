if (typeof (document) !== "undefined"){
    let clickableButton=document.querySelector("#a");
    clickableButton.addEventListener("click",loadDoc);

    function loadDoc(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj=JSON.parse(this.responseText);
                document.getElementById("demo").innerHTML = obj.ime+" "+obj.prezime+"<br/>"+"email: "+obj.email+"<br/>"+"username: "+obj.username;
            }
        };
        xhttp.open("GET", "/change", true);
        xhttp.send();
    }
}