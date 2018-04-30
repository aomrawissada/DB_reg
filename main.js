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
		var i,j;
		for(i=0;i<=9;i++){
			for(j=0;j<=6;j++) {
				document.getElementById("r"+i+j).innerHTML = ""; 
				document.getElementById("r"+i+j).style.backgroundColor = null;
				document.getElementById("r"+i+j).onclick = "";
			}
		}
		document.getElementById("caption").innerHTML = "";
		document.getElementById("btmbtn1").style.visibility = "hidden";
		document.getElementById("btmbtn2").style.visibility = "hidden";
		document.getElementById("btmbtn3").style.visibility = "hidden";
		document.getElementById("btmbtn4").style.visibility = "hidden";
		document.getElementById("btmbtn5").style.visibility = "hidden";
		document.getElementById("btmbtn6").style.visibility = "hidden";
		document.getElementById("btmbtn7").style.visibility = "hidden";
		document.getElementById("btmbtn8").style.visibility = "hidden";
		document.getElementById("studentID").value = "";
		document.getElementById("courseID").value = "";
		document.getElementById("semes").value = "";
		document.getElementById("newgrade").value = "";
		document.getElementById("grade1").value = "";
		document.getElementById("studentID").style.visibility = "hidden";
		document.getElementById("courseID").style.visibility = "hidden";
		document.getElementById("semes").style.visibility = "hidden";
		document.getElementById("newgrade").style.visibility = "hidden";
		document.getElementById("grade1").style.visibility = "hidden";
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
	
	function setTable(){
		var i,j;
		for(i=1;i<=8;i++) {
			for(j=0;j<=6;j++) {
				document.getElementById("r"+i+j).innerHTML = ("r"+i+j);
				//document.getElementById("r"+i+j).onclick = ("r"+i+j);
			/*	document.getElementById("r"+i+j).style.position = 'absolute';  // position it
				document.getElementById("r"+i+j).style.left = (1000*i)+ "px";
				document.getElementById("r"+i+j).style.right = (1000*i+1000)+ "px";
				document.getElementById("r"+i+j).style.top = (1000*(j+1))+ "px";
				document.getElementById("r"+i+j).style.bottom = (1000*(j+1)+1000)+ "px";*/
				if(((i+j)%2)==0) {
					document.getElementById("r"+i+j).style.backgroundColor = "pink";
				}
				else {
					document.getElementById("r"+i+j).style.backgroundColor = "blue";
				}
			}
		}
	}
	
	function f_withdraw(){ //ถอน
	    clearelement();
		//document.getElementById("caption").innerHTML = "ถอนรายวิชา";
		fetch("http://localhost:3000/getqueryenroll/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					f_withdraw2(loginID, myJson[i].CID, myJson[i].Semester, (3*i)+1);
				}
		});
	}
	function f_withdraw2(studentID, courseID, semes, elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID]).onclick = f_withdraw3.bind(this, [studentID, courseID, semes, elementID]);
			}
		})					
	}
	function f_withdraw3(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		var elementID = args[3];
		var i;
		for(i=0;i<10;i++)
			document.getElementById(c0[i]).style.backgroundColor = null;
		document.getElementById(c0[elementID]).style.backgroundColor = "Yellow";
		document.getElementById("btmbtn8").innerHTML = "ยินยันถอนรายวิชา";
		document.getElementById("btmbtn8").style.visibility = "visible";
		document.getElementById("btmbtn8").onclick = f_withdraw4.bind(this, [studentID, courseID, semes]);
	}
	function f_withdraw4(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		fetch("http://localhost:3000/withdraw1/"+studentID+"/"+courseID+"/"+semes)
			.then(function (response) {
				console.log("return2")
				return response.json();
			})
			.then(function (myJson) {
				//alert("ถอนสำเร็จ");
				//f_withdraw();
				fetch("http://localhost:3000/withdraw2/"+studentID+"/"+courseID+"/"+semes)
					.then(function (response) {
						console.log("return2")
						return response.json();
					})
					.then(function (myJson) {
						alert("ถอนสำเร็จ");
						f_withdraw();
				});
		});
	}
	
	function f_remove(){ //ลดรายวิชา
	    clearelement();
		//document.getElementById("caption").innerHTML = "ลดรายวิชา";
		fetch("http://localhost:3000/getqueryenroll/sid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					f_remove2(loginID, myJson[i].CID, myJson[i].Semester, (3*i)+1);
				}
		});
	}
	function f_remove2(studentID, courseID, semes, elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID]).onclick = f_remove3.bind(this, [studentID, courseID, semes, elementID]);
			}
		})					
	}
	function f_remove3(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		var elementID = args[3];
		var i;
		for(i=0;i<10;i++)
			document.getElementById(c0[i]).style.backgroundColor = null;
		document.getElementById(c0[elementID]).style.backgroundColor = "Yellow";
		document.getElementById("btmbtn8").innerHTML = "ยินยันลดรายวิชา";
		document.getElementById("btmbtn8").style.visibility = "visible";
		document.getElementById("btmbtn8").onclick = f_remove4.bind(this, [studentID, courseID, semes]);
	}
	function f_remove4(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		fetch("http://localhost:3000/removeClass/"+studentID+"/"+courseID+"/"+semes)
			.then(function (response) {
				console.log("return2")
				return response.json();
			})
			.then(function (myJson) {
				//alert("ถอนสำเร็จ");
				//f_withdraw();
				fetch("http://localhost:3000/withdraw2/"+studentID+"/"+courseID+"/"+semes)
					.then(function (response) {
						console.log("return2")
						return response.json();
					})
					.then(function (myJson) {
						alert("ลดสำเร็จ");
						f_remove();
				});
		});
	}
	
	function f_addClass(){ //ถอน
	    clearelement();
		//document.getElementById("caption").innerHTML = "เพิ่มรายวิชา";
		fetch("http://localhost:3000/getAllsection")
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					f_addClass2(loginID, myJson[i].CID, myJson[i].Semester, myJson[i].SecNum, (3*i)+1);
				}
		});
	}
	function f_addClass2(studentID, courseID, semes, sect, elementID){
		var already_enroll = 0;
		fetch("http://localhost:3000/getquerygrade/sid="+studentID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				if((myJson[i].CID == courseID) && (myJson[i].Semester == semes)) {
					already_enroll = 1;
				}
			}
			if(already_enroll == 0) {
				f_addClass3(studentID, courseID, semes, sect, elementID);
				//document.getElementById(c0[elementID]).innerHTML = courseID+" "+semes+" "+sect;
				//document.getElementById(c0[elementID]).onclick = f_withdraw3.bind(this, [studentID, courseID, semes, elementID]);
			}
			//document.getElementById(c0[elementID]).innerHTML = courseID+" "+semes+" "+sect;
			//document.getElementById(c0[elementID]).onclick = f_withdraw3.bind(this, [studentID, courseID, semes, elementID]);
		})					
	}
	function f_addClass3(studentID, courseID, semes, sect, elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				document.getElementById(c0[elementID]).innerHTML = courseID+" "+myJson[i].CName+" semester:"+semes+" section:"+sect;
				document.getElementById(c0[elementID]).onclick = f_addClass4.bind(this, [studentID, courseID, semes, sect, elementID]);
			}
		})					
	}
	function f_addClass4(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		var sect = args[3];
		var elementID = args[4];
		var i;
		for(i=0;i<10;i++)
			document.getElementById(c0[i]).style.backgroundColor = null;
		document.getElementById(c0[elementID]).style.backgroundColor = "Yellow";
		document.getElementById("btmbtn1").innerHTML = "ยินยันเพิ่มรายวิชา";
		document.getElementById("btmbtn1").style.visibility = "visible";
		document.getElementById("btmbtn1").onclick = f_addClass5.bind(this, [studentID, courseID, semes, sect]);
	}
	function f_addClass5(args, event){
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		var sect = args[3];
		fetch("http://localhost:3000/addClass1/"+studentID+"/"+courseID+"/"+semes+"/"+sect)
			.then(function (response) {
				console.log("return2")
				return response.json();
			})
			.then(function (myJson) {
				//alert("ถอนสำเร็จ");
				//f_withdraw();
				fetch("http://localhost:3000/addClass2/"+studentID+"/"+courseID+"/"+semes+"/"+sect)
					.then(function (response) {
						console.log("return2")
						return response.json();
					})
					.then(function (myJson) {
						alert("เพิ่มสำเร็จ");
						f_addClass();
				});
		});
	}
	
	function f01(){ //ข้อมูลส่วนตัว นักเรียน
	    clearelement();
		document.getElementById("caption").innerHTML = "ข้อมูลนักเรียน";
		document.getElementById("r10").innerHTML = "ID : "+loginID
		//document.getElementById("r00").onclick = function() {f500()};
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
				//document.getElementById("btmbtn1").style.visibility = "visible";
			    //document.getElementById("btmbtn1").innerHTML = "แก้ไขข้อมูล";
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
					f02_1(loginID,myJson[i].CID);
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
				//document.getElementById(c0[count]).onclick = f02_2(studentID,courseID,c0[count]);
				f02_2(studentID,courseID,c0[count]);
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
					if(myJson[i].WFlag == true) {
						node.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน:  W";
					}
					else {
						if(myJson[i].Grade == null) {
							node.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน:  X";
						}
						else {
							node.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน:  "+myJson[i].Grade;
						}
					}
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
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID+1]).innerHTML = "ตั้งแต่ "+myJson[i].StartTime+" ถึง "+myJson[i].EndTime;
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
				document.getElementById(c0[elementID]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				document.getElementById(c0[elementID+1]).innerHTML = "วันและเวลาสอบ "+ myJson[i].Date;
			}
		})					
	}
	
	var count08 = 0;
	function f08(){ //ผลการเรียนรายวิชา
	    clearelement();
		count08 = 0;
		//document.getElementById("caption").innerHTML = "ผลการเรียนรายวิชา";
		//document.getElementById("btmbtn6").style.visibility = "visible";
	    //document.getElementById("btmbtn6").innerHTML = "แก้ไขผลการเรียน";
		
				var btn1 =document.createElement("button");
                btn1.className = "button1"; 
				btn1.innerHTML = "รหัสวิชา";
				var btn2 =document.createElement("button");
                btn2.className = "button1"; 
				btn2.innerHTML = "ชื่อวิชา";
				var btn3 =document.createElement("button");
                btn3.className = "button1"; 
				btn3.innerHTML = "ภาคเรียน";
				var btn4 =document.createElement("button");
                btn4.className = "button1"; 
				btn4.innerHTML = "รหัสนิสิต";
				var btn5 =document.createElement("button");
                btn5.className = "button1"; 
				btn5.innerHTML = "ชื่อ-นามสกุล นิสิต";
				var btn6 =document.createElement("button");
                btn6.className = "button1"; 
				btn6.innerHTML = "ผลการศึกษา";
				 
				document.getElementById("r"+count08+"1").style.backgroundColor = "Orange";
				document.getElementById("r"+count08+"2").style.backgroundColor = "Gold";
				document.getElementById("r"+count08+"3").style.backgroundColor = "Orange";
				document.getElementById("r"+count08+"4").style.backgroundColor = "Gold";
				document.getElementById("r"+count08+"5").style.backgroundColor = "Orange";
				document.getElementById("r"+count08+"6").style.backgroundColor = "Gold";
				
				document.getElementById("r"+count08+"1").append(btn1);
				document.getElementById("r"+count08+"2").append(btn2);
				document.getElementById("r"+count08+"3").append(btn3);
				document.getElementById("r"+count08+"4").append(btn4);
				document.getElementById("r"+count08+"5").append(btn5);
				document.getElementById("r"+count08+"6").append(btn6);
		
		count = 0;
		fetch("http://localhost:3000/getqueryteach/tid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					f08_1(myJson[i].CID);
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
				//document.getElementById(c0[count]).innerHTML = myJson[i].CID+" "+myJson[i].CName;
				//document.getElementById(c0[count]).onclick = f08_2(myJson[i].CID,c0[count]);
				f08_2(myJson[i].CID, myJson[i].CName, c0[count]);
			}
		})					
	}
	function f08_2(courseID, courseName, elementID){
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				f08_3(courseID, courseName, myJson[i].Semester, myJson[i].SID, myJson[i].Grade, elementID);
			}
		})					
	}
	function f08_3(courseID, courseName, semes, studentID, grade, elementID){
		fetch("http://localhost:3000/getquerystudent/sid="+studentID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				console.log("xx" +i);
				var node = document.createElement("LI");
				node.id = courseID+elementID;
				 
				count08 = (count08 + 1);
				
				var btn1 =document.createElement("button");
                btn1.className = "button1"; 
				btn1.innerHTML = courseID;
				var btn2 =document.createElement("button");
                btn2.className = "button1"; 
				btn2.innerHTML = courseName;
				var btn3 =document.createElement("button");
                btn3.className = "button1"; 
				btn3.innerHTML = semes;
				var btn4 =document.createElement("button");
                btn4.className = "button1"; 
				btn4.innerHTML = studentID;
				var btn5 =document.createElement("button");
                btn5.className = "button1"; 
				btn5.innerHTML = ""+ myJson[i].Name + " "+ myJson[i].Surname;
				var btn6 =document.createElement("button");
                btn6.className = "button1"; 
				if(grade == null) {
					btn6.innerHTML = 'X';
				}
				else {
					btn6.innerHTML = grade;
				}
				 
				document.getElementById("r"+count08+"1").style.backgroundColor = "Yellow";
				document.getElementById("r"+count08+"2").style.backgroundColor = "LightYellow";
				document.getElementById("r"+count08+"3").style.backgroundColor = "Yellow";
				document.getElementById("r"+count08+"4").style.backgroundColor = "LightYellow";
				document.getElementById("r"+count08+"5").style.backgroundColor = "Yellow";
				document.getElementById("r"+count08+"6").style.backgroundColor = "LightYellow";
				
				document.getElementById("r"+count08+"1").append(btn1);
				document.getElementById("r"+count08+"2").append(btn2);
				document.getElementById("r"+count08+"3").append(btn3);
				document.getElementById("r"+count08+"4").append(btn4);
				document.getElementById("r"+count08+"5").append(btn5);
				document.getElementById("r"+count08+"6").append(btn6);
				
				var rect = btn6.getBoundingClientRect();
				btn6.onclick = f_grade_textbox.bind(this,[studentID, courseID, semes, grade, rect.left, rect.top]);
				
			}
		})					
	}
	
	function f_grade_textbox(args, event){ //ผลการเรียนรายบุคคล
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		var grade = args[3];
		var r_left = args[4];
		var r_top = args[5];
		//alert(""+r_left+" "+r_top);
		
		document.getElementById("grade1").style.visibility = "visible";
		if(grade == null) {
			document.getElementById("grade1").value = "";
		}
		else {
			document.getElementById("grade1").value = grade;
		}
		document.getElementById("grade1").style.position = 'absolute';  // position it
		document.getElementById("grade1").style.width = 180 + "px";
		document.getElementById("grade1").style.height = 70 + "px";
	    document.getElementById("grade1").style.left = r_left + "px"; //rect.left;
		document.getElementById("grade1").style.top = r_top + "px"; //rect.left;*/
		
		document.getElementById("btmbtn2").style.visibility = "visible";
		document.getElementById("btmbtn2").innerHTML = "ยืนยันการแก้ไข";
		document.getElementById("btmbtn2").onclick = f_grade_update.bind(this,[studentID, courseID, semes]);
		
	}
	
	function f_grade_update(args, event){ //ผลการเรียนรายบุคคล
		var studentID = args[0];
		var courseID = args[1];
		var semes = args[2];
		
		if(isNaN(document.getElementById("grade1").value)) {
			alert("Grade must be a real number between 0-4"); 
			return;
		}
		if((document.getElementById("grade1").value < 0) || (document.getElementById("grade1").value > 4)) {
			alert("Grade must be a real number between 0-4"); 
			return;
		}
		//alert("http://localhost:3000/updateGrade/"+studentID+"/"+courseID+"/"+semes+"/"+document.getElementById("grade1").value)
		fetch("http://localhost:3000/updateGrade/"+studentID+"/"+courseID+"/"+semes+"/"+document.getElementById("grade1").value)
			.then(function (response) {
				console.log("return2")
				return response.json();
			})
			.then(function (myJson) {
				//alert("Success!");
				f08();
		});
	 
	}
	
	var tick = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	function f09(){ //ผลการเรียนรายบุคคล
	    clearelement();
		//document.getElementById("caption").innerHTML = "ผลการเรียนนิสิตในที่ปรึกษา";
		//document.getElementById("studentID").style.visibility = "visible";
		//document.getElementById("btmbtn4").style.visibility = "visible";
	    //document.getElementById("btmbtn4").innerHTML = "สืบค้นข้อมูล";
		fetch("http://localhost:3000/getquerystudent/advisorTid="+loginID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				for(i=0;i<myJson.length;i++){
					document.getElementById(c0[i+1]).innerHTML = ""+myJson[i].SID+" "+myJson[i].Name+ " "+myJson[i].Surname;
					document.getElementById(c0[i+1]).onclick = f09_1.bind(this,[myJson[i].SID, c0[i+1],myJson[i].Name,myJson[i].Surname,(i+1)]);
				}
		});
	}
	
	/*function yourFunc (args, event) {
    // here you can work with you array of the arguments 'args'
	}*/
	
	function f09_1(args, event){  
		var studentID = args[0];
		var elementID = args[1];
		var name = args[2];
		var surname = args[3];
		var i = args[4];
		if (tick[i]==0) {
			f09_2(studentID, elementID);
			tick[i]=1;
		}
		else {
			document.getElementById(elementID).innerHTML = ""+studentID+" "+name+" "+surname;
			tick[i] = 0;
		}
	}
	
	function f09_2(studentID, elementID){  
		//studentID = args[0];
		//elementID = args[1];
		fetch("http://localhost:3000/getquerygrade/sid="+studentID)
		    .then(function (response) {
				console.log("return")
				return response.json();
			})
			.then(function (myJson) {
				count = 2;
				for(i=0;i<myJson.length;i++){
					f09_3(studentID, myJson[i].CID, elementID);
				}
		});
	}
	function f09_3(studentID,courseID, elementID){
		fetch("http://localhost:3000/getquerycourse/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				//var node = document.createElement("LI");
				//node.id = courseID+elementID;
				//node.innerHTML = courseID + " " + myJson[i].CName;
				f09_4(studentID,courseID,myJson[i].CName,elementID);
				//document.getElementById(elementID).appendChild(node);
			}
		})					
	}
	function f09_4(studentID,courseID,cName,elementID){
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				if(myJson[i].SID == studentID) {
					var br = document.createElement("br");
					document.getElementById(elementID).appendChild(br);
					var node = document.createElement("LI");
					node.id = courseID+elementID+1;
					node.innerHTML = ""+courseID + " " + cName;
					document.getElementById(elementID).appendChild(node);
					var node2 = document.createElement("LI");
					node2.id = courseID+elementID+1;
					if(myJson[i].Grade==null) {
						node2.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน: X";
					}
					else {
						node2.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน: "+myJson[i].Grade;
					}
					document.getElementById(elementID).appendChild(node2);
				   // node.innerHTML = "ภาคเรียนที่ "+myJson[i].Semester +" ผลการเรียน: "+myJson[i].Grade;
				   // document.getElementById(elementID).appendChild(node);
				 
				}
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
				}
		});
	}
	
	function f11(){ //แก้ไขผลการเรียน
		document.getElementById("caption").innerHTML = "แก้ไขผลการเรียน";
		document.getElementById("studentID").style.visibility = "visible";
		document.getElementById("courseID").style.visibility = "visible";
		document.getElementById("newgrade").style.visibility = "visible";
		document.getElementById("semes").style.visibility = "visible";
		document.getElementById("btmbtn5").style.visibility = "visible";
	    document.getElementById("btmbtn5").innerHTML = "ทำการแก้ไข";
		document.getElementById("btmbtn6").style.visibility = "hidden";
	}
	function f11_1(){ 
	    var check=0;
	    if(isNaN(document.getElementById("newgrade").value)) {
			alert("Grade must be a real number"); 
		}
		else {
			fetch("http://localhost:3000/getqueryteach/tid="+loginID)
				.then(function (response) {
					console.log("return")
					return response.json();
				})
				.then(function (myJson) {
					console.log(myJson);
					for(i=0;i<myJson.length;i++){
						if(myJson[i].CID == document.getElementById("courseID").value)
						{	if(myJson[i].Semester == document.getElementById("semes").value)
							{	check=1;
								f11_2(document.getElementById("studentID").value, document.getElementById("courseID").value, 
								document.getElementById("semes").value, document.getElementById("newgrade").value);
							}
						}
					}
					if(check==0) {
						alert("You can only update grades from the course and semester you teach!");
					}
			});
		}
	}
	function f11_2(studentID, courseID, semes, newgrade){ 
		var check2 = 0;
		fetch("http://localhost:3000/getquerygrade/cid="+courseID)
		.then(function (response) {
			console.log("return2")
			return response.json();
		})
		.then(function (myJson) {
			for(i=0;i<myJson.length;i++){
				if(myJson[i].SID == studentID) {
					if(myJson[i].Semester == semes) {
						check2 = 1;
					    fetch("http://localhost:3000/updateGrade/"+studentID+"/"+courseID+"/"+semes+"/"+newgrade)
							.then(function (response) {
								console.log("return2")
								return response.json();
							})
							.then(function (myJson) {
								alert("Success!");
								f08();
						});
					}
				}
			}
			if(check2==0) {
				alert("There is no student with this ID in this course and semester");
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

