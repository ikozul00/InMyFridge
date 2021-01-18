var searchButton = document.getElementById("submit");
var myInput = document.getElementById("myInput");
var searchChoice = document.querySelectorAll(".dropdown-content a");
var searchChoiceButton =document.getElementById("search-choice-button");
var selectedSearchChoice;
var recipesTable = document.querySelector("#RecipesTable");
var tags = document.querySelectorAll(".filterDiv"); //Tu spremimo sve tagove
var selectedTags=[];        //Ovdje spremamo sve selektane tagove

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

    var postRequest = "name=" + inputValue; 
     xhttp.open("POST","/searchByRecipe",true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send(postRequest);
     
     return false;
}

}

//Za tagove namjestimo da imaju zeleni rub ako su kliknuti
//Upozorenje ako je selectano više od pet tagova
//Ako se drugi put klikne na tag, unselecta se
for(let tag of tags){
    tag.addEventListener("click", handleTagClick);
}

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

//Dodajmo event listener na Start Search Button
let startSearchButton = document.getElementById("btn-start-search");
startSearchButton.addEventListener("click", handleStartSearchButtonClick);

function handleStartSearchButtonClick(event){


    event.preventDefault(); //Ovo sprječava refreshanje stranice nakon klika na button
    while (recipesTable.firstChild) {                   //Brisemo odgovore na proslu pretragu
        recipesTable.removeChild(recipesTable.firstChild);
    }

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