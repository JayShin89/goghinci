<?php
    $wallet_addr = $POST['wallet_addr'];

    if(!empty($wallet_addr)) {
        $host = "mysql.marcovanici.com";
        $dbusername = "vanici_admin";
        $dbpassword = "Stonecrest31"
        $dbname = "vanici_mintinfo";

        //create connection
        $conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

        if(mysqli_connect_error()) {
            die('Connect Error ('.mysqli_connect_errno().') '
            .mysql_connect_error());
        }

        else {
            $sql = "INSERT INTO mint_Info_12LZ (wallet_addr, collection, mint_count) VALUES ($wallet_addr, 12LZ,1) ON DUPLICATE KEY UPDATE mint_count=mint_count+1";
            if($conn->query($sql)) {
                echo "New record inserted";
            }
            else {
                echo "Error: " .$sql ."<br>".$conn->error;
            }
            $conn->close();
        }
    }
    else {
        echo "Please connect metamask";
    }



?>