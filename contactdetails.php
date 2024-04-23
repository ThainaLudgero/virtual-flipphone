<?php
// Verifica se o ID do contato foi enviado através da requisição POST
if (isset($_POST['id'])) {
    // Inclui o arquivo de configuração do banco de dados
    include_once('conexao.php'); // Substitua 'config.php' pelo nome do seu arquivo de configuração

    // Recupera o ID do contato da requisição POST
    $contactId = $_POST['id'];

    // Prepara a consulta SQL para buscar os detalhes do contato com base no ID
    $select = "SELECT * FROM tb_contatos WHERE id_contato = :id_contato";

    try {
        // Prepara a declaração SQL
        $statement = $conect->prepare($select);

        // Vincula o parâmetro :id_contato ao valor do ID do contato
        $statement->bindParam(':id_contato', $contactId, PDO::PARAM_INT);

        // Executa a consulta
        $statement->execute();

        // Recupera os detalhes do contato
        $contactDetails = $statement->fetch(PDO::FETCH_ASSOC);

        // Exibe os detalhes do contato em formato JSON
        echo json_encode($contactDetails);
    } catch(PDOException $e) {
        // Se ocorrer algum erro, exibe uma mensagem de erro
        echo json_encode(array('error' => 'Erro ao buscar detalhes do contato: ' . $e->getMessage()));
    }
} else {
    // Se o ID do contato não foi enviado, exibe uma mensagem de erro
    echo json_encode(array('error' => 'ID do contato não foi fornecido.'));
}
?>