(function(){
  // Theme toggle
  var sheet = document.getElementById('theme-stylesheet');
  if(sheet){
    var SPLAT = 'css/style.css';
    var SNES  = 'css/style-snes.css';
    if(localStorage.getItem('nate-theme') === 'snes') sheet.href = SNES;
    document.addEventListener('keydown', function(e){
      if(e.key !== 't' && e.key !== 'T') return;
      var isSnes = sheet.href.indexOf('style-snes') !== -1;
      sheet.href = isSnes ? SPLAT : SNES;
      localStorage.setItem('nate-theme', isSnes ? 'splatoon' : 'snes');
    });
  }

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
