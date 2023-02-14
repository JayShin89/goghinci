<?php
$DBhostname = "mysql.marcovanici.com";  
$DBusername = "vanici_admin";
$DBpassword = "Stonecrest311"; 
$DBname = "vanici_mintinfo";

$link = mysqli_connect($DBhostname, $DBusername, $DBpassword, $DBname);

if (mysqli_connect_errno()) {
   die("Connect failed: %s\n" + mysqli_connect_error());
   exit();
}

$sql = "SELECT sum(mint_count) from mint_Info_12LZ";
$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());

$result_array = array();

if(mysqli_num_rows($result) > 0){
    $result_array = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($result_array, $row);
    }
}

echo json_encode($result_array);

mysqli_close($link);
?>