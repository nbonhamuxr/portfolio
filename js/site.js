(function(){
  document.addEventListener('DOMContentLoaded', function(){

    // --- GALLERIES ---
    document.querySelectorAll('.gallery').forEach(function(gallery){
      var slides = gallery.querySelectorAll('.gallery-slide');
      var dots = gallery.querySelectorAll('.gallery-dot');
      var caption = gallery.querySelector('.gallery-caption');
      var stage = gallery.querySelector('.gallery-stage');
      if(!stage || !slides.length) return;
      var current = 0;
      function sync(){
        dots.forEach(function(d,i){ d.classList.toggle('active', i === current); d.setAttribute('aria-current', i === current ? 'true' : 'false'); });
        if(caption) caption.textContent = slides[current].dataset.caption || '';
      }
      function goTo(n){
        current = (n + slides.length) % slides.length;
        stage.scrollTo({ left: current * stage.offsetWidth, behavior: 'smooth' });
        sync();
      }
      stage.addEventListener('scroll', function(){
        var i = Math.round(stage.scrollLeft / stage.offsetWidth);
        if(i !== current && i >= 0 && i < slides.length){ current = i; sync(); }
      });
      var prev = gallery.querySelector('.gallery-prev');
      var next = gallery.querySelector('.gallery-next');
      if(prev) prev.addEventListener('click', function(){ goTo(current - 1); });
      if(next) next.addEventListener('click', function(){ goTo(current + 1); });
      dots.forEach(function(d, i){ d.addEventListener('click', function(){ goTo(i); }); });
      sync();
    });

    // --- LIGHTBOX ---
    var overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Enlarged image');
    var img = document.createElement('img');
    var close = document.createElement('button');
    close.className = 'lb-close';
    close.innerHTML = '&times;';
    close.setAttribute('aria-label', 'Close');
    overlay.appendChild(img);
    overlay.appendChild(close);
    document.body.appendChild(overlay);
    var lastFocus = null;
    function open(src, alt){
      lastFocus = document.activeElement;
      img.src = src; img.alt = alt || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      close.focus();
    }
    function shut(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if(lastFocus) lastFocus.focus();
    }
    document.querySelectorAll('.gallery-slide img, img[data-lightbox]').forEach(function(el){
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', function(){ open(el.src, el.alt); });
      el.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(el.src, el.alt); } });
    });
    close.addEventListener('click', shut);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) shut(); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && overlay.classList.contains('open')) shut(); });
  });
})();
