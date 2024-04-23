// VARIÁVEIS
let display = document.getElementById('display');
const numberDisplay = document.getElementById('number-display');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');
let appsContent = document.getElementById('apps-content');
let calculatorContent = document.getElementById('calculator-content');
let contactsList = document.getElementById('contacts-list');
let contactContent = document.getElementById('contact-content');
let callContact = document.getElementById('call-contact');
let contactCalling = document.getElementById('contact-calling');
let currentOperand = '';
let previousOperand = '';
let operation = null;

// Eventos dos botões da calculadora
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

/* DISPLAY */
let content = [appsContent, calculatorContent, contactContent, contactsList, callContact, contactCalling];
//FUNÇÃO DE ALTERNAR PÁGINAS
function changePage(page) {
  content.forEach((div) => {
    if (div !== page) {
      div.classList.add('display');
    }else{
      page.classList.remove('display');
    }
  });
}
function call(contactId){
  changePage(callContact);
  // pega os dados do contato clicados para dispor no display
  $.ajax({
    url: 'contactdetails.php',
    type: 'POST',
    data: {id: contactId},
    success: function(response) {
      // Parseia a resposta JSON para um objeto JavaScript
      var contactDetails = JSON.parse(response);
      // Insere os detalhes do contato na div contact-details
      $('#call-contact').html('<h1>Calling...</h1>' + '<p>' + contactDetails.nome_contato + '</p>' +
      '<p>' + contactDetails.numero_contato + '</p><div id="counter"><p id="minutos"></p>:<p id="segundos"></div></p><button type=button onclick="list()"><img src="nocall.png"></button>');
      // Contador tempo de chamada
      let minutos = 0;
      let segundos = 0;

      setInterval(function() {
        segundos++;
          if(segundos == 60) {
          segundos = 0;
          minutos++;
          }
          document.getElementById('minutos').innerText = minutos < 10 ? '0' + minutos : minutos;
          document.getElementById('segundos').innerText = segundos < 10 ? '0' + segundos : segundos;
          if(callContact.style.display == 'none'){
            minutos = 0;
            segundos = 0;
          }
      }, 1000 );
    },
    error: function(xhr, status, error) {
        console.error(xhr.responseText);
        // Exiba uma mensagem de erro se ocorrer algum problema ao obter os detalhes do contato
        $('#contact-details').html('Erro ao obter os detalhes do contato.');
    }
});
}
// Função de fazer chamadas aleatórias com os contatos cadastrados
function randomCall(){
    var randomTime = Math.random() * 40000 + 10000; // Tempo aleatório entre 10s e 40s
    setTimeout(function() {
      // Se não estiver ligando para nenhum contato, poderá fazer a chamada aleatória
      if(callContact.style.display !== 'block'){
        contactCalling.style.display = 'flex';
        // Faz a div contactCalling ficar no topo
        appsContent.classList.add('position');
        calculatorContent.classList.add('position');
        contactsList.classList.add('position');
        contactContent.classList.add('position');
        callContact.classList.add('position');
        randomCall(); // Chama recursivamente a função randomToggle para continuar o ciclo
      }
    }, randomTime);
    
}
// Chama a função
randomCall();
function declineCall(){
  contactCalling.style.display = 'none';
  appsContent.classList.remove('position');
  calculatorContent.classList.remove('position');
  contactsList.classList.remove('position');
  contactContent.classList.remove('position');
  callContact.classList.remove('position');
}
// CALCULATOR
function appendNumber(number) {
  if (estadoBotoes[number].contadorCliques > 1) return; // Não insere números se já estamos no modo de inserção de letras
  if (number === '.' && currentOperand.includes('.')) return; // Prevent multiple decimals
  currentOperand = currentOperand.toString() + number.toString();
}

function updateDisplay() {
  numberDisplay.value = previousOperand + ' ' + (operation || '');
  numberDisplay.value += currentOperand;
}

function clear() {
  // Function to clear the calculator's state
  numberDisplay.value = '';
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

function deleteNumber() {
  if (currentOperand.length > 0) {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
  }
}
function compute() {
  // Function to compute the expression
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
 
  switch (operation) {
      case '+':
          computation = prev + current;
          break;
      case '-':
          computation = prev - current;
          break;
      case '*':
          computation = prev * current;
          break;
      case '/':
          computation = prev / current;
          break;
      default:
          return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
  updateDisplay(); // Refresh the display with the new state
}

function appendDot() {
  // Function to handle decimal point input
  if (currentOperand.includes('.')) return; // Prevent multiple decimals
  if (currentOperand === '') currentOperand = '0'; // If empty, start with '0.'
  currentOperand += '.';
  updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
}


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
    });
  }); 

function removeLastChar() {
  currentOperand = currentOperand.slice(0, -1);
}

// Letras (Digitação)
// Objeto para armazenar o estado de cada botão
var estadoBotoes = {
  '7': { contadorCliques: 0, timer: null },
  '8': { contadorCliques: 0, timer: null },
  '9': { contadorCliques: 0, timer: null },
  '4': { contadorCliques: 0, timer: null },
  '5': { contadorCliques: 0, timer: null },
  '6': { contadorCliques: 0, timer: null },
  '1': { contadorCliques: 0, timer: null },
  '2': { contadorCliques: 0, timer: null },
  '3': { contadorCliques: 0, timer: null }
};

let lastClickedButton = null;

function resetContadorCliques(botao) {
  estadoBotoes[botao].contadorCliques = 0;
}
function resetAllCounters() {
    for (const botao in estadoBotoes) {
        resetContadorCliques(botao);
    }
}
function buttonEvent(botao, characters) {
    if (lastClickedButton !== botao) {
        resetAllCounters();
        lastClickedButton = botao;
    }
    estadoBotoes[botao].contadorCliques++;
    if (estadoBotoes[botao].contadorCliques === 1) {
        estadoBotoes[botao].timer = setTimeout(function() {
            resetContadorCliques(botao);
        }, 1500);
    } else if (estadoBotoes[botao].contadorCliques === 2) {
        if (currentOperand.length > 0) {
            removeLastChar(); // Remove o último caractere se já houver algum na tela
        }
        currentOperand += characters[0];
    } else if (estadoBotoes[botao].contadorCliques === 3) {
        if (currentOperand.length > 0) {
            removeLastChar();
        }
        currentOperand += characters[1];
    } else if (estadoBotoes[botao].contadorCliques === 4) {
        if (currentOperand.length > 0) {
            removeLastChar();
        }
        currentOperand += characters[2];
        resetContadorCliques();
        clearTimeout(estadoBotoes[botao].timer);
    }
    updateDisplay();
}

function button7Event() {
  buttonEvent('7', 'pqr');
}
function button8Event() {
  buttonEvent('8', 'stu');
}
function button9Event() {
  buttonEvent('9', 'vwy');
  if (estadoBotoes[9].contadorCliques === 5) {
    if (currentOperand.length > 0) {
        removeLastChar();
    }
    currentOperand += 'z';
} 
}
function button4Event() {
  buttonEvent('4', 'ghi');
}
function button5Event() {
  buttonEvent('5', 'jkl');
}
function button6Event() {
  buttonEvent('6', 'mno');
}
function button1Event() {
  buttonEvent('1', '@:/');
}
function button2Event() {
  buttonEvent('2', 'abc');
}
function button3Event() {
  buttonEvent('3', 'def');
}