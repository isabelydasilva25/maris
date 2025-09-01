// Função para buscar cliente pelo CPF
function buscarCliente() {
  const cpf = document.getElementById("cpf-cliente").value;

  if (!cpf) {
    alert("Por favor, insira o CPF do cliente.");
    return;
  }

  fetch(`/clientes/${cpf}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cliente não encontrado.");
      }
      return response.json();
    })
    .then((cliente) => {
      const clienteInfo = document.getElementById("cliente-info");
      clienteInfo.innerHTML = `
        <p>Nome: ${cliente.nome}</p>
        <p>CPF: ${cliente.cpf}</p>
        <p>Email: ${cliente.email}</p>
      `;
    })
    .catch((error) => {
      alert(error.message);
    });
}    


// Função para adicionar produto na tabela de carrinho
function adicionartreinoNaTabela(treino, series) {
  const carrinhoBody = document.querySelector("#carrinho");

  const subtotal = produto.preco * quantidade;
  const novaLinha = document.createElement("tr");

    novaLinha.setAttribute('data-id', produto.id);
  novaLinha.innerHTML = `
    <td>${produto.id}</td>  
    <td>${produto.nome}</td>
    <td>${quantidade}</td>
    <td>R$ ${produto.preco.toFixed(2)}</td>
    <td>R$ ${subtotal.toFixed(2)}</td>
    <td><button onclick="removerProduto(this, ${subtotal})">Remover</button></td>
  `;

  carrinhoBody.appendChild(novaLinha);

  atualizarTotalVenda(subtotal);
}



// Função para atualizar o total da venda
function atualizarTotalVenda(valor) {
  const totalVendaElement = document.getElementById("total-venda");
  const valorAtual = parseFloat(totalVendaElement.getAttribute("data-total")) || 0;
  const novoTotal = valorAtual + valor;

  totalVendaElement.setAttribute("data-total", novoTotal);
  totalVendaElement.textContent = `Total: R$ ${novoTotal.toFixed(2)}`;
}

// Função para finalizar a venda
function finalizartreino() {
  const cpfCliente = document.getElementById("cpf-cliente").value;
  const totalVenda = parseFloat(document.getElementById("treino-final").getAttribute("data-treino"));

  if (!cpfCliente) {
      alert("Por favor, insira o CPF do cliente.");
      return;
  }


    function limparFormulario() {
      document.getElementById("cpf-cliente").value = "";
      document.getElementById("treino-nome ").innerHTML = "";
      document.getElementById("treino-nome1 ").innerHTML = "";
      document.getElementById("treino-nome2 ").innerHTML = "";
      document.querySelector("#carrinho").innerHTML = "";
      const totalVendaElement = document.getElementById("total-venda");
      totalVendaElement.setAttribute("data-total", "0");
      totalVendaElement.textContent = "Total: R$ 0,00";
    }

function buscarProdutos() {
    fetch('/buscar-produtos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
            return response.json();
        })
        .then(servicos => {
            const select = document.getElementById('produto-nome');
            servicos.forEach(servico => {
                const option = document.createElement('option');
                option.value = servico.id; // Usa o id como valor
                option.textContent = `${servico.nome} ------------- Disponível: ${servico.quantidade_estoque}`; // Nome do serviço exibido
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os serviços:', error);
        });
 }


// Função para buscar o relatório com filtros
function buscarRelatorio() {
  const cpf = document.getElementById("cpf").value;
  const produto = document.getElementById("produto").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;

  // Construir a URL com os parâmetros de filtro
  let url = `/relatorios?`;
  if (cpf) url += `cpf=${cpf}&`;
  if (produto) url += `produto=${produto}&`;
  if (dataInicio) url += `dataInicio=${dataInicio}&`;
  if (dataFim) url += `dataFim=${dataFim}&`;

  // Remover o último "&" se presente
  url = url.slice(0, -1);

  // Fazer a requisição para o servidor
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Limpar a tabela
          const tabelaVendas = document.getElementById("tabela-vendas");
          tabelaVendas.innerHTML = '';

          // Preencher a tabela com os dados
          data.forEach(venda => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                  <td>${venda.id}</td>
                  <td>${venda.cliente_nome}</td>
                  <td>${venda.produto_nome}</td>
                  <td>${venda.quantidade}</td>
                  <td>${new Date(venda.data).toLocaleString()}</td>
              `;
              tabelaVendas.appendChild(tr);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar relatórios:', error);
      });
}
