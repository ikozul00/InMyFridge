function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("demo").innerHTML = JSON.stringify(xhttp.response);
      }
    };
    xhttp.open("GET", "/change", true);
    xhttp.send();
  }