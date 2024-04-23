<?php

try{
  DEFINE('HOST','localhost');
  DEFINE('BD','flipphone_banco_dados');
  DEFINE('USER','root');
  DEFINE('PASS','rootpassword');

  $conect = new PDO('mysql:host='.HOST.';dbname='.BD,USER,PASS);
  $conect -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo "<strong>ERRO DE PDO = </strong>".$e->getMessage();
}