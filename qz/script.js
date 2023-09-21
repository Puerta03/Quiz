let pontos = 0;
let vidasRestantes = 2;
const IMAGENS = ["educacao-fisica-matriz.jpg", "História.jpg", "CAPA GEOGRAFIA.jpg", "linguaportuguesa-capa2.jpg", "BNCC-QUESTOES-1024x576.jpg", "filosofia_jh65rd2sd.jpg", "maxresdefault.jpg"];
const IMG = document.getElementById('carrosselImagem');
let imgIndice = 0;
const totalDeQuestoes = 7;
const questoes = [

  {
    pergunta: "Qual é o componente do condicionamento físico que se refere à capacidade do corpo de realizar atividades físicas de longa duração?",
    alternativas: ["Força", "Resistência", "Flexibilidade", "Agilidade"],
    correta: "Resistência"  
  },
  
  {
    pergunta: "Qual foi o período de extrema instabilidade política e social na França que levou à queda da monarquia em 1789?",
    alternativas: ["Revolução Industrial", "Renascimento", "Revolução Francesa", "Revolução Americana"],
    correta: "Revolução Francesa"
  },

  {
    pergunta: "Qual é o nome do conjunto de cataratas localizado na fronteira entre o Canadá e os Estados Unidos?",
    alternativas: ["Cataratas do Iguaçu", "Cataratas do Niágara", "Cataratas Vitória", "Cataratas Angel"],
    correta: "Cataratas do Niágara"
  },

  {
    pergunta: "O que é uma metáfora na linguagem figurada?",
    alternativas: ["Uma comparação direta entre dois objetos usando COMO ou PARECE.", "Uma figura de linguagem que atribui características humanas a objetos inanimados.", "Uma figura de linguagem que utiliza palavras com sons semelhantes.", "Uma figura de linguagem que substitui uma palavra por outra de significado semelhante."],
    correta: "Uma comparação direta entre dois objetos usando COMO ou PARECE."
  },

  {
    pergunta: "Qual é a fórmula para calcular o volume de uma esfera?",
    alternativas: ["V = (4/3)πr^2", "V = (4/3)πr^3", "V = 2πr^2", "V = πr^2"],
    correta: "V = (4/3)πr^3"
  },

  {
    pergunta: "Quem é considerado o PAI DA FILOSOFIA e alegadamente disse: SÓ SEI QUE NADA SEI?",
    alternativas: ["Sócrates", "Platão", "Aristóteles", "Descartes"],
    correta: "Sócrates"
  },

  {
    pergunta: "Quem é considerado o fundador da sociologia e cunhou o termo SOCIOLOGIA?",
    alternativas: ["Karl Marx", "Auguste Comte", "Émile Durkheim", "Max Weber"],
    correta: "Auguste Comte"
  }
];

let numeroQuestao = document.querySelector('#numQuestao');
let perguntaElemento = document.querySelector('#pergunta');
let alternativasElemento = document.querySelector('#alternativas');
let instrucoesElemento = document.querySelector('#instrucoes');
let tentativasElemento = document.querySelector('#tentativas');
let elementoPergunta = document.getElementById('pergunta');
let numero = document.querySelector('#numero');
let total = document.querySelector('#total');
let vidasElement = document.getElementById('vidas');

numero.textContent = 1;
total.textContent = questoes.length;

function carregarProximaQuestao(nQuestao) {
  numero.textContent = nQuestao + 1;
  perguntaElemento.textContent = questoes[nQuestao].pergunta;
  for (let i = 0; i < questoes[nQuestao].alternativas.length; i++) {
    alternativasElemento.children[i].textContent = questoes[nQuestao].alternativas[i];
  }
}

function verificarResposta(nQuestao, respostaEscolhida) {
  let correta = questoes[nQuestao].correta;
  let feedbackElemento = document.getElementById('feedback');

  if (respostaEscolhida === correta) {
    pontos+=10;
    feedbackElemento.textContent = "Resposta correta!";
    feedbackElemento.style.color = "green";
    feedbackElemento.style.textAlign = 'center';
  } else {
    vidasRestantes--;
    atualizarVidas();
    feedbackElemento.textContent = "Resposta incorreta!";
    feedbackElemento.style.color = "red";
    feedbackElemento.style.textAlign = 'center';
    if (vidasRestantes > 0) {
      instrucoes.textContent = "Você perdeu, mas ainda tem " + vidasRestantes + " vida(s) restante(s). Reiniciando a próxima pergunta...";
      carregarProximaQuestao(0);
    } else {
      instrucoes.textContent = "Fim de Jogo!";
      pergunta.textContent = "Você conseguiu " + pontos + (pontos === 1 ? " ponto" : " pontos");
      pontos = 0;
      articleQuestoes.style.display = 'none';
    }
  }

  imgIndice += 1;
  carregar();
  placar = pontos;
  instrucoes.textContent = "Pontos: " + placar;
  if (nQuestao + 1 >= questoes.length) {
    fimDoJogo();
  } else {
    setTimeout(function () {
      carregarProximaQuestao(nQuestao + 1);
    }, 1000);
  }
}
function carregar() {
  IMG.src = IMAGENS[imgIndice];
}
function fimDoJogo() {
  if (vidasRestantes === 0) {
    instrucoes.textContent = "Fim de Jogo!";
    pergunta.textContent = "Você conseguiu " + pontos + (pontos === 1 ? " ponto" : " pontos");
    pontos = 0;
    articleQuestoes.style.display = 'none';
  } else {
    carregarProximaQuestao(0); 
    instrucoes.textContent = "Você ganhou, mas ainda tem " + vidasRestantes + " vida(s) restante(s). Reiniciando a próxima pergunta...";
  }
}

function reiniciarJogo() {
  imgIndice = 0;
  pontos = 0;
  vidasRestantes = 2;
  instrucoes.textContent = "Bem-vindo de volta ao início do Quiz!";
  atualizarVidas();
  carregarProximaQuestao(0);
  carregar();
  elementoPergunta.style.display = 'block';
  tentativasElemento.style.display = 'block';
  feedbackElemento.textContent = '';
  feedbackElemento.classList.remove('feedback-correta', 'feedback-incorreta');
  for (let i = 0; i < alternativasElemento.children.length; i++) {
    alternativasElemento.children[i].classList.remove('opcao-selecionada');
  }
}

function atualizarVidas() {
  vidasElement.innerHTML = 'Vidas: ';

  for (let i = 0; i < vidasRestantes; i++) {
    const vidaElement = document.createElement('span');
    vidaElement.className = 'vida';
    vidaElement.textContent = '❤️';
    vidasElement.appendChild(vidaElement);
  }

  for (let i = 0; i < 3 - vidasRestantes; i++) {
    const vidaVaziaElement = document.createElement('span');
    vidaVaziaElement.className = 'vida-vazia';
    vidaVaziaElement.textContent = '🖤';
    vidasElement.appendChild(vidaVaziaElement);
  }
}
reiniciarJogo()