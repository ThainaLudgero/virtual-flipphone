<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="flipphone"></div>
        <div id="display">
            <div id="display-buttons">
                <button id="home" type="button" onclick="changePage(appsContent)">Home</button>
                <button id="contacts" type="button" onclick="changePage(contactsList)">Contacts</button>
            </div>
            <div id="apps-content">
                    <button class="app" id="calculator-app" type="button" onclick="changePage(calculatorContent);"></button>
                    <button class="app" id="contacts-app" type="button" onclick="changePage(contactContent);"></button>
            </div>
            <div class="background display" id="calculator-content">
                <input type="text" id="number-display">
                <div id="previous-operand"></div>
                <div id="current-operand"></div>
                <span id="calculator-buttons">
                    <button type="button" class="span-two" id="clear">AC</button>
                    <button type="button" class="span-two" id="delete">Delete</button>
                </span>
                <span id="calculator-sign">
                    <img src="assets/calculatorsign.png" alt="calculatorsign">
                </span>
            </div>
            <div class="background display" id="contacts-list">
                <?php
                include_once('contactform.php');
                    $select = "SELECT * FROM tb_contatos ORDER BY id_contato DESC LIMIT 8";
                    try{
                        $resultado = $conect->prepare($select);
                        $resultado->execute();
                        $contar = $resultado->rowCount();
                        if($contar > 0){
                            while($show = $resultado->FETCH(PDO::FETCH_OBJ)){   
                ?>
                <div class="contact">
                    <img src="img/<?php echo $show->foto_contato;?>" alt="profile picture">
                    <span>
                    <p><?php echo $show->nome_contato;?></p>
                    <p><?php echo $show->numero_contato;?></p>
                    </span>
                    <button type="button" onclick="call(<?php echo $show->id_contato;?>)"><img src="assets/call.png" alt="call"></button>
                </div>
                <?php
                            }
                        }else{
                        echo "Not existing contact!";
                        }
                    }catch(PDOException $e){
                        echo '<strong>ERRO DE PDO= </strong>'.$e->getMessage();
                    }
                ?>
            </div>
            <div class="background display" id="call-contact">
            </div>
            <?php
                include_once('contactform.php');
                $select = "SELECT * FROM tb_contatos ORDER BY RAND() LIMIT 1";
                try{
                    $resultado = $conect->prepare($select);
                    $resultado->execute();
                    $contar = $resultado->rowCount();
                    if($contar > 0){
                        while($show = $resultado->FETCH(PDO::FETCH_OBJ)){  
            ?>
            <div class="background display" id="contact-calling">
                <h1>Call from</h1>
                <p><?php echo $show->nome_contato;?></p>
                <p><?php echo $show->numero_contato;?></p>
                <span>
                    <button type="button" onclick="declineCall()"><img src="assets/nocall.png"></button>
                    <button type="button" onclick="call(<?php echo $show->id_contato;?>)"><img src="assets/call.png"></button>
                </span>
            </div>
            <?php
                            }
                        }else{
                        echo "Not existing contact!";
                        }
                    }catch(PDOException $e){
                        echo '<strong>ERRO DE PDO= </strong>'.$e->getMessage();
                    }
                ?>
            <div class="background display" id="contact-content">
                <form action="contactform.php" method="post" enctype="multipart/form-data">
                    <label for="form-photo">Photo</label>
                    <input name="foto" type="file" id="form-photo" style="display: none;">
                    <input type="button" value="Select photo" style="width: 150px;" onclick="document.getElementById('form-photo').click();"/>
                    <label for="contact-name">Name</label>
                    <input name="nome" type="text" id="contact-name">
                    <label for="contact-number">Number</label>
                    <input name="numero" type="text" id="contact-number">
                    <button name="contactbtn" type="submit">Ok</button>
                </form>
            </div>
        </div>
            <div id="buttons">
                <div id="row1">
                    <button type="button" class="operation" id="add">+</button>
                    <button type="button" class="operation" id="multiply">*</button>
                    <button type="button" class="operation" id="divide">/</button>
                    <button type="button" class="operation" id="subtract">-</button>
                </div>
                <div id="row2">
                    <button type="button" class="number number-1" id="number-1" onclick="button1Event()">1</button>
                    <button type="button" class="number number-2" id="number-2" onclick="button2Event()">2</button>
                    <button type="button" class="number number-3" id="number-3" onclick="button3Event()">3</button>
                    <button type="button" class="number number-4" id="number-4" onclick="button4Event()">4</button>
                    <button type="button" class="number number-5" id="number-5" onclick="button5Event()">5</button>
                    <button type="button" class="number number-6" id="number-6" onclick="button6Event()">6</button>
                    <button type="button" class="number number-7" id="number-7" onclick="button7Event()">7</button>
                    <button type="button" class="number number-8" id="number-8" onclick="button8Event()">8</button>
                    <button type="button" class="number number-9" id="number-9" onclick="button9Event()">9</button>
                    <button type="button" class="dot" id="dot">.</button>
                    <button type="button" class="number number-0" id="number-0">0</button>
                    <button type="button" id="equals">=</button>
                </div>
            </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="main.js"></script>
</html>