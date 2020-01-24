<?php
$dbhServername="localhost";
$dbUsername="root";
$dbPassword="";
$dbName="reacting_time";

$conn = mysqli_connect($dbhServername, $dbUsername, $dbPassword, $dbName);

$sql= "SELECT * FROM highscore ORDER BY CAST(score AS int)";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);
$data = array();

if($resultCheck > 0){
 while($row = mysqli_fetch_assoc($result)){
   $data[]=$row;
}}

echo(json_encode($data));
?>
