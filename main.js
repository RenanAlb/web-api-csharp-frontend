import {
  deleteUsuarios,
  getUsuarios,
  postUsuarios,
  putUsuarios,
} from "./requisicoes.js";

const botaoGET = document.getElementById("get");
const botaoPOST = document.getElementById("post");
const botaoPUT = document.getElementById("put");
const botaoDELETE = document.getElementById("delete");
const globalTableHTML = document.getElementById("global-table");
const loadingDivHTML = document.getElementById("global-loading");
const tbodyHTML = document.getElementById("tbody");
const formPostHTML = document.getElementById("form-post");
const formPutHTML = document.getElementById("form-put");
const formDeleteHTML = document.getElementById("form-delete");

let lengthUsuarios = 0;

const fecharOuAbrirTableUsuarios = () => {
  const displayAtualTableUsuarios =
    window.getComputedStyle(globalTableHTML).display;

  if (displayAtualTableUsuarios === "none") {
    globalTableHTML.style.display = "block";
  } else if (displayAtualTableUsuarios === "block") {
    globalTableHTML.style.display = "none";
  }
};

const fecharOuAbrirLoadingPage = () => {
  const displayAtualLoadingPage =
    window.getComputedStyle(loadingDivHTML).display;

  if (displayAtualLoadingPage === "none") {
    loadingDivHTML.style.display = "block";
  } else if (displayAtualLoadingPage === "block") {
    loadingDivHTML.style.display = "none";
  }
};

const fecharOuAbrirFormPost = () => {
  const displayAtualFormPost = window.getComputedStyle(formPostHTML).display;

  if (displayAtualFormPost === "none") {
    formPostHTML.style.display = "block";
    formDeleteHTML.style.display = "none";
    formPutHTML.style.display = "none";
  } else if (displayAtualFormPost === "block") {
    formPostHTML.style.display = "none";
    formDeleteHTML.style.display = "none";
    formPutHTML.style.display = "none";
  }
};

const fecharOuAbrirFormPut = () => {
  const displayAtualFormPut = window.getComputedStyle(formPutHTML).display;

  if (displayAtualFormPut === "none") {
    formPutHTML.style.display = "block";
    formPostHTML.style.display = "none";
    formDeleteHTML.style.display = "none";
  } else if (displayAtualFormPut === "block") {
    formPutHTML.style.display = "none";
    formPostHTML.style.display = "none";
    formDeleteHTML.style.display = "none";
  }
};

const fecharOuAbrirFormDelete = () => {
  const displayAtualFormDelete =
    window.getComputedStyle(formDeleteHTML).display;

  if (displayAtualFormDelete === "none") {
    formDeleteHTML.style.display = "block";
    formPostHTML.style.display = "none";
    formPutHTML.style.display = "none";
  } else if (displayAtualFormDelete === "block") {
    formDeleteHTML.style.display = "none";
    formPostHTML.style.display = "none";
    formPutHTML.style.display = "none";
  }
};

const renderizarUsuariosHTML = (usuariosGET) => {
  if (usuariosGET.length !== 0) {
    for (let i = 0; i < usuariosGET.length; i++) {
      const criarTrHMTL = document.createElement("tr");
      const criarTdHTML1 = document.createElement("td");
      const criarTdHTML2 = document.createElement("td");
      criarTdHTML2.id = "id-usuario";

      const nomeUsuario = usuariosGET[i].name;
      const idUsuario = usuariosGET[i].id;

      criarTdHTML1.innerHTML = nomeUsuario;
      criarTdHTML2.innerHTML = `<p class="id-p">${idUsuario}<p>`;
      criarTdHTML2.innerHTML += `<span class="material-symbols-outlined" data-id="${usuariosGET[i].id}" id="copy">content_copy</span>`;
      criarTdHTML2.innerHTML += `<div class="mensagem-copiado" id="${usuariosGET[i].id}">ID copiado</div>`;

      criarTrHMTL.appendChild(criarTdHTML1);
      criarTrHMTL.appendChild(criarTdHTML2);

      tbodyHTML.appendChild(criarTrHMTL);
    }
  } else {
    const trHTML = document.createElement("tr");
    const tdHTML = document.createElement("td");
    const tdHTML2 = document.createElement("td");

    tdHTML.innerText = "Sem usuários para mostrar...";
    tdHTML2.innerHTML = "...";

    trHTML.appendChild(tdHTML);
    trHTML.appendChild(tdHTML2);
    tbodyHTML.appendChild(trHTML);
  }
};

const iniciarBuscaUsuarios = async () => {
  formDeleteHTML.style.display = "none";
  formPostHTML.style.display = "none";
  formPutHTML.style.display = "none";

  fecharOuAbrirLoadingPage();
  fecharOuAbrirTableUsuarios();

  const respostaGetUsuarios = await getUsuarios();

  if (respostaGetUsuarios) {
    lengthUsuarios = respostaGetUsuarios.length;
    fecharOuAbrirLoadingPage();
    fecharOuAbrirTableUsuarios();
    clicarCopiarID();
  }

  tbodyHTML.innerHTML = "";

  renderizarUsuariosHTML(respostaGetUsuarios);
};

const adicionarUsuarioPOST = async (e) => {
  e.preventDefault();
  const nomeInputForm = document.getElementById("post-input");
  const respostaPOSTUsuarios = await postUsuarios(nomeInputForm.value);
  fecharOuAbrirLoadingPage();

  if (respostaPOSTUsuarios) {
    nomeInputForm.value = "";
    iniciarBuscaUsuarios();
    fecharOuAbrirLoadingPage();
  }
};

formPostHTML.addEventListener("submit", adicionarUsuarioPOST);

const abrirFormPost = () => fecharOuAbrirFormPost();

const atualizarUsuarioPUT = async (e) => {
  e.preventDefault();

  const idUsuarioPut = document.getElementById("put-input-id");
  const novoNomeUsuarioPut = document.getElementById("put-input-nome");

  if (idUsuarioPut && novoNomeUsuarioPut) {
    const respostaPUT = await putUsuarios(
      idUsuarioPut.value.trim(),
      novoNomeUsuarioPut.value.trim()
    );
    fecharOuAbrirLoadingPage();

    if (respostaPUT) {
      idUsuarioPut.value = "";
      novoNomeUsuarioPut.value = "";
      fecharOuAbrirFormPut();
      fecharOuAbrirLoadingPage();
      iniciarBuscaUsuarios();
    }
  }
};

formPutHTML.addEventListener("submit", atualizarUsuarioPUT);

const abrirFormPut = () => fecharOuAbrirFormPut();

const deletarUsuarioDELETE = async (e) => {
  e.preventDefault();

  const idUsuarioDelete = document.getElementById("delete-input-id");
  console.log(idUsuarioDelete);

  if (idUsuarioDelete) {
    const respostaDeleteUsuario = await deleteUsuarios(idUsuarioDelete.value);
    fecharOuAbrirLoadingPage();
    if (respostaDeleteUsuario) {
      idUsuarioDelete.value = "";
      fecharOuAbrirLoadingPage();
      iniciarBuscaUsuarios();
    }
  }
};

formDeleteHTML.addEventListener("submit", deletarUsuarioDELETE);

const abrirFormDelete = () => fecharOuAbrirFormDelete();

// Funções adicionais

const fecharMensagemCopiadas = () => {
  document.querySelectorAll("[data-id]").forEach((e) => {
    document.getElementById(`${e.dataset.id}`).style.display = "none";
  });
};

const clicarCopiarID = () => {
  setTimeout(() => {
    const copyIconHTML = document.querySelectorAll("[data-id]");

    copyIconHTML.forEach((elemento) => {
      elemento.addEventListener("click", () => {
        fecharMensagemCopiadas();
        const id = elemento.dataset.id;
        const idUsuario = navigator.clipboard.writeText(id);
        console.log("nihao");

        if (idUsuario) {
          const mensagemCopiado = (document.getElementById(
            `${id}`
          ).style.display = "block");
          console.log(mensagemCopiado);
        }
      });
    });
  }, 200);
};

// Funções de botão (GET, POST, PUT, DELETE)
botaoGET.addEventListener("click", iniciarBuscaUsuarios);
botaoPOST.addEventListener("click", abrirFormPost);
botaoPUT.addEventListener("click", abrirFormPut);
botaoDELETE.addEventListener("click", abrirFormDelete);

// Iniciar busca de usuários
// setInterval(() => {
//   (async () => {
//     const respostaGET = await getUsuarios();

//     console.log(lengthUsuarios);
//     if (respostaGET && lengthUsuarios != respostaGET.length) {
//       lengthUsuarios = respostaGET.length;
//       iniciarBuscaUsuarios();
//     }
//   })();
// }, 1500);

iniciarBuscaUsuarios();
