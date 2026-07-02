(function(){
  document.addEventListener('DOMContentLoaded', function(){

    // --- NAV ---
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('header.nav');
    if(toggle && nav){
      toggle.addEventListener('click', function(){
        nav.classList.toggle('nav-open');
      });

      document.querySelectorAll('.nav-dropdown > a').forEach(function(link){
        link.addEventListener('click', function(e){
          if(window.innerWidth > 760) return;
          var dropdown = link.parentElement;
          if(!dropdown.classList.contains('open')){
            e.preventDefault();
            document.querySelectorAll('.nav-dropdown').forEach(function(d){
              if(d !== dropdown) d.classList.remove('open');
            });
            dropdown.classList.add('open');
          }
        });
      });

      document.querySelectorAll('.nav-dropdown-menu a').forEach(function(a){
        a.addEventListener('click', function(){
          nav.classList.remove('nav-open');
          document.querySelectorAll('.nav-dropdown').forEach(function(d){ d.classList.remove('open'); });
        });
      });
    }

    // --- GALLERIES ---
    document.querySelectorAll('.gallery').forEach(function(gallery){
      var slides = gallery.querySelectorAll('.gallery-slide');
      var dots   = gallery.querySelectorAll('.gallery-dot');
      var caption = gallery.querySelector('.gallery-caption');
      var stage  = gallery.querySelector('.gallery-stage');
      if(!stage || !slides.length) return;
      var current = 0;

      function goTo(n){
        current = (n + slides.length) % slides.length;
        stage.scrollTo({ left: current * stage.offsetWidth, behavior: 'smooth' });
        dots.forEach(function(d,i){ d.classList.toggle('active', i === current); });
        if(caption) caption.textContent = slides[current].dataset.caption || '';
      }

      stage.addEventListener('scroll', function(){
        var index = Math.round(stage.scrollLeft / stage.offsetWidth);
        if(index !== current){
          current = index;
          dots.forEach(function(d,i){ d.classList.toggle('active', i === current); });
          if(caption) caption.textContent = slides[current].dataset.caption || '';
        }
      });

      var prevBtn = gallery.querySelector('.gallery-prev');
      var nextBtn = gallery.querySelector('.gallery-next');
      if(prevBtn) prevBtn.addEventListener('click', function(){ goTo(current - 1); });
      if(nextBtn) nextBtn.addEventListener('click', function(){ goTo(current + 1); });
      dots.forEach(function(dot, i){ dot.addEventListener('click', function(){ goTo(i); }); });
      goTo(0);
    });

    // --- LIGHTBOX ---
    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    var lbImg = document.createElement('img');
    var closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    overlay.appendChild(lbImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    function openLightbox(src, alt){
      lbImg.src = src;
      lbImg.alt = alt || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-slide img').forEach(function(img){
      img.addEventListener('click', function(){
        openLightbox(img.src, img.alt);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e){
      if(e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeLightbox();
    });

  });
})();
