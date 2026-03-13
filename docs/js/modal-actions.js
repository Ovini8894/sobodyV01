/**
 * Lógica de Encomenda do Modal de Produto.
 * Arquivo criado especificamente para configurar a ação do botão "Encomendar" no pop-up do catálogo.
 */
document.addEventListener("DOMContentLoaded", () => {
  const orderModalBtn = document.getElementById('orderModalBtn');

  if (orderModalBtn) {
    orderModalBtn.addEventListener('click', (e) => {
      // Previne qualquer comportamento padrão do botão se estiver dentro de um form
      e.preventDefault();

      // Você pode capturar os dados do produto aberto no modal assim:
      const modalTitle = document.getElementById('modalTitle').innerText;
      const modalPrice = document.getElementById('modalPrice').innerText;
      
      console.log(`Botão 'Encomendar' clicado para o produto: ${modalTitle} - ${modalPrice}`);
      
      // ========================================================
      // INSIRA A SUA LÓGICA DE PROGRAMAÇÃO AQUI
      // Ex: Redirecionar para o WhatsApp, abrir janela nova de compra, etc.
      // ========================================================
      
      
      // Exemplo fictício de redirecionamento:
      // const message = `Olá, gostaria de encomendar o produto: ${modalTitle} por ${modalPrice}`;
      // window.open(`https://wa.me/SEU_NUMERO?text=${encodeURIComponent(message)}`, '_blank');
      
    });
  }
});
