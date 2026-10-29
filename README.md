# Virtual Flip Phone

Uma aplicação web em desenvolvimento que simula a interface de um celular flip. O projeto está em fase de protótipo: já possui a estrutura visual do aparelho e algumas telas navegáveis, enquanto várias funcionalidades ainda estão planejadas.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- ESLint

## Requisitos

- Node.js e npm. Recomenda-se usar uma versão LTS recente do Node.js.

## Instalação e execução

No terminal, acesse a pasta do projeto e instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço local exibido pelo Vite no terminal (normalmente `http://localhost:5173`).

Para verificar o lint e gerar a versão de produção:

```bash
npm run lint
npm run build
```

Para visualizar localmente a versão gerada:

```bash
npm run preview
```

## Funcionalidades planejadas

Estas são as telas e os recursos desejados para o projeto. O status atual de cada item está descrito abaixo; os itens listados aqui não devem ser entendidos como funcionalidades já concluídas.

- **Home** — tela inicial do celular. **Em desenvolvimento:** apresenta uma interface visual com data e hora, além de atalhos para Contacts e Menu.
- **Menu** — lista de aplicativos e navegação. **Em desenvolvimento:** exibe atalhos para Contacts, Extras e Call; a navegação e algumas ações ainda são parciais.
- **Contacts** — cadastro, visualização, edição e exclusão de contatos. **Parcial:** há uma lista com contatos de exemplo e uma tela com campos de detalhes. Os dados ainda não são salvos, e as operações de cadastro, edição e exclusão não estão implementadas.
- **Calculator** — calculadora funcional. **Planejada:** existe um atalho visual em Extras, mas a tela e os cálculos ainda não estão implementados.
- **Calls** — histórico e simulação de chamadas. **Parcial:** há uma interface de chamada com número de exemplo. Histórico, integração com contatos e simulação completa ainda não estão implementados.

## Aplicativos para implementar futuramente

- Bloco de notas
- Galeria
- Câmera
- Editor de fotos
- Mensagens
- Navegador

## Observações

- O teclado do aparelho já tem botões interativos para entrada por múltiplos toques e exclusão do último caractere; o suporte ao teclado físico e a integração com todas as telas ainda não estão concluídos.
- O projeto ainda não possui um script de testes automatizados configurado.
- Antes de publicar ou redistribuir imagens e fontes do projeto, confirme que você tem autorização para usá-las.
