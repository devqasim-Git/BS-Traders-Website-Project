// Mobile menu open/close
  var navMenu = document.getElementById('nav-menu');
  document.getElementById('menu-toggle').addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  // Close mobile menu automatically after tapping a nav link
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
    });
  });

  // Auto-update footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Hospital city cards: tap-to-open on mobile/touch (hover only works with a mouse) ---
  var cityCards = document.querySelectorAll('.city-card');
  cityCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      var isTouchLayout = window.matchMedia('(hover: none), (max-width: 991px)').matches;
      if (!isTouchLayout) return; // let :hover handle it on desktop
      var wasActive = card.classList.contains('active');
      cityCards.forEach(function (c) { c.classList.remove('active'); });
      if (!wasActive) card.classList.add('active');
    });
  });

  // --- Scroll-reveal: fade + rise elements into view as the user scrolls ---
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback for very old browsers: just show everything
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // --- Animated stat counters: count up once the stats bar scrolls into view ---
  var statNums = document.querySelectorAll('.stat .num[data-target]');
  if (statNums.length && 'IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1200;
        var start = null;
        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          el.textContent = Math.floor(progress * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    statNums.forEach(function (el) { countObserver.observe(el); });
  }

  // Contact form — currently just shows a confirmation message.
  // To actually receive these messages by email, connect this
  // form to a free service like Formspree (formspree.io):
  // 1. Sign up and get a form endpoint URL from them.
  // 2. Replace the code below with a normal form POST to that URL.
  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('form-status').textContent =
      "Thanks! We'll get back to you soon.";
    e.target.reset();
  });

new Swiper(".partnerSwiper",{

slidesPerView:6,
spaceBetween:25,
slidesPerGroup:1,
loop:true,

autoplay:{
delay:3000,
disableOnInteraction:false,
pauseOnMouseEnter:true
},

navigation:{
nextEl:".swiper-button-next",
prevEl:".swiper-button-prev"
},

breakpoints:{
0:{slidesPerView:2},
768:{slidesPerView:3},
992:{slidesPerView:4},
1200:{slidesPerView:6}
}

});
