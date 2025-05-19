document.addEventListener('DOMContentLoaded', function () {
  // Toggle navbar
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Carousel/Slider Logic
  const carousel = document.querySelector('.hero-carousel');
  const carouselItems = document.querySelectorAll('.carousel-item');

  if (carousel && carouselItems.length > 0) {
    let currentIndex = 0;

    function goToSlide(index) {
      carousel.style.transform = `translateX(-${index * 100}%)`;
      carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      goToSlide(currentIndex);
    }

    // Optional autoplay
    setInterval(nextSlide, 5000);
  }

  // Cart functionality
  const cart = [];
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const closeCartBtn = document.getElementById('close-cart');

  if (closeCartBtn && cartModal) {
    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.add('hidden');
    });

    document.querySelector('.cart-icon')?.addEventListener('click', () => {
      cartItemsList.innerHTML = '';
      if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
      } else {
        cart.forEach(item => {
          const li = document.createElement('li');
          li.textContent = `${item.title} – ${item.price}`;
          cartItemsList.appendChild(li);
        });
      }
      cartModal.classList.remove('hidden');
    });
  }

  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const menuItem = button.closest('.menu-item');
      const title = menuItem.querySelector('.menu-item-title').textContent;
      const price = menuItem.querySelector('.menu-item-price').textContent;

      cart.push({ title, price });
      cartCount.textContent = cart.length;
    });
  });

  // Contact Form Validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const successMessage = document.getElementById('success-message');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      successMessage.style.display = 'none';

      let isValid = true;

      if (nameInput.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters.';
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Enter a valid email address.';
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        messageError.textContent = 'Message must be at least 10 characters.';
        isValid = false;
      }

      if (isValid) {
        successMessage.style.display = 'block';
        form.reset();
      }
    });
  }
});
