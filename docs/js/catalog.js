document.addEventListener("DOMContentLoaded", () => {
  const products = Array.from(document.querySelectorAll('.catalog-product-card'));
  const paginationContainer = document.querySelector('.catalog-pagination');
  
  // Quantos produtos mostrar por página
  const itemsPerPage = 8;
  let currentPage = 1;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  function goPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    
    // Exibe apenas os produtos da página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    products.forEach((product, index) => {
      if (index >= startIndex && index < endIndex) {
        product.style.display = ''; // Volta ao padrão do CSS (flex)
      } else {
        product.style.display = 'none'; // Oculta
      }
    });

    renderPagination();
    
    // Faz a tela rolar suavemente para o topo do catálogo ao trocar de página
    const catalogSection = document.querySelector('.catalog-section');
    if (catalogSection && currentPage !== 1) { // Só rola se não for o primeiro carregamento
      const offsetTop = catalogSection.getBoundingClientRect().top + window.scrollY - 100; // -100px para o navbar
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  function renderPagination() {
    if (!paginationContainer) return;
    
    // Se não tiver páginas suficientes para paginar, podemos esconder a barra
    if (totalPages <= 1) {
      paginationContainer.style.display = 'none';
      return;
    } else {
      paginationContainer.style.display = 'flex';
    }

    let html = '';
    
    // Botão Anterior
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    html += `<button class="pagination-btn" id="prev-btn" ${prevDisabled}><i class="fas fa-chevron-left"></i></button>`;

    // Números das páginas
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = currentPage === i ? 'active' : '';
        html += `<button class="pagination-btn page-num ${activeClass}" data-page="${i}">${i}</button>`;
    }

    // Botão Próximo
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    html += `<button class="pagination-btn" id="next-btn" ${nextDisabled}><i class="fas fa-chevron-right"></i></button>`;

    paginationContainer.innerHTML = html;

    // Registra os eventos de clique
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn && !prevBtn.hasAttribute('disabled')) {
      prevBtn.addEventListener('click', () => goPage(currentPage - 1));
    }

    const nextBtn = document.getElementById('next-btn');
    if (nextBtn && !nextBtn.hasAttribute('disabled')) {
      nextBtn.addEventListener('click', () => goPage(currentPage + 1));
    }

    const pageBtns = document.querySelectorAll('.pagination-btn.page-num');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = parseInt(e.target.dataset.page);
        goPage(page);
      });
    });
  }

  // Inicializa a paginação (se houver produtos)
  if (products.length > 0) {
    goPage(1);
    
    // Corrigindo comportamento de scroll inicial
    window.scrollTo(0, 0);
  }

  // --- Lógica do Modal de Produto ---
  const productModal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalImagePlaceholder = document.getElementById('modalImagePlaceholder');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');

  products.forEach(card => {
    card.style.cursor = 'pointer'; // Indica que o card inteiro é clicável
    card.addEventListener('click', (e) => {
      // Evita abrir o modal se clicar no botão "Adicionar ao Carrinho"
      if (e.target.closest('.add-to-cart-btn')) return;
      
      const name = card.dataset.name;
      const priceText = card.querySelector('.price').innerText;
      
      // Busca a imagem do card, se houver
      const imgEl = card.querySelector('img');
      if (imgEl && imgEl.hasAttribute('src') && imgEl.src !== "") {
        modalImage.src = imgEl.src;
        modalImage.style.display = 'block';
        modalImagePlaceholder.style.display = 'none';
      } else {
        modalImage.style.display = 'none';
        modalImagePlaceholder.style.display = 'flex';
      }

      modalTitle.innerText = name;
      modalPrice.innerText = priceText;
      
      productModal.classList.add('active');
    });
  });

  if (modalClose && productModal) {
    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    // Fecha o modal se clicar fora da caixa branca
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        productModal.classList.remove('active');
      }
    });
  }

  // --- Lógica do Filtro Mobile ---
  const mobileFilterBtn = document.getElementById('mobile-filter-btn');
  const catalogFilters = document.getElementById('catalog-filters-sidebar');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');

  if (mobileFilterBtn && catalogFilters && mobileOverlay) {
    mobileFilterBtn.addEventListener('click', () => {
      catalogFilters.classList.add('active');
    });

    // Clicar fora (no overlay escuro) para fechar
    mobileOverlay.addEventListener('click', () => {
      catalogFilters.classList.remove('active');
    });
  }
});
