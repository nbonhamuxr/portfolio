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

    // --- LIGHTBOX (with swipe and arrows for gallery images) ---
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
    var prevBtn = document.createElement('button');
    prevBtn.className = 'lb-nav lb-prev';
    prevBtn.innerHTML = '&#8592;';
    prevBtn.setAttribute('aria-label', 'Previous image');
    var nextBtn = document.createElement('button');
    nextBtn.className = 'lb-nav lb-next';
    nextBtn.innerHTML = '&#8594;';
    nextBtn.setAttribute('aria-label', 'Next image');
    var count = document.createElement('div');
    count.className = 'lb-count';
    overlay.appendChild(img);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(count);
    overlay.appendChild(close);
    document.body.appendChild(overlay);

    var group = [], idx = 0, lastFocus = null;
    function show(){
      var el = group[idx];
      img.src = el.src; img.alt = el.alt || '';
      var multi = group.length > 1;
      prevBtn.style.display = nextBtn.style.display = count.style.display = multi ? '' : 'none';
      count.textContent = multi ? (idx + 1) + ' / ' + group.length : '';
    }
    function open(el){
      lastFocus = document.activeElement;
      var gal = el.closest('.gallery');
      group = gal ? Array.prototype.slice.call(gal.querySelectorAll('.gallery-slide img')) : [el];
      idx = Math.max(0, group.indexOf(el));
      show();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      close.focus();
    }
    function step(d){ if(group.length < 2) return; idx = (idx + d + group.length) % group.length; show(); }
    function shut(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      if(lastFocus) lastFocus.focus();
    }
    document.querySelectorAll('.gallery-slide img, img[data-lightbox]').forEach(function(el){
      el.setAttribute('tabindex', '0');
      el.addEventListener('click', function(){ open(el); });
      el.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(el); } });
    });
    prevBtn.addEventListener('click', function(e){ e.stopPropagation(); step(-1); });
    nextBtn.addEventListener('click', function(e){ e.stopPropagation(); step(1); });
    close.addEventListener('click', shut);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) shut(); });
    document.addEventListener('keydown', function(e){
      if(!overlay.classList.contains('open')) return;
      if(e.key === 'Escape') shut();
      else if(e.key === 'ArrowLeft') step(-1);
      else if(e.key === 'ArrowRight') step(1);
    });
    var sx = null, sy = null;
    overlay.addEventListener('touchstart', function(e){ var p = e.changedTouches[0]; sx = p.clientX; sy = p.clientY; }, { passive: true });
    overlay.addEventListener('touchend', function(e){
      if(sx === null) return;
      var p = e.changedTouches[0], dx = p.clientX - sx, dy = p.clientY - sy;
      if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      sx = sy = null;
    }, { passive: true });
  });
})();
