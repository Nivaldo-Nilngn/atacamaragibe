const scriptUrls = {
  segunda: 'https://script.google.com/macros/s/AKfycbzmJajBAN1CWCT-l1Re6QWdDMSqhuxy5nprvyPy2Ry3fs4UFKCfarvfuMGodLirA64/exec',
  terca: 'https://script.google.com/macros/s/AKfycbyE9rHmiqRgjOvQrUruawflUgXR2tuBUtXFuQQxkLd-9nSS_b1FCaaWHnUS5A1lymE/exec',
  quarta: 'https://script.google.com/macros/s/AKfycbybweUbOxBJNvmD4ofAi-TKto4VnBquSk0I4vwg_Ul98QadtUs9-SvAT2FvSSRY_w/exec',
  quinta: 'https://script.google.com/macros/s/AKfycbzxxPTkGLg2-dBJMHVGj54NUjWTAa3MpqFapYunn-jSkqWOzwwnen4ygC0Ke62MIb0/exec',
  sexta: 'https://script.google.com/macros/s/AKfycbzNoodSlCdDvb6vEseK9BHi7W3N-sqkaMnTqZYsDOEWTHjpSB48OIkt0p3efBCXhAA/exec',
  sabado: 'https://script.google.com/macros/s/AKfycbzu28zwYQYRdS7_R8IowJMBfg1kyB8RrliQ3i1UVTBIQtkGdhUnQh2hab8sstdmVZo/exec'
};

// Selecionar o URL do script com base no dia da semana atual
const diaAtualElemento = document.getElementById("diaAtual");
const diaAtual = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

let scriptUrl;
console.log(diaAtual);
switch (diaAtual.toLowerCase()) {
  case "segunda-feira":
    scriptUrl = scriptUrls.segunda;
    break;
  case "terça-feira":
    scriptUrl = scriptUrls.terca;
    break;
  case "quarta-feira":
    scriptUrl = scriptUrls.quarta;
    break;
  case "quinta-feira":
    scriptUrl = scriptUrls.quinta;
    break;
  case "sexta-feira":
    scriptUrl = scriptUrls.sexta;
    break;
  case "sábado":
    scriptUrl = scriptUrls.sabado;
    break;
  default:
    scriptUrl = "URL padrão";
}

var dayOfWeek = new Date().getDay();
if (dayOfWeek == 2) { // Se for terça-feira
  var radio5 = document.getElementById("turma5");
  var radio6 = document.getElementById("ultimoHorario");
  if (radio5) {
    radio5.innerHTML = `
      <label for="turma5">
        <input type="radio" name="Turma" id="turma5" value="17H ÀS 19H">
        <span>17H ÀS 19H</span>
      </label>
    `;
  }
  if (radio6) {
    radio6.innerHTML = `
      <label for="turma6">
        <input type="radio" name="Turma" id="turma6" value="18H ÀS 20H">
        <span>18H ÀS 20H</span>
      </label>
    `;
  }
}

var dayOfWeek = new Date().getDay();
if (dayOfWeek == 6) { // se for sábado
  var radio1 = document.getElementById("turma1");
  if (radio1) {
    radio1.value = "08H ÀS 10H";
    radio1.nextElementSibling.innerText = "08H ÀS 10H";
  }

  var radio2 = document.getElementById("turma2");
  if (radio2) {
    radio2.value = "10H ÀS 12H";
    radio2.nextElementSibling.innerText = "10H ÀS 12H";
  }

  var radio3 = document.getElementById("turma3");
  if (radio3) {
    radio3.value = "12H ÀS 14H";
    radio3.nextElementSibling.innerText = "12H ÀS 14H";
  }

  var radio4 = document.getElementById("turma4");
  if (radio4) {
    radio4.value = "14H ÀS 16H";
    radio4.nextElementSibling.innerText = "14H ÀS 16H";
  }

  var radio5 = document.getElementById("Turma5");
  if (radio5) {
    radio5.innerHTML = `
      <label for="turma5">
        <input type="radio" name="Turma" id="turma5" value="16H à 18H">
        <span>16H à 18H</span>
      </label>
    `;
  }
}


  const reloadDiv = document.createElement("div");
  reloadDiv.classList.add("reload");
  reloadDiv.innerHTML = `
  <div class="reload__content">
    <p>Aguarde, os dados estão sendo enviados...</p>
  </div>
`;
  document.body.appendChild(reloadDiv);
  reloadDiv.style.display = "none";

  // Função para criar um elemento de alerta personalizado
  function showAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.innerHTML = `
    <div class="alert__content">
      <p>${message}</p>
    </div>
  `;
    document.body.appendChild(alertDiv);
    alertDiv.style.display = "flex";
    setTimeout(() => {
      alertDiv.style.display = "none";
      alertDiv.remove();
    }, 3000); // Esconder o alerta depois de 5 segundos
  }

  const formElemento = document.querySelector(".formEntrada");
  formElemento.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeInput = formElemento.querySelector("#nomeInput");
    const codigoInput = formElemento.querySelector("#codigoInput");
    const turmaInput = formElemento.querySelector('input[type="radio"][name="Turma"]:checked');
    const reposicaoInput = formElemento.querySelector('input[type="radio"][name="Reposição"]:checked');

    if (!nomeInput.value.trim()) {
      showAlert("Por favor, preencha o campo Nome");
      return;
    }

    if (!codigoInput.value.trim()) {
      showAlert("Por favor, preencha o campo Código");
      return;
    }

    if (!turmaInput) {
      showAlert("Por favor, selecione a Turma");
      return;
    }

    if (!reposicaoInput) {
      showAlert("Por favor, selecione a opção de Reposição");
      return;
    }

    const formData = new FormData(formElemento);
    reloadDiv.style.display = "flex";

    fetch(scriptUrl, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        console.log(`Dados enviados com sucesso para ${scriptUrl}`);
        window.location.href = "./assets/html/sucesso.html";
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao enviar os dados:", error);
        window.location.href = "./assets/html/found404.html";
      })
      .finally(() => {
        if (["./assets/html/sucesso.html", "./assets/html/found404.html"].includes(window.location.href)) {
          reloadDiv.style.display = "none";
        }
      });
  });