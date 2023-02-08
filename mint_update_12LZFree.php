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

$sql = "INSERT INTO mint_info_12LZ_Free (wallet_addr, collection, mint_count) VALUES ('$wallet_addr', '12LZ','3')";
$result = mysqli_query($link,$sql) or die("Unable to select: ".mysql_error());
if($conn->query($sql)) {
    echo "New record inserted";
}
else {
    echo "Error: " .$sql ."<br>".$conn->error;
}

mysqli_close($link);
?>