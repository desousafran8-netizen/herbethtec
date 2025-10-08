let produtos = [];

function mostrarCadastro() {
  document.getElementById("cadastro").classList.add("ativo");
  document.getElementById("cadastro").classList.remove("oculto");
  document.getElementById("vitrine").classList.add("oculto");
  document.getElementById("nota").classList.add("oculto");
}

function mostrarVitrine() {
  document.getElementById("cadastro").classList.add("oculto");
  document.getElementById("vitrine").classList.remove("oculto");
  document.getElementById("nota").classList.add("oculto");
  exibirProdutos();
}

document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeProduto").value;
  const valor = parseFloat(document.getElementById("valorProduto").value).toFixed(2);
  const foto = document.getElementById("fotoProduto").files[0];

  if (foto) {
    const reader = new FileReader();
    reader.onload = function() {
      const novoProduto = { nome, valor, foto: reader.result };
      produtos.push(novoProduto);
      alert("✅ Produto cadastrado com sucesso!");
      document.getElementById("formCadastro").reset();
    };
    reader.readAsDataURL(foto);
  }
});

function exibirProdutos() {
  const lista = document.getElementById("listaProdutos");
  lista.innerHTML = "";

  if (produtos.length === 0) {
    lista.innerHTML = "<p>Nenhum produto cadastrado ainda 😅</p>";
    return;
  }

  produtos.forEach((p, index) => {
    const card = document.createElement("div");
    card.classList.add("produto");

    card.innerHTML = `
      <img src="${p.foto}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>💰 R$ ${p.valor}</p>
      <button onclick="venderProduto(${index})">Comprar 🛒</button>
    `;
    lista.appendChild(card);
  });
}

function venderProduto(i) {
  const produto = produtos[i];
  const data = new Date();
  const dataCompra = data.toLocaleDateString();
  const horaCompra = data.toLocaleTimeString();

  const detalhes = `
    <p><strong>Produto:</strong> ${produto.nome}</p>
    <p><strong>Valor:</strong> R$ ${produto.valor}</p>
    <p><strong>Data:</strong> ${dataCompra}</p>
    <p><strong>Hora:</strong> ${horaCompra}</p>
    <p>🛍️ Obrigado pela sua compra na <b>Kailan Eletrônicos</b>!</p>
  `;

  document.getElementById("detalhesNota").innerHTML = detalhes;

  // mostra a nota e oculta as outras telas
  document.getElementById("vitrine").classList.add("oculto");
  document.getElementById("nota").classList.remove("oculto");
}

function imprimirNota() {
  window.print();
}

function voltarParaVitrine() {
  mostrarVitrine();
}
