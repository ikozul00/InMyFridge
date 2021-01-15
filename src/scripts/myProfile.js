

 window.onload=function myProfile(){
     xhttp=new XMLHttpRequest();
     xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            document.querySelector("#aboutMe .username").innerHTML=obj.username;
            document.querySelector("#aboutMe .email").innerHTML=obj.email;
            document.querySelector("#aboutMe .ime").innerHTML=obj.ime;
            document.querySelector("#aboutMe .surname").innerHTML=obj.prezime;
            for(let i=0;i<obj.recepti.length;i++){
                let receptTemplate=document.querySelector("#myRecipesTemplate");
                let recept=document.importNode(receptTemplate.content,true);
                recept.querySelector("a").innerHTML=obj.recepti[i];
                document.querySelector("#myRecipesTable").appendChild(recept);
            }
            for(let i=0;i<obj.omiljeni.length;i++){
                let favouriteTemplate=document.querySelector("#favouritesTemplate");
                let favourite=document.importNode(favouriteTemplate.content,true);
                favourite.querySelector("#link").innerHTML=obj.omiljeni[i];
                document.querySelector("#favouritesTable").appendChild(favourite);
            }
        }
    };
     xhttp.open("GET","/myProfile",true);
     xhttp.send();
     return false;
 }