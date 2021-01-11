let link=document.querySelector("a #signIn");
link.addEventListener("click",()=>{
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/login", true);
    xhttp.send();
})