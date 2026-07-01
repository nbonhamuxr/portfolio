(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('header.nav');
    if(!toggle || !nav) return;

    toggle.addEventListener('click', function(){
      nav.classList.toggle('nav-open');
    });

    // Mobile: first tap on dropdown parent expands submenu; second tap follows link
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

    // Close nav when a submenu link is tapped
    document.querySelectorAll('.nav-dropdown-menu a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('nav-open');
        document.querySelectorAll('.nav-dropdown').forEach(function(d){ d.classList.remove('open'); });
      });
    });
  });
})();
