var searchButton = document.getElementById("submit");
var myInput = document.getElementById("myInput");
var searchChoice = document.querySelectorAll(".dropdown-content a");
var searchChoiceButton =document.getElementById("search-choice-button");
var selectedSearchChoice;

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
function handleSearchButtonClick(){

if(myInput.value == ""){
    alert("Unesite vrijednost u polje pretrage!");  //Provjeri je li ista uneseno u polje pretrage
    return;
}
if(searchChoiceButton.innerHTML=="Izaberi pretraživanje"){      //Provjeri je li odabrana vrsta pretrage
    alert("Odaberite vrstu pretrage!");
    return;
}

var inputValue = myInput.value;

if(selectedSearchChoice == document.getElementById("option-author")){   //Odabrana pretraga po autoru
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


}
