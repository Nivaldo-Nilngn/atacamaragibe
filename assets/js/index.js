// Função para atualizar a data e hora em tempo real
function atualizarDataHora() {
  // Obter a data e hora atual
  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes().toString().padStart(2, '0');

  // Atualizar o elemento HTML com a hora atual
  const horaAtual = `${hora}:${minutos}`;
  document.getElementById('horarioAtual').textContent = horaAtual;

  // Obter o dia da semana atual e atualizar o elemento HTML correspondente
  const diaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][agora.getDay()]
  document.getElementById('diaAtual').textContent = diaSemana;

  // Obter a hora atual em Recife
  const horaRecife = moment().format("YYYY-MM-DDTHH:mm");
  document.getElementById("input-recife").value = horaRecife;

}

// Iniciar a atualização da data e hora em tempo real
atualizarDataHora();
setInterval(atualizarDataHora, 1000);


// Seleciona todos os botões de horários e o botão de repor aula
const botoesHora = document.querySelectorAll('.horaInput');
const botaoRepor = document.querySelectorAll('.reporRadio');

// Função para marcar o botão selecionado e desmarcar os demais botões
function selecionarBotao(botaoSelecionado, botoes) {
  botoes.forEach(botao => {
    if (botao !== botaoSelecionado) {
      botao.style.background = 'linear-gradient(91.63deg, #FAFAFA 0%, #C0C0C0 100%)';
    } else {
      botao.style.background = 'linear-gradient(15deg, #ffbf00 0%, #a9a9a9 100%)';
    }
  });
}

// Adiciona o evento de click para cada botão de horário
botoesHora.forEach(botao => {
  botao.addEventListener('click', () => {
    selecionarBotao(botao, botoesHora);
  });
});

// Adiciona o evento de click para o botão de repor aula
botaoRepor.forEach(botao => {
  botao.addEventListener('click', () => {
    selecionarBotao(botao, botaoRepor);
  });
});
