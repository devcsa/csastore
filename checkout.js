import { desenharProdutoCarrinhoSimples, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage, catalogo } from "./src/utilidades";

function desenharProdutosCheckout() {
   const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
   for (const idProduto in idsProdutoCarrinhoComQuantidade) {
      desenharProdutoCarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
   }

   // Atualizar Total do Pedido na Área de Checkou
   const precoCarrinho = document.getElementById("preco-total");
   let precoTotalCarrinho = 0;

   for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
      precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
   }

   precoCarrinho.innerText = `Total: ${precoTotalCarrinho.toLocaleString("pt-br", { style: "currency", currency: "brl" })}`;
}

function finalizarCompra(evento) {
   evento.preventDefault();
   const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
   if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
      return;
   }

   const dataAtual = new Date();
   const pedidoFeito = {
      dataPedido: dataAtual,
      pedido: idsProdutoCarrinhoComQuantidade,
   };
   const historicoDePedidos = lerLocalStorage("historico") ?? [];
   const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

   salvarLocalStorage("historico", historicoDePedidosAtualizado);
   apagarDoLocalStorage("carrinho");

   window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
