$(document).ready(function() {
  var content = $('#content');
  var cloak = $('#cloak');
  var nav = $('#menu');
  var lastScrollTop = 0;

  function change(href){
    cloak.css('transition', 'all .3s');
    cloak.css('transform', 'translateY(0)');
    setTimeout(function(){
      content.load(href + ' #content > *', loaded);
    }, 300);
  }

  function loaded(){
    setTimeout(function(){
      reset();
      cloak.css('transform', 'translateY(100%)');
    }, 300);
    setTimeout(function(){
      cloak.css('transition', 'none');
      cloak.css('transform', 'translateY(-100%)');
    }, 600);
  }

  $(window).scroll(function(e){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
      nav.addClass('hide');
    } else{
      nav.removeClass('hide');
    }
    lastScrollTop = st;
  });

  $(window).on('popstate', function(e){
    change(location.href);
  });

  $(document).on('click', 'a', function(e){
    e.preventDefault();
    var href = $(this).attr('href');

    change(href);
    history.pushState(null, null, href);
  });

  //TODO find a way to bind all functions in one $(document).on...

  //Fades in mail form
  $(document).on('click', '#sub', function(){
    $('.modal').fadeIn(300);
  });

  //Hides modal on click
  $(document).on('click', '.modal', function(){
    $(this).fadeOut(300);
  });

  //Disable hide when click is on .form
  $(document).on('click', '.form', function(e){
    e.stopPropagation();
  });

  $(document).on('focus', 'input', function(){
    $(this).parent().addClass('focused');
  });
  $(document).on('focusout', 'input', function(){
    if($(this).val()){

    }else{
      $(this).parent().removeClass('focused');
    }

  });

});
