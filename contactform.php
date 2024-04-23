
<?php
include_once('conexao.php');
if(isset($_POST['contactbtn'])){
    $nome = $_POST['nome'];
    $numero = $_POST['numero'];
    $formatP = array("png","jpg","jpeg","JPG","gif"); //formato aceito para imagem
    $extensao = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    // $extensao = extrai a extensao do nome do arquivo

    if(in_array($extensao, $formatP)){
      $pasta ="img/"; //pasta que recebe a imagem de upload
      $temporario = $_FILES['foto']['tmp_name']; //caminho temporario da imagem
      $novoNome = uniqid().".$extensao";
      //uniqid(criptografa o nome da imagem),
      //depois concatena com a extensao
      if(move_uploaded_file($temporario,$pasta.$novoNome)){
      
        $cadastro = "INSERT INTO tb_contatos (nome_contato, numero_contato, foto_contato) VALUES (:nome, :numero, :foto)";
        try{
          $result = $conect->prepare($cadastro);
          $result->bindParam(':nome',$nome,PDO::PARAM_STR);
          $result->bindParam(':numero',$numero,PDO::PARAM_STR);
          $result->bindParam(':foto',$novoNome,PDO::PARAM_STR);
          $result->execute();

          $contar = $result->rowCount();
          if($contar > 0){
              echo 'Contact included!';
              header('Location: index.php'); // Redireciona de volta para a página HTML
              exit(); // Termina o script
          }else{
              echo 'Contact not included!';
          }
        }catch (PDOException $e){
          echo "<strong>ERRO DE CADASTRO PDO = </strong>".$e->getMessage();
        }
      }else{
        echo "Erro, não foi possível fazer o upload da imagem!";
      }
    }else{
      echo "Formato de imagem inválido, aceito
      apenas(png, jpg, jpeg, JPG e gif";
    }
}