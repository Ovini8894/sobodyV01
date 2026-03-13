document.addEventListener("DOMContentLoaded", () => {
  // Inicialização do Carrossel da Hero Section (Home)
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.product-slide');
  let currentIndex = 0;

  if (track && slides.length > 0) {
    function updateCarousel() {
      if (window.innerWidth <= 768) {
        // Mobile: mostra um slide por vez
        const slideWidth = 100;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
      } else {
        // Desktop: mostra todos os slides com scroll suave
        const slideWidth = slides[0].offsetWidth + 70; // largura + gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      }
    }

    function nextSlide() {
      const maxIndex = window.innerWidth <= 768 ? slides.length - 1 : slides.length - 4;
      currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    }

    // Auto-play no mobile
    if (window.innerWidth <= 768) {
      setInterval(nextSlide, 3000);
    }

    // Atualiza no resize
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }

  // Lógica do formulário de contato (Home e outras páginas que possuírem)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnContent = submitBtn.innerHTML;

      try {
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          subject: document.getElementById('subject').value,
          message: document.getElementById('message').value
        };

        if(typeof API !== 'undefined' && API.contact && typeof API.contact.send === 'function') {
           await API.contact.send(formData);
        } else {
           // Fallback simulando envio caso API não exista ainda
           await new Promise(resolve => setTimeout(resolve, 1000));
        }

        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
      } finally {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
      }
    });
  }
});
