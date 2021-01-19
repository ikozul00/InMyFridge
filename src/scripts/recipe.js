
let globalnaPrijavljen;

window.onload=function myRecipe(){
    xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            document.querySelector(".naziv").innerHTML=obj.naziv;
            document.querySelector(".sadrzaj").innerHTML=obj.sadrzaj;
            document.querySelector(".imeAutora").innerHTML=obj.autor;
            let sastojciContainer=document.querySelector(".sastojci");
            for(let i=0;i<obj.sastojci.length;i++){
                let sastojak=document.createElement("li");
                if(obj.jedinica[i]!==null){
                    sastojak.innerHTML=obj.kolicina[i]+" "+obj.jedinica[i]+" "+obj.sastojci[i];
                }
                else{
                    sastojak.innerHTML=obj.kolicina[i]+" "+obj.sastojci[i];
                }
                sastojciContainer.appendChild(sastojak);
            }
            let tagoviContainer=document.querySelector(".tagovi");
            for(let i=0;i<obj.tagovi.length;i++)
            {
                let tagTemplate=document.querySelector(".tag");
                let tag=document.importNode(tagTemplate.content,true);
                tag.querySelector("a").innerHTML=obj.tagovi[i];
                tagoviContainer.appendChild(tag);
            }
            if(obj.prijavljen){
                globalnaPrijavljen=true;
            }
            else{
                globalnaPrijavljen=false;
            }
            let heartIcon=document.querySelector(".heart-icon");
            heartIcon.addEventListener("click", handleHeartIconClick);
            if(obj.favorit){
                heartIcon.classList.remove("fa-heart-o");
                heartIcon.classList.add("fa-heart");
            }
            else{
                heartIcon.classList.remove("fa-heart");
                heartIcon.classList.add("fa-heart-o");
            }
        }
    };

    xhttp.open("GET","/recipe",true);
    xhttp.send();
}

function handleHeartIconClick(e){
    let heartIcon = e.currentTarget;
    let container=heartIcon.parentElement;
    let name=container.parentElement.querySelector(".naziv").innerHTML;
    if(globalnaPrijavljen){
        if(heartIcon.classList.contains("fa-heart-o")){
            let xhttp=new XMLHttpRequest();
             xhttp.onreadystatechange = function(){
                 if (this.readyState == 4 && this.status == 200){
                     var obj=JSON.parse(xhttp.responseText);
                    if(obj.loged){
                    heartIcon.classList.remove("fa-heart-o");
                    heartIcon.classList.add("fa-heart");
                    }
                    else{
                        alert("You have to be logged in to add recipe to favorites");
                    }
               }
            };
                xhttp.open("POST","/addFavourites",true);
                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhttp.send("name="+name);
        }
        else {
            let xhttp=new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    heartIcon.classList.remove("fa-heart");
                    heartIcon.classList.add("fa-heart-o");
                }
            };
                xhttp.open("POST","/removeFavourites",true);
                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhttp.send("name="+name);
        }
    }
    else{
        alert("You have to be logged in to add recipe to favorites");
    }
}

function rightPage(){
    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            console.log(obj.loged);
            if(obj.loged){
                window.location.href="../indexSignedIn.html";
            }
            else{
                window.location.href="../index.html"
            }
        }
    };
    xhttp.open("GET","/userLoged",true);
    xhttp.send();
}