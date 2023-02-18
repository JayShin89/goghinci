<?php
$DBhostname = "mysql.marcovanici.com";  
$DBusername = "vanici_admin";
$DBpassword = "Stonecrest311"; 
$DBname = "vanici_mintinfo";

$wallet_addr = $_POST['wallet_addr'];
$mint_count = $_POST['mint_count'];
$link = mysqli_connect($DBhostname, $DBusername, $DBpassword, $DBname);

if (mysqli_connect_errno()) {
   die("Connect failed: %s\n" + mysqli_connect_error());
   exit();
}

$sql = "INSERT INTO mint_Info_12LZ (wallet_addr, collection, mint_count) VALUES ('$wallet_addr', '12LZ','$mint_count') ON DUPLICATE KEY UPDATE mint_count=mint_count+$mint_count";
$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());
if($conn->query($sql)) {
    echo "New record inserted";
}
else {
    echo "Error: " .$sql ."<br>".$conn->error;
}

mysqli_close($link);
#All rights of the above code are reserved to Hojin Shin. Prohibits the use of all code and features on the page without the permission and consent of the developer.
?>