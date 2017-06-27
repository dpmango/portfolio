$(document).ready(function(){

  // hamburger
  $('.mobile-navi').on('click', function(){
    $(this).find('.hamburger').toggleClass('is-active');
    $(this).parent().find('.sidebar').toggleClass('is-active');
    $(this).parent().find('.content').toggleClass('is-active');
  });

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // Set active anchor tags
  // Cache selectors
  var topMenu = $(".sidebar__navigation"),
  topMenuHeight = topMenu.outerHeight(),
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if ( item.length ) { return item; }
  });

  // Bind to scroll
  $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems.removeClass("active").filter("[href='#"+id+"']").addClass("active");
  });


  // Parallax
  function customParallax(){
    var wScroll = $(this).scrollTop();
    var HeroContainerHeight = $('.hero').height();

    // hero
    if (wScroll <= HeroContainerHeight) {
      $('.hero').css(
        'padding-top', wScroll / 25 + 'vh'
      );
    };

    //portfolio items
    if(wScroll > $('.portfolio').offset().top - ($(window).height() / 2)) {
      $('.portfolio__item').each(function(i){
        setTimeout(function(){
          $('.portfolio__item').eq(i).addClass('is-showing');
        }, (700 * (Math.exp(i * 0.1))) - 700);
      });
    }

    //contact form
    if (wScroll > $('.contact').offset().top - ($(window).height() / 3.5)) {
      $('.contact__wrapper').addClass('is-showing');
    } else{
      $('.contact__wrapper').removeClass('is-showing');
    };
  };

  // enovoke functions
  calcWidth();
  enableParallax();

  $(window).resize(function() {
    calcWidth();
    enableParallax();
  });

  function calcWidth(){
    if ( $(window).width() > 768 ) {
      desktopDetected = true;
    } else{
      desktopDetected = false;
      $('.portfolio__item').addClass('is-showing');
      $('.contact__wrapper').addClass('is-showing');
    }
  }
  function enableParallax(){
    if ( desktopDetected  == true ) {
      $(window).scroll(function() {
        customParallax();
      });
    }
  }
  // end Parallax

  // hero elements
  // var heroWidth = $('.hero').width();
  // var heroHeight = $('.hero').height();

  var scene = $('.js-scene').get(0)

  var parallax = new Parallax(scene);


  // Portflio navigation
  $('.portfolio__navi__link').click(function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
  });

  // Portfolio projects
  $('.portfolio__navi li').on('click', function(){
    var category = $(this).data('filter');
    var language = $(this).data('filter-lang');
    $('.portfolio__list .portfolio__item').each(function(){
      if ( category == "all" || $(this).data('category') == "all" || $(this).data('category') == category){
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }

      // sortby language
      if ( language == "en" ){
        if ( $(this).data('language') == 'en' ){
            $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      }

    });
  });

  // Fake click
  $('.portfolio__item').on('click', function(e){
    var url = $(this).find('a').attr('href');
    window.open(url, '_blank');
  });
  $('.portfolio__item a').on('click', function(e){
    e.preventDefault();
  })


});
