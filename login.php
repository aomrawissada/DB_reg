<?php
   // Create connection
   $con=mysqli_connect('172.16.254.111',"user","password","Faults"); //(connection location , username to sql, password to sql, name of db)

   // Check connection
   if (mysqli_connect_errno($con))
   {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }
   //below is the variables from the login form
   $username = $_POST['username'];

   $password = md5(strip_tags($_POST['password']));

   $sql="SELECT * FROM student WHERE sid='.addslashes($username).' and password='.addslashes($password).'";
   $result=mysqli_query($sql);   

   //Mysql_num_row is counting table row
   $count=mysqli_num_rows($result);   

   if($count==1){   
   session_register("username");
     session_register("password"); 
   header('www.twitter.com/bts_twt');
   }
   //if false echo below
   else {
    echo "<H2>Wrong Username or Password</H2>";
   }   
?>