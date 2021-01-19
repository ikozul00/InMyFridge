

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
               let link=recept.querySelector("a");
               link.innerHTML=obj.recepti[i];
               link.addEventListener("click",handleLinkClick);
               recept.querySelector(".btnDelete").addEventListener("click",handleDeleteButtonClick);
               document.querySelector("#myRecipesTable").appendChild(recept);
           }
           for(let i=0;i<obj.omiljeni.length;i++){
               let favouriteTemplate=document.querySelector("#favouritesTemplate");
               let favourite=document.importNode(favouriteTemplate.content,true);
               let link=favourite.querySelector("#link");
               link.innerHTML=obj.omiljeni[i];
               link.addEventListener("click",handleLinkClick);
               favourite.querySelector(".heart-icon").addEventListener("click",handleHeartIconClick);
               document.querySelector("#favouritesTable").appendChild(favourite);
           }
       }
   };
    xhttp.open("GET","/myProfile",true);
    xhttp.send();
    return false;
}

function logOut(){
   xhttp=new XMLHttpRequest();
   xhttp.open("GET","/logOut",true);
   xhttp.send();
   return false;
}

let heartIcon = document.querySelectorAll("#favourites .heart-icon");
   for(let icon of heartIcon) {
       icon.addEventListener("click", handleHeartIconClick);
   }

   function handleHeartIconClick(e){
       let heartIcon = e.currentTarget;
       let name=heartIcon.parentElement.querySelector("#link").innerHTML;
       if(heartIcon.classList.contains("fa-heart-o")){
           xhttp=new XMLHttpRequest();
           if (this.readyState == 4 && this.status == 200){
               heartIcon.classList.remove("fa-heart-o");
               heartIcon.classList.add("fa-heart");
           }
           xhttp.open("POST","/addFavourites",true);
           xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
           xhttp.send("name="+name);

       }
       else {
           xhttp=new XMLHttpRequest();
               heartIcon.classList.remove("fa-heart");
               heartIcon.classList.add("fa-heart-o");
           xhttp.open("POST","/removeFavourites",true);
           xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
           xhttp.send("name="+name);
       }
   }

   let deleteButtons=document.querySelectorAll(".buttons .btnDelete");
   for(let button of deleteButtons){
       button.addEventListener("click",handleDeleteButtonClick);
   }
   function handleDeleteButtonClick(e){
       let button=e.currentTarget;
       let buttons=button.parentElement;
       let name=buttons.parentElement.querySelector("#link").innerHTML;
       if(confirm(`Are you sure you want to delete recipe '${name}'?`))
       {
           xhttp=new XMLHttpRequest();
           xhttp.open("POST","/removeRecipe",true);
           xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
           xhttp.send("name="+name);
       }
   }

//dohvaća ime recepta
function handleLinkClick(e){
   console.log("pozvala se");
   let name=e.currentTarget.innerHTML;
   console.log(name);
   let xhttp=new XMLHttpRequest();
   xhttp.open("POST","/recipeName",true);
   xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhttp.send("name="+name);
   return true;
}