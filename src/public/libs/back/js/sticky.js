window.onscroll = function(){
  stickyNavbar()
};

var navbar = document.getElementById('navbar-default');
var sticky = navbar.offsetTop;

function stickyNavbar(){

  if(window.pageYOffset > sticky){
    $('#navbar-default').css('display', 'none');
    $('#navbar-fixed').css('display', 'block');
  }else{
    $('#navbar-fixed').css('display', 'none');
    $('#navbar-default').css('display', 'block');
  }
}
