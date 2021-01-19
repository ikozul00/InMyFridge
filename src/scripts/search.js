var searchButton = document.getElementById("submit");
var myInput = document.getElementById("myInput");
var searchChoice = document.querySelectorAll(".dropdown-content a");
var searchChoiceButton =document.getElementById("search-choice-button");
var selectedSearchChoice;
var recipesTable = document.querySelector("#RecipesTable");
var tags = document.querySelectorAll(".filterDiv"); //Tu spremimo sve tagove
var selectedTags=[];        //Ovdje spremamo sve selektane tagove
var timeTags = document.querySelectorAll(".btnTime");   //Svi vremenski tagovi
var selectedTimeTag = null; //Odabrani vremenski tag

//Dodajmo event listener na sve tagove
for(let tag of tags){
    tag.addEventListener("click", handleTagClick);
}

//Dodajmo event listener na svaki vremenski tag
for(let tag of timeTags){
    tag.addEventListener("click", handleTimeTagClick);
}


//Odabir vrste pretrage u drop-down menuu
for(let choice of searchChoice){
    choice.addEventListener("click", handleSearchChoiceClick);
}
function handleSearchChoiceClick(e){
    searchChoiceButton.innerHTML = e.target.innerHTML;
    selectedSearchChoice = e.target;
}

//Dodan event listener na button "Search"
searchButton.addEventListener("click", handleSearchButtonClick);
function handleSearchButtonClick(event){

event.preventDefault(); //Ovo sprječava refreshanje stranice nakon klika na button
while (recipesTable.firstChild) {                   //Brisemo odgovore na proslu pretragu
    recipesTable.removeChild(recipesTable.firstChild);
}

if(myInput.value == ""){
    alert("Unesite vrijednost u polje pretrage!");  //Provjeri je li ista uneseno u polje pretrage
    return;
}
if(searchChoiceButton.innerHTML=="Izaberi pretraživanje"){      //Provjeri je li odabrana vrsta pretrage
    alert("Odaberite vrstu pretrage!");
    return;
}

//Kada korisnik klikne search, neka se deselectaju svi tagovi
//Ako je odabbran neki time tag i njega deseelctaj
for(let i=selectedTags.length-1; i>=0; i--){ 
    selectedTags[i].classList.remove("selected-tag");
    selectedTags[i].style.backgroundColor="#d4616d";
    selectedTags.pop();
}
if(selectedTimeTag != null){
    selectedTimeTag.style.backgroundColor="#5ca852"
    selectedTimeTag = null;
}

var inputValue = myInput.value;

//Odabrana pretraga po autoru
if(selectedSearchChoice == document.getElementById("option-author")){   
    xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            console.log(obj);

            for(let i=0;i<obj.length;i++){
                let receptTemplate=document.querySelector("#RecipesTemplate");
                let recept=document.importNode(receptTemplate.content,true);
                recept.querySelector("a").innerHTML=obj[i].naziv;
                document.querySelector("#RecipesTable").appendChild(recept);
            }
            if(obj.length == 0){
                let receptTemplate=document.querySelector("#RecipesTemplate");
                let recept=document.importNode(receptTemplate.content,true);
                recept.querySelector("a").innerHTML="Nema recepata koji odgovaraju upitu!";
                document.querySelector("#RecipesTable").appendChild(recept);
            }
        }
    };

    var postRequest = "username=" + inputValue; 
     xhttp.open("POST","/searchByAuthor",true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send(postRequest);
     
     return false;
}

//Odabrana pretraga po nazivu recepta
if(selectedSearchChoice == document.getElementById("option-recipe")){   
    xhttp=new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            console.log(obj);

            for(let i=0;i<obj.length;i++){
                let receptTemplate=document.querySelector("#RecipesTemplate");
                let recept=document.importNode(receptTemplate.content,true);
                let link=recept.querySelector("a");
                link.innerHTML=obj[i].naziv;
                link.addEventListener("click",handleLinkClick);
                document.querySelector("#RecipesTable").appendChild(recept);
            }
            if(obj.length == 0){
                let receptTemplate=document.querySelector("#RecipesTemplate");
                let recept=document.importNode(receptTemplate.content,true);
                recept.querySelector("a").innerHTML="Nema recepata koji odgovaraju upitu!";
                document.querySelector("#RecipesTable").appendChild(recept);
            }
        }
    };

    var postRequest = "name=" + inputValue; 
     xhttp.open("POST","/searchByRecipe",true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send(postRequest);
     
     return false;
}

}

//Za tagove namjestimo da su zeleni ako su kliknuti
//Upozorenje ako je selectano više od pet tagova
//Ako se drugi put klikne na tag, unselecta se
function handleTagClick(e){

    let clickedTag = e.currentTarget;

    if(clickedTag.classList.contains("selected-tag")){  //Ako je taj tag već selectan

        clickedTag.classList.remove("selected-tag");
        clickedTag.style.backgroundColor="#d4616d";
        for(let i=0; i<selectedTags.length; i++){
            if(clickedTag == selectedTags[i]){      //izbirši taj tag iz niza selectanih
                selectedTags.splice(i, 1);      
                break;
            }
        }
    }
    
    else if(selectedTags.length==5){
        alert("Ne možete odabrati više od 5 tagova!");
        return;
    }

    //Ako već nije selectan i nije odabrano više od 5 tagova
    else{
        clickedTag.style.backgroundColor="green";
        clickedTag.classList.add("selected-tag");
        selectedTags.push(clickedTag);
    }

    return false;
}

//Event listener za vremenske tagove
function handleTimeTagClick(event){
    let clickedTag = event.currentTarget;

    if(clickedTag === selectedTimeTag){ //dvaput klikli na isti tag
        selectedTimeTag = null;
        clickedTag.style.backgroundColor="#5ca852";
    }
    else if(selectedTimeTag === null){  // dosad nije ništa bilo selectano
        selectedTimeTag = clickedTag;
        selectedTimeTag.style.backgroundColor = "#6495ED";
    }
    else{       //neki drugi tag je bio selectan
        selectedTimeTag.style.backgroundColor="#5ca852"
        selectedTimeTag = clickedTag;
        selectedTimeTag.style.backgroundColor = "#6495ED";
    }
    return false;
}

//Funkcija pridružuje vrijednost u minutama za vremenske tagove
function hoursToMinutes(){
    
    let timeString="";
    if(selectedTimeTag === null) timeString="0";
    else if(selectedTimeTag.innerHTML == "15 min") timeString="15";
    else if(selectedTimeTag.innerHTML == "30 min") timeString="30";
    else if(selectedTimeTag.innerHTML == "45 min") timeString="45";
    else if(selectedTimeTag.innerHTML == "1 h") timeString="60";
    else if(selectedTimeTag.innerHTML == "1 h i 30 min") timeString="90";
    else if(selectedTimeTag.innerHTML == "2 h") timeString="120";
    else if(selectedTimeTag.innerHTML == "3 h") timeString="180";
    else timeString="210";

    return timeString;
}

//Dodajmo event listener na Start Search Button
//Dvije opcije:
//Pretraga samo po tagovima ili i po vremenu i po tagovima
let startSearchButton = document.getElementById("btn-start-search");
startSearchButton.addEventListener("click", handleStartSearchButtonClick);

function handleStartSearchButtonClick(event){


    event.preventDefault(); //Ovo sprječava refreshanje stranice nakon klika na button
    while (recipesTable.firstChild) {                   //Brisemo odgovore na proslu pretragu
        recipesTable.removeChild(recipesTable.firstChild);
    }

    myInput.value=""; //Kada tražimo po tagovima, neka je search bar prazan

    //1. slučaj - nije selectan time tag
    if(selectedTimeTag === null){
        xhttp=new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200){
                var obj=JSON.parse(this.responseText);
                console.log(obj);

                for(let i=0;i<obj.length;i++){
                    let receptTemplate=document.querySelector("#RecipesTemplate");
                    let recept=document.importNode(receptTemplate.content,true);
                    let link=recept.querySelector("a");
                    link.innerHTML=obj[i].naziv;
                    link.addEventListener("click",handleLinkClick);
                    document.querySelector("#RecipesTable").appendChild(recept);
                }
                if(obj.length == 0){
                    let receptTemplate=document.querySelector("#RecipesTemplate");
                    let recept=document.importNode(receptTemplate.content,true);
                    recept.querySelector("a").innerHTML="Nema recepata koji odgovaraju upitu!";
                    document.querySelector("#RecipesTable").appendChild(recept);
                }
            }
        };

        var postRequest="";
        for(let i=0; i<5; i++){
            if(i<selectedTags.length){
            postRequest+="tag"+i+"="+selectedTags[i].innerHTML;
            }
            else{
            postRequest+="tag"+i+"=empty";
            }
            if(i!=4){
                postRequest+="&";
            }
            console.log(postRequest);
        }
        
        xhttp.open("POST","/searchByTags",true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(postRequest);

        return false;
    }
    //2. slučaj - odabrano je neko vrijeme pripreme
    else{
        xhttp=new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200){
                var obj=JSON.parse(this.responseText);
                console.log(obj);

                for(let i=0;i<obj.length;i++){
                    let receptTemplate=document.querySelector("#RecipesTemplate");
                    let recept=document.importNode(receptTemplate.content,true);
                    let link=recept.querySelector("a");
                    link.innerHTML=obj[i].naziv;
                    link.addEventListener("click",handleLinkClick);
                    document.querySelector("#RecipesTable").appendChild(recept);
                }
                if(obj.length == 0){
                    let receptTemplate=document.querySelector("#RecipesTemplate");
                    let recept=document.importNode(receptTemplate.content,true);
                    recept.querySelector("a").innerHTML="Nema recepata koji odgovaraju upitu!";
                    document.querySelector("#RecipesTable").appendChild(recept);
                }
            }
        };

        var postRequest="timeTag=" + hoursToMinutes() + "&";
        for(let i=0; i<5; i++){
            if(i<selectedTags.length){
            postRequest+="tag"+i+"="+selectedTags[i].innerHTML;
            }
            else{
            postRequest+="tag"+i+"=empty";
            }
            if(i!=4){
                postRequest+="&";
            }
            console.log(postRequest);
        }
        
        xhttp.open("POST","/searchByTagsAndTime",true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(postRequest);

        return false;
    }
}



//otvaranje recepta
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