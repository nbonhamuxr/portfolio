(function(){
  // Mobile nav toggle
  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('header.nav');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', function(){
      nav.classList.toggle('nav-open');
    });
  });
})();
