var loginStatus = false;
var teacher = false; // teacher=1 student=0
var loginID = "PLEASE LOGIN";
var c0 = ["r00","r10","r20","r30","r40","r50","r60","r70","r80","r90"];
var c1 = ["r01","r11","r21","r31","r41","r51","r61","r71","r81","r91"];
var c2 = ["r02","r12","r22","r32","r42","r52","r62","r72","r82","r92"];

function includeHTML() {
  	var z, i, elmnt, file, xhttp;
  	/*loop through a collection of all HTML elements:*/
  	z = document.getElementsByTagName("*");
  	for (i = 0; i < z.length; i++) {
    	elmnt = z[i];
    	/*search for elements with a certain atrribute:*/
	    file = elmnt.getAttribute("w3-include-html");
	    if (file) {
	      	/*make an HTTP request using the attribute value as the file name:*/
	      	xhttp = new XMLHttpRequest();
	      	xhttp.onreadystatechange = function() {
	        	if (this.readyState == 4) {
	          		if (this.status == 200) {elmnt.innerHTML = this.responseText;}
	          		if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
	          		/*remove the attribute, and call this function once more:*/
	          		elmnt.removeAttribute("w3-include-html");
	          		includeHTML();
	        	}
	      	}      
	      	xhttp.open("GET", file, true);
	      	xhttp.send();
	      	/*exit the function:*/
	      	return;
	    }
 	}
};
/*
fetch(url)
    .then(function (response) {
		console.log("return")
		return response.json();
	})
	.then(function (myJson) {
		console.log(myJson);
		document.getElementById("r1").innerHTML = "CID = " + myJson[0].SID;
 });
*/

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
////////////////////////////TEACHER FUNCTION////////////////////////////////////////
	function f00(){ //ข้อมูลส่วนตัว อาจารย์
		document.getElementById("caption").innerHTML = "ข้อมูลส่วนตัว";
		document.getElementById("r10").innerHTML = "ID : "+loginID;
		fetch("http://localhost:3000/getqueryteacher/tid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				document.getElementById("r20").innerHTML = "ชื่อ:" + myJson[0].Ename;
				document.getElementById("r30").innerHTML = "โทรศัพท์:"+ myJson[0].Ephone;
				document.getElementById("r40").innerHTML = "ที่อยู่:" + myJson[0].Address;
				document.getElementById("r50").innerHTML = "วันเกิด:" + myJson[0].Birthdate;
				document.getElementById("r60").innerHTML = "เพศ:" + myJson[0].Sex;
				document.getElementById("r70").innerHTML = "หมู่โลหิต:" + myJson[0].BloodType;
		 });
	}
	var courses = [];
	function f08(){ //ผลการเรียนรายวิชา
		var count = 0;
		fetch("http://localhost:3000/getqueryteach/tid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				courses = myJson;
				console.log(courses);
				for(i=0;i<courses.length;i++){
					console.log("a"+i);
					document.getElementById(c0[i]).innerHTML = courses[i].CID;
					console.log("b"+i);
					document.getElementById(c0[i]).onclick = f08_1(courses[i].CID,c0[i]);
				}
		});
	}
	function f08_1(courseID,elementID){
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				var node = document.createElement("LI");
				node.id = courseID+elementID;
				node.innerHTML = myJson[i].Semester +" "+myJson[i].SID+" "+myJson[i].Grade;
				document.getElementById(elementID).appendChild(node);
			}
		})					
	}

////////////////////////////TEACHER FUNCTION////////////////////////////////////////
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
////////////////////////////STUDENT FUNCTION////////////////////////////////////////


////////////////////////////STUDENT FUNCTION////////////////////////////////////////
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

