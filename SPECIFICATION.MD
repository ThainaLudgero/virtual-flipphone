# Virtual Flip Phone — Specification

> Documento de especificação e planejamento do projeto.
>
> Este documento define o conceito, escopo, comportamento, arquitetura e roadmap do Virtual Flip Phone antes da implementação.

---

# 1. Conceito

O projeto consiste em um **telefone flip virtual**, desenvolvido como uma aplicação web em React.

A proposta é simular a experiência de utilização de um aparelho celular simples, incluindo sua interface, teclado, navegação, aplicativos e comportamentos.

O projeto não deve ser tratado apenas como um website com aparência de telefone. A aplicação deve funcionar como uma pequena simulação de um sistema de telefone.

O objetivo principal é construir o projeto de forma incremental, mantendo a arquitetura compreensível e evitando tanto:

* código monolítico;
* quanto fragmentação artificial em excesso.

A inteligência artificial poderá ser utilizada como ferramenta de implementação, revisão e auxílio técnico, mas as regras, comportamentos e decisões arquiteturais devem ser definidos antes da implementação sempre que possível.

---

# 2. Escopo do MVP

O MVP inicial terá como núcleo:

* shell do telefone;
* tela;
* teclado;
* botões;
* navegação;
* sistema de entrada;
* calculadora;
* contatos;
* ligações;
* eventos de ligações recebidas;
* persistência dos dados.

Funcionalidades futuras não fazem parte do MVP inicial.

---

# 3. Hardware Virtual

O telefone será composto visualmente por elementos que representam o aparelho físico.

Estrutura inicial:

```text
Phone
├── Screen
├── Keyboard
└── Buttons
```

Os componentes visuais devem representar responsabilidades reais do aparelho.

A implementação não deve transformar cada pequeno elemento visual em um componente separado sem necessidade.

A regra é:

> Uma responsabilidade por unidade lógica, sem fragmentação artificial.

---

# 4. Telas

As telas representam os diferentes estados/aplicativos exibidos no sistema do telefone.

Inicialmente serão consideradas telas como:

```text
Home
Menu
Contacts
Calculator
Calls
```

A lista poderá crescer conforme novas funcionalidades forem adicionadas.

## 4.1 Home

Tela inicial do telefone.

Responsabilidades iniciais:

* apresentar o estado inicial do aparelho;
* permitir acesso ao menu;
* responder aos comandos básicos de navegação.

---

## 4.2 Menu

Tela que apresenta os aplicativos e funcionalidades disponíveis no aparelho.

Exemplos:

```text
Contacts
Calculator
Calls
```

A estrutura exata do menu será definida antes da implementação dessa funcionalidade.

---

## 4.3 Contacts

Tela responsável pela visualização e gerenciamento dos contatos.

Será detalhada na seção de Contatos.

---

## 4.4 Calculator

Tela responsável pela calculadora.

Será detalhada na seção de Calculadora.

---

## 4.5 Calls

Tela responsável pelas ligações.

Será detalhada na seção de Ligações.

---

# 5. Navegação

A navegação representa a mudança entre estados/telas do sistema do telefone.

Inicialmente, a navegação será tratada como **estado da aplicação**, e não como um componente visual independente.

Conceitualmente:

```text
estado atual
     ↓
tela correspondente
     ↓
ação do usuário
     ↓
novo estado
```

Exemplo:

```text
Home
 ↓
Menu
 ↓
Contacts
 ↓
Home
```

## 5.1 Navegação inicial

A implementação inicial deve utilizar a solução mais simples que resolva o problema.

Não criar antecipadamente:

```text
NavigationManager
NavigationService
NavigationContext
NavigationReducer
```

ou estruturas equivalentes sem necessidade real.

Caso o sistema futuramente exija:

* histórico de navegação;
* botão voltar;
* telas empilhadas;
* submenus;
* navegação complexa;

a arquitetura de navegação poderá ser refatorada.

A complexidade deve surgir da necessidade real do sistema, e não ser antecipada.

---

# 6. Sistema de Entrada

O sistema de entrada será responsável por transformar as interações do usuário com o teclado físico/virtual em ações dentro do sistema.

Inicialmente deverá suportar:

* teclado numérico;
* cliques;
* múltiplos cliques;
* timeout;
* entrada de letras;
* backspace;
* teclado físico.

O sistema de entrada será desenvolvido na Fase 2.

---

# 7. Calculadora

A calculadora será implementada inicialmente com operações básicas.

Fluxo fundamental:

```text
número
   ↓
operador
   ↓
número
   ↓
resultado
```

Posteriormente deverão ser considerados:

* números decimais;
* apagar;
* limpar;
* operações consecutivas.

A calculadora não será implementada antes da conclusão do shell e do sistema básico de entrada.

---

# 8. Contatos

O sistema de contatos deverá permitir operações CRUD:

```text
Create
Read
Update
Delete
```

Inicialmente, os contatos serão implementados sem fotografia.

Posteriormente poderão ser adicionados:

* persistência;
* fotografia;
* outras informações de contato.

A estrutura definitiva dos dados será definida antes da implementação.

---

# 9. Ligações

O sistema de ligações deverá contemplar:

```text
ligação manual
       +
ligação recebida
       +
cronômetro
```

O sistema deverá representar pelo menos:

* início de ligação;
* estado de ligação;
* duração da ligação;
* encerramento da ligação.

Ligações recebidas dependerão do sistema de eventos aleatórios.

---

# 10. Eventos Aleatórios

O telefone deverá possuir futuramente um sistema capaz de gerar eventos de forma controlada.

Fluxo conceitual:

```text
scheduler
    ↓
randomização
    ↓
seleção de contato
    ↓
incoming call
```

O sistema deverá ser responsável por determinar quando um evento pode ocorrer e qual evento será executado.

Os detalhes de frequência, aleatoriedade e regras de seleção serão definidos antes da implementação.

---

# 11. Modelo de Dados

Os dados utilizados pelo sistema deverão ser definidos antes da implementação das funcionalidades que dependem deles.

Inicialmente serão necessários dados relacionados a:

```text
Phone
Contact
Call
```

O modelo definitivo deverá ser especificado antes da implementação da persistência.

Exemplo conceitual:

```text
Contact
├── id
├── name
└── phoneNumber
```

A estrutura acima é apenas inicial e poderá ser modificada conforme as necessidades do projeto.

---

# 12. Persistência

A aplicação deverá possuir persistência dos dados.

As alternativas inicialmente consideradas são:

```text
localStorage
```

ou:

```text
IndexedDB
```

A escolha será feita após determinar a quantidade e a complexidade dos dados que precisarão ser armazenados.

A persistência não deve ser implementada prematuramente.

Primeiro devem ser definidos:

* quais dados precisam persistir;
* quais dados são temporários;
* quais estados precisam sobreviver ao fechamento da aplicação;
* volume e complexidade dos dados.

---

# 13. Arquitetura React

## 13.1 Princípios

A arquitetura deverá priorizar:

* responsabilidades bem definidas;
* componentes reutilizáveis quando houver necessidade real;
* baixo acoplamento;
* facilidade de manutenção;
* legibilidade;
* crescimento incremental;
* evitar código monolítico;
* evitar fragmentação artificial.

A regra principal é:

> Uma responsabilidade por unidade lógica, sem transformar cada pequeno detalhe em um arquivo ou componente independente.

---

## 13.2 Estrutura inicial

A estrutura inicial do projeto será aproximadamente:

```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   └── phone/
│       ├── Phone.jsx
│       ├── PhoneScreen.jsx
│       ├── PhoneKeyboard.jsx
│       └── PhoneButton.jsx
│
├── screens/
│   └── HomeScreen.jsx
│
├── App.jsx
└── main.jsx
```

Essa estrutura é inicial e poderá crescer conforme novas responsabilidades forem realmente necessárias.

Não criar antecipadamente pastas como:

```text
hooks/
contexts/
services/
reducers/
utils/
constants/
```

apenas por seguirem padrões comuns de projetos React.

Essas abstrações deverão ser criadas quando houver uma necessidade concreta.

---

## 13.3 Assets

Os arquivos estáticos do projeto deverão permanecer em:

```text
src/assets/
```

Podem existir subpastas para organização:

```text
assets/
├── images/
├── icons/
└── fonts/
```

Caso o número de arquivos cresça, a organização poderá ser refinada.

---

## 13.4 Components

A pasta `components` deverá conter componentes visuais ou estruturais que possuam uma responsabilidade clara.

Os componentes específicos do aparelho ficarão inicialmente em:

```text
components/phone/
```

Exemplo:

```text
Phone.jsx
PhoneScreen.jsx
PhoneKeyboard.jsx
PhoneButton.jsx
```

### Phone

Representa o aparelho como um todo.

Responsabilidades:

* composição do telefone;
* organização dos componentes físicos;
* integração entre tela e controles.

Não deverá concentrar a lógica de todos os aplicativos.

---

### PhoneScreen

Representa a área física da tela do telefone.

Sua responsabilidade principal é apresentar o conteúdo atual do sistema.

A tela física e as telas do sistema são conceitos diferentes:

```text
PhoneScreen
    ↓
HomeScreen
ContactsScreen
CalculatorScreen
...
```

---

### PhoneKeyboard

Representa o teclado do telefone.

Sua responsabilidade é organizar as teclas e transmitir suas interações.

---

### PhoneButton

Representa uma tecla/botão individual quando houver necessidade de uma unidade de componente própria.

O componente poderá cuidar de:

* aparência;
* estados visuais;
* interação básica.

A lógica específica do que cada botão faz não deve necessariamente ficar dentro do próprio botão.

---

# 14. Testes

Os testes deverão ser adicionados progressivamente conforme as funcionalidades forem implementadas.

Prioridade inicial:

1. navegação;
2. entrada do teclado;
3. calculadora;
4. contatos;
5. ligações;
6. eventos aleatórios;
7. persistência.

Os testes devem verificar principalmente comportamento e regras do sistema.

---

# 15. Fases de Desenvolvimento

O desenvolvimento será dividido em fases para evitar a implementação simultânea de muitas funcionalidades.

---

## Fase 0 — Especificação

Objetivo:

Definir o comportamento do sistema antes da implementação.

Definir:

* telas;
* estados;
* regras;
* dados;
* fluxos;
* escopo;
* arquitetura inicial.

Esta fase é a etapa atual do projeto.

---

## Fase 1 — Shell do Telefone

Construir somente:

```text
Phone
├── Screen
├── Keyboard
├── Buttons
└── Navigation
```

Sem:

* contatos;
* calculadora;
* chamadas;
* persistência;
* eventos aleatórios.

Objetivo:

> Consigo navegar pelo telefone?

---

## Fase 2 — Sistema de Input

Implementar:

* teclado numérico;
* clique múltiplo;
* timeout;
* letras;
* backspace;
* teclado físico.

Objetivo:

> O telefone consegue interpretar corretamente as entradas do usuário?

---

## Fase 3 — Calculadora

Implementar:

```text
número
→ operador
→ número
→ resultado
```

Depois:

* decimal;
* apagar;
* limpar;
* operações consecutivas.

---

## Fase 4 — Contatos

Implementar:

```text
Create
Read
Update
Delete
```

Inicialmente sem foto.

Depois:

* persistência;
* foto;
* funcionalidades adicionais.

---

## Fase 5 — Ligações

Implementar:

```text
ligação manual
+
ligação recebida
+
cronômetro
```

---

## Fase 6 — Sistema de Eventos

Implementar:

```text
scheduler
↓
randomização
↓
seleção de contato
↓
incoming call
```

---

## Fase 7 — Persistência Completa

Escolher e implementar:

```text
localStorage
```

ou:

```text
IndexedDB
```

dependendo das necessidades reais do sistema.

---

## Fase 8 — Polimento

Somente depois do núcleo estar funcional:

* animações;
* sons;
* transições;
* detalhes visuais;
* efeitos;
* responsividade;
* acessibilidade;
* performance.

---

# 16. Backlog

Aplicativos futuros não fazem parte do planejamento de implementação do MVP.

Eles serão mantidos como backlog:

```text
[ ] Bloco de notas
[ ] Galeria
[ ] Câmera
[ ] Editor de fotos
[ ] Mensagens
[ ] Navegador
[ ] Wayback Machine mobile
```

Novos aplicativos poderão ser adicionados posteriormente.

O backlog não deve interferir no desenvolvimento do núcleo do telefone.

---

# 17. Regras de Arquitetura

As seguintes regras devem orientar o desenvolvimento:

### 17.1 Evitar funções monolíticas

Não criar funções responsáveis simultaneamente por:

```text
navegação
teclado
calculadora
contatos
ligações
persistência
```

A lógica deve ser separada por responsabilidade.

---

### 17.2 Evitar fragmentação artificial

Não transformar cada pequeno `if`, elemento visual ou operação simples em:

* uma função;
* um componente;
* um arquivo;
* ou uma abstração independente,

sem que exista uma responsabilidade real que justifique essa separação.

---

### 17.3 Não antecipar abstrações

Uma abstração deve surgir quando houver repetição, complexidade ou responsabilidade que justifique sua existência.

Não criar infraestrutura apenas porque ela poderá ser útil no futuro.

---

### 17.4 Crescimento incremental

A arquitetura deverá acompanhar o crescimento do projeto.

A estrutura da Fase 1 não precisa prever perfeitamente as necessidades da Fase 7.

Quando uma nova necessidade surgir, a arquitetura poderá ser refatorada.

---

### 17.5 Clareza antes de sofisticação

Uma solução simples e compreensível deve ser preferida a uma solução mais sofisticada quando ambas resolverem adequadamente o problema.

---

# 18. Critério para avançar de fase

Uma fase somente deverá ser considerada concluída quando:

1. sua funcionalidade principal estiver implementada;
2. o comportamento estiver coerente com a especificação;
3. os principais fluxos tiverem sido testados;
4. problemas arquiteturais evidentes tiverem sido corrigidos;
5. a implementação estiver compreensível o suficiente para ser mantida e expandida.

O objetivo não é produzir código perfeito antes de avançar, mas evitar carregar problemas conhecidos para as próximas fases.

---

# 19. Princípio Geral do Projeto

O desenvolvimento seguirá o seguinte princípio:

> **Primeiro entender o problema, depois definir as regras, depois implementar e, por fim, refatorar conforme o sistema revelar suas necessidades.**

A IA será utilizada como ferramenta de apoio ao desenvolvimento, mas decisões sobre comportamento, arquitetura e escopo devem ser compreendidas antes de serem implementadas.

O objetivo não é apenas terminar o Virtual Flip Phone.

O projeto também deve servir como exercício prático para aprender:

* React;
* componentização;
* estado;
* eventos;
* gerenciamento de dados;
* arquitetura de aplicações;
* persistência;
* testes;
* refatoração.

Esse já pode ser o seu **documento-base oficial**. Conforme formos avançando na Fase 0, podemos ir preenchendo as partes que ainda estão genéricas — principalmente **estados, fluxos de navegação e modelo de dados** — em vez de tentar adivinhar tudo agora.
