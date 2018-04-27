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

	function clearelement(){
		for(i=0;i<10;i++){
			document.getElementById(c0[i]).innerHTML = ""; 
		}
	}

	function f00(){ //ข้อมูลส่วนตัว อาจารย์
	    clearelement();
		document.getElementById("caption").innerHTML = "ข้อมูลอาจารย์";
		document.getElementById("r10").innerHTML = "ID : "+loginID;
		fetch("http://localhost:3000/getqueryteacher/tid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				document.getElementById("r20").innerHTML = "ชื่อ:" + myJson[0].Name + " "+myJson[0].Surname;
				document.getElementById("r30").innerHTML = "โทรศัพท์:"+ myJson[0].Ephone;
				document.getElementById("r40").innerHTML = "ที่อยู่:" + myJson[0].Address;
				document.getElementById("r50").innerHTML = "วันเกิด:" + myJson[0].Birthdate;
				document.getElementById("r60").innerHTML = "เพศ:" + myJson[0].Sex;
				document.getElementById("r70").innerHTML = "หมู่โลหิต:" + myJson[0].BloodType;
		 });
	}
	function f01(){ //ข้อมูลส่วนตัว นักเรียน
	    clearelement();
		document.getElementById("caption").innerHTML = "ข้อมูลนักเรียน";
		document.getElementById("r10").innerHTML = "ID : "+loginID;
		fetch("http://localhost:3000/getquerystudent/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				document.getElementById("r20").innerHTML = "ชื่อ:" + myJson[0].Name + " "+myJson[0].Surname;
				document.getElementById("r30").innerHTML = "โทรศัพท์:"+ myJson[0].Ephone;
				document.getElementById("r40").innerHTML = "ที่อยู่:" + myJson[0].Address;
				document.getElementById("r50").innerHTML = "วันเกิด:" + myJson[0].Birthdate;
				document.getElementById("r60").innerHTML = "เพศ:" + myJson[0].Sex;
				document.getElementById("r70").innerHTML = "หมู่โลหิต:" + myJson[0].BloodType;
				f01_1(myJson[0].AdvisorTID);
		 });
	}
	function f01_1(advisorTID){
		fetch("http://localhost:3000/getqueryteacher/tid="+advisorTID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				document.getElementById("r80").innerHTML = "อาจารย์ที่ปรึกษา:" + myJson[i].Name + " "+ myJson[i].Surname;
				document.getElementById("btmbtn1").style.visibility = "visible";
			    document.getElementById("btmbtn1").innerHTML = "แก้ไขข้อมูล";
			}
		})					
	}
	
	var count=1;
	function f02(){ //ผลการศึกษา
	    clearelement();
		document.getElementById("caption").innerHTML = "ผลการศึกษา";
		document.getElementById("btmbtn1").style.visibility = "visible";
		document.getElementById("btmbtn1").innerHTML = "พิมพ์ ผลการศึกษา";
		fetch("http://localhost:3000/getquerygrade/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				count = 0;
				for(i=0;i<myJson.length;i++){
					//document.getElementById(c0[count]).innerHTML = myJson[i].CID;
					f02_1(loginID,myJson[i].CID);
					//document.getElementById(c0[i]).onclick = f02_1(loginID,myJson[i].CID,c0[i]);
				}
		});
	}
	function f02_1(studentID,courseID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				count = (count+1)
				document.getElementById(c0[count]).innerHTML = courseID+" "+myJson[i].CName;
				document.getElementById(c0[count]).onclick = f02_2(studentID,courseID,c0[count]);
			}
		})					
	}
	function f02_2(studentID,courseID,elementID){
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				if(myJson[i].SID == studentID) {
					var node = document.createElement("LI");
				    node.id = courseID+elementID;
				    node.innerHTML = courseID + " "+ myJson[i].CName;
				    document.getElementById(elementID).appendChild(node);
					node.id = courseID+elementID+1;
				    node.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน: "+myJson[i].Grade;
				    document.getElementById(elementID).appendChild(node);
				 
				}
			}
		})					
	}
	
	function f03(){ //ค่าเล่าเรียน
	    clearelement();
		document.getElementById("caption").innerHTML = "ค่าเล่าเรียน";
		//document.getElementById("r10").innerHTML = "ID : "+loginID;
		document.getElementById("btmbtn1").style.visibility = "visible";
		document.getElementById("btmbtn1").innerHTML = "พิมพ์ใบเสร็จ";
		fetch("http://localhost:3000/getquerytuition/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				document.getElementById("r10").innerHTML = "ID : "+loginID+" ภาคเรียน: " + myJson[0].Semester+" หมายเลขใบเสร็จ: "+ myJson[0].ReceiptNum+" จำนวน: " + myJson[0].Amount;
				//document.getElementById("r20").innerHTML = "ภาคเรียน: " + myJson[0].Semester;
				//document.getElementById("r30").innerHTML = "หมายเลขใบเสร็จ: "+ myJson[0].ReceiptNum;
				//document.getElementById("r40").innerHTML = "จำนวน: " + myJson[0].Amount;
		 });
	}

	function f04(){ //ตารางสอน
	    clearelement();
		document.getElementById("caption").innerHTML = "ตารางสอน";
		fetch("http://localhost:3000/getqueryenroll/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					//document.getElementById(c0[i+1]).innerHTML = "ภาคเรียน: " + myJson[0].CID;
					//document.getElementById(c0[i]).onclick = f04_1(myJson[i].CID,c0[i]);
					f04_1(myJson[i].CID,(3*i)+1);
				}
		});
	}
	function f04_1(courseID,elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				/*var node = document.createElement("LI");
				node.id = courseID+elementID;
				node.innerHTML = myJson[i].CName +" "+myJson[i].StartTime+" "+myJson[i].EndTime;*/
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID+1]).innerHTML = "ตั้งแต่ "+myJson[i].StartTime+" ถึง "+myJson[i].EndTime;
				//document.getElementById(elementID).innerHTML = myJson[i].CID + " "+myJson[i].CName +" "+myJson[i].StartTime+" "+myJson[i].EndTime;
				//document.getElementById(elementID).appendChild(node);
			}
		})					
	}
	
	function f05(){ //ตารางสอบ
	    clearelement();
		document.getElementById("caption").innerHTML = "ตารางสอบ";
		fetch("http://localhost:3000/getqueryenroll/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					//document.getElementById(c0[i+1]).innerHTML = "ภาคเรียน: " + myJson[0].CID;
					//document.getElementById(c0[i]).onclick = f04_1(myJson[i].CID,c0[i]);
					f05_1(myJson[i].CID,(2*i)+1);
				}
		});
	}
	function f05_1(courseID,elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				/*var node = document.createElement("LI");
				node.id = courseID+elementID;
				node.innerHTML = myJson[i].CName +" "+myJson[i].StartTime+" "+myJson[i].EndTime;*/
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID+1]).innerHTML = "วันและเวลาสอบ "+ myJson[i].Date;
				//document.getElementById(elementID).innerHTML = myJson[i].CID + " "+myJson[i].CName +" "+myJson[i].StartTime+" "+myJson[i].EndTime;
				//document.getElementById(elementID).appendChild(node);
			}
		})					
	}
	
	function f08(){ //ผลการเรียนรายวิชา
	    clearelement();
		document.getElementById("caption").innerHTML = "ผลการเรียนรายวิชา";
		count = 0;
		fetch("http://localhost:3000/getqueryteach/tid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					//document.getElementById(c0[i+1]).innerHTML = "ภาคเรียน: " + myJson[0].CID;
					//document.getElementById(c0[i]).onclick = f04_1(myJson[i].CID,c0[i]);
					f08_1(myJson[i].CID)
					//f08_2(myJson[i].CID)
				}
		});
	}
	function f08_1(courseID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				count = (count+1)
				document.getElementById(c0[count]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[count]).onclick = f08_2(myJson[i].CID,c0[count]);
			}
		})					
	}
	function f08_2(courseID,elementID){
		//count = (count+1);
		//document.getElementById(c0[count]).innerHTML = count+" "+courseID+" "+courseName;
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				console.log("xx" +i);
				var node = document.createElement("LI");
				node.id = courseID+elementID;
				node.innerHTML = "semester: "+myJson[i].Semester+" student: "+myJson[i].SID + " grade: "+myJson[i].Grade;
				document.getElementById(elementID).appendChild(node);
				//document.getElementById(c0[count]).innerHTML = count+" semester: "+myJson[i].Semester+" student: "+myJson[i].SID + " grade: "+myJson[i].Grade;
			}
		})					
	}
	 
	function f10(){ //ข้อมูลรายวิชา
	    clearelement();
	    document.getElementById("caption").innerHTML = "ข้อมูลรายวิชา";
		fetch("http://localhost:3000/getAllcourse")
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					document.getElementById(c0[2*i+1]).innerHTML = myJson[i].CID + " "+ myJson[i].CName;
					document.getElementById(c0[2*i+2]).innerHTML = "รายละเอียดวิชา: "+myJson[i].Description;
					document.getElementById(c0[2*i+2]).innerHTML = "หน่วยกิต: "+myJson[i].Credit + " ตึกเรียน:  "+myJson[i].BldCode + " ห้องเรียน:  "+myJson[i].RoomNum;
					//document.getElementById(c0[i+3]).innerHTML = myJson[i].Description;
					//node.innerHTML = myJson[i].CName +" "+myJson[i].Description+" "+myJson[i].Credit+" "+myJson[i].BldCode+" "+myJson[i].RoomNum;
				}
		});
	}
	
	function f99(){ //ข้อมูลรายวิชา
	    window.location.href="home.html";
	}
	
////////////////////////////TEACHER FUNCTION////////////////////////////////////////
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
////////////////////////////STUDENT FUNCTION////////////////////////////////////////


////////////////////////////STUDENT FUNCTION////////////////////////////////////////
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

