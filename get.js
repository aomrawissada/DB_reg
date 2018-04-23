
var studentIDPW = "http://localhost:3000/getcid";


function getFrom(url)
{
    /*var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            return xmlHttp.responseText;
        }
    }
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
    xmlHttp.send( null );*/
    console.log(url);
    var xhr = new XMLHttpRequest();
        //console.log(0)

  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open("GET", url, true);
    //console.log(1)
    xhr.send()
    xhr.onload = function() {
    var res = xhr.responseText;
    //console.log("Afds");
    return res;
  }

  xhr.onerror = function(){
    console.log("error")
  }

  } else if (typeof XDomainRequest != "undefined") {
    console.log(2)

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open("GET", url);
    xhr.send(data)
  } else {
    console.log(3)

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  console.log(xhr)
  return xhr.responseText;
}

function checkLogin( input_SID, input_pass){
    var pairbase = getFrom(studentIDPW);
    for(var i=0; i < pairbase.length; i++)
        if((pairbase[i].SID == input_SID) && (pairbase[i].password == input_pass))
            return true;
    return false;
}




/*
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
*/