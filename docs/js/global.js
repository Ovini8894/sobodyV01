document.addEventListener("DOMContentLoaded", () => {
  // Inicializar contador do carrinho
  updateCartBadge();

  // Lógica da barra de pesquisa
  const searchToggle = document.querySelector('.search-toggle');
  const searchBar = document.querySelector('.search-bar');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');

  if (searchToggle && searchBar && searchClose) {
    // Abrir a barra de pesquisa
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que a página role para o topo ao clicar no link "#"
      searchBar.classList.add('active');
      // Foca automaticamente no campo de texto para o usuário já começar a digitar
      setTimeout(() => searchInput.focus(), 100);
    });

    // Fechar a barra de pesquisa ao clicar no "X"
    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('active');
    });

    // Fechar também ao apertar a tecla "Esc" do teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchBar.classList.contains('active')) {
        searchBar.classList.remove('active');
      }
    });
  }

  // Lógica do Menu Hamburger (Mobile)
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');

  if (navbarToggle && navbarMenu && mobileOverlay) {
    // Abrir/Fechar menu
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
    });

    // Fechar menu ao clicar no overlay escuro
    mobileOverlay.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
      mobileOverlay.classList.remove('active');
    });

    // Fechar menu ao clicar em algum link (opcional, mas recomendado)
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
      });
    });
  }
});

function updateCartBadge() {
  const cartBadge = document.querySelector('.cart-badge');
  // Verifica se o elemento existe (pode estar comentado no HTML)
  if (cartBadge) {
    cartBadge.textContent = '0'; // Exemplo de atualização
  }
}
