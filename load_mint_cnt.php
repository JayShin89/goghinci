<?php
$servername = "mysql.marcovanici.com";
$username="vanici_admin";
$userPass = "Stonecrest311";
$database = "vanici_mintinfo";

$connectQuery = mysqli_connect($servername,$username,$userPass,$database);

if(mysqli_connect_errno()){
    die("Connect failed: %s\n" + mysqli_connect_error());
    exit();
}else{
    $selectQuery = "SELECT * from mint_Info_12LZ where wallet_addr = '0x3346f0D456ea153A8e70A732E23e33CE63D38FF1'";
    $result = mysqli_query($connectQuery,$selectQuery);
    if(mysqli_num_rows($result) > 0){
        $result_array = array();
        while($row = mysqli_fetch_assoc($result)){
            array_push($result_array, $row);
        }
    }
    echo json_encode($result_array);
}
?>