<?php
$dbhServername="localhost";
$dbUsername="root";
$dbPassword="";
$dbName="reacting_time";

$conn = mysqli_connect($dbhServername, $dbUsername, $dbPassword, $dbName);

$name = $_POST['name'];
$score = $_POST['score'];

$sql= "SELECT * FROM `highscore` WHERE `name` = '$name'";
  $result = mysqli_query($conn, $sql);
  $resultCheck = mysqli_num_rows($result);
    if($resultCheck > 0){
      while($row = mysqli_fetch_assoc($result)){
        if ($row['score'] > $score) {
          $sql = "UPDATE `highscore` SET `score` = '$score' where `name` = '$name'";
          mysqli_query($conn, $sql);
        }
    }}else {
        $sql = "INSERT INTO `highscore`(`name`, `score`) VALUES ('$name' , '$score')";
        mysqli_query($conn, $sql);
      }
