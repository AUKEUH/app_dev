<?php
require_once 'connect.php';

$sql = "SELECT * FROM `highscore` ORDER BY `score`";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);
$data = array();

if($resultCheck > 0){
 while($row = mysqli_fetch_assoc($result)){
   $data[]=$row;
}}

echo(json_encode($data));
?>
