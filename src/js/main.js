$(document).ready(function(){

 	// Prevent # errors
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body').animate({
            scrollTop: $(el).offset().top}, 1000);
        return false;
	});

  // Portflio navigation
  $('.portfolio__navi__link').click(function(){
    $(this).siblings().removeClass('active')
    $(this).addClass('active')
  });

  // Parallax
  $(window).scroll(function() {
		var wScroll = $(this).scrollTop();
    var HeroContainerHeight = $('.hero').height();

    // hero
    if (wScroll <= HeroContainerHeight) {
      $('.hero').css(
        'padding-top', wScroll / 25 + 'vh'
      );
    };
    $('.parallax__heading').css(
      'padding-top', wScroll / 50 + 'vh'
    )

    //portfolio items
    if(wScroll > $('.portfolio').offset().top - ($(window).height() / 2)) {
      $('.portfolio__item').each(function(i){
        setTimeout(function(){
          $('.portfolio__item').eq(i).addClass('is-showing');
        }, (700 * (Math.exp(i * 0.2))) - 700);
      });
    }

  });
  // end Parallax

  // Portfolio projects
  $('.portfolio__navi li').on('click', function(){
    var category = $(this).data('filter');
    $('.portfolio__list .portfolio__item').each(function(){
      if ( category == "all" || $(this).data('category') == "all" ){
        $(this).fadeIn();
      } else if ( $(this).data('category') != category ){
        $(this).fadeOut();
      } else {
        $(this).fadeIn();
      }
    });
  });

  // Calculator logic

  // $('input[type="range"]').rangeslider({
  //     polyfill: false,
  //
  //     onInit: function() {},
  //     onSlide: function(position, value) {},
  //     onSlideEnd: function(position, value) {}
  // });

  const $element = $('input[type="range"]');
  const $tooltip = $('#range-tooltip');
  const sliderStates = [
    {name: "low", tooltip: "Great, we're confident we can complete your project within <strong>24 hours</strong> of launch.", range: _.range(1, 7) },
    {name: "med", tooltip: "Looks good! We can complete a project of this size within <strong>48 hours</strong> of launch.", range: _.range(7, 20)},
    {name: "high", tooltip: "With a project of this size we'd like to talk with you before setting a completion timeline.", range: [21] },
  ];
  var currentState;
  var $handle;

  $element
    .rangeslider({
      polyfill: false,
      onInit: function() {
        $handle = $('.rangeslider__handle', this.$range);
        updateHandle($handle[0], this.value);
        updateState($handle[0], this.value);
      }
    })
    .on('input', function() {
      updateHandle($handle[0], this.value);
      checkState($handle[0], this.value);
    });

  // Update the value inside the slider handle
  function updateHandle(el, val) {
    el.textContent = val;
  }

  // Check if the slider state has changed
  function checkState(el, val) {
    // if the value does not fall in the range of the current state, update that shit.
    if (!_.contains(currentState.range, parseInt(val))) {
      updateState(el, val);
    }
  }

  // Change the state of the slider
  function updateState(el, val) {
    for (var j = 0; j < sliderStates.length; j++){
      if (_.contains(sliderStates[j].range, parseInt(val))) {
        currentState = sliderStates[j];
        // updateSlider();
      }
    }
    // If the state is high, update the handle count to read 50+
    if (currentState.name == "high") {
      updateHandle($handle[0], "20+");
    }
    // Update handle color
    $handle
      .removeClass (function (index, css) {
      return (css.match (/(^|\s)js-\S+/g) ||   []).join(' ');
    })
      .addClass("js-" + currentState.name);
    // Update tooltip
    $tooltip.html(currentState.tooltip);
  }

  // ONCHANGE
  $('.calculator__form input').on('change', function(){
    var result = 0

    function calculate(){
      // Variables
      var stage1 = $('#stage1').prop('checked');
      var stage2 = $('#stage2').prop('checked');
      var stage3 = $('#stage3').prop('checked');
      var projectType1 = $('#projectType1').prop('checked');
      var projectType2 = $('#projectType2').prop('checked');
      var projectType3 = $('#projectType3').prop('checked');
      var projectType4 = $('#projectType4').prop('checked');
      var responsive = $('#features1').prop('checked');
      var react = $('#features2').prop('checked');
      var modx = $('#features3').prop('checked');
      var javascript = $('#features4').prop('checked');
      var mobileFirst = $('#features5').prop('checked');
      var features = 1;
      var multiplicatior = 1;

      // stage 1
      if ( $('.calculator__form__group--forStep1').is('.is-active') ){
        if ( stage1 && stage2 && stage3 ){
          result = 2.5
        } else if ( stage1 && stage2 ) {
          result = 1.5
        } else if ( stage2 && stage3 ) {
          result = 2
        } else if ( stage1 && stage3 ) {
          result = 1.5
        } else if ( stage1 ) {
          result = 0.5
        } else if ( stage2 ) {
          result = 1
        } else if ( stage3 ) {
          result = 1
        }

        if ( stage1 || stage2 || stage3 ){
          $('.calculator__form__group--forStep2').addClass('is-active');
        } else {
          $('.calculator__form__group--forStep2').removeClass('is-active');
          $('.calculator__form__group--forStep3').removeClass('is-active');
          $('.calculator__form__group--forStep4').removeClass('is-active');
        }
      }

      // stage 2
      if ( $('.calculator__form__group--forStep2').is('.is-active') ){
        if ( projectType1 ){
          result = result * 1
        } else if ( projectType2 ) {
          result = result * 0.75
        } else if ( projectType3 ) {
          result = result * 1.5
        } else if ( projectType4 ) {
          result = result * 1.75
        }

        if ( projectType1 || projectType2 || projectType3 || projectType4 ) {
          $('.calculator__form__group--forStep3').addClass('is-active');
        }
        if ( projectType2 ){
          $('.calculator__form__group--forStep3 .calculator__form__heading span').text('How many screens have to be made?');
        } else {
          $('.calculator__form__group--forStep3 .calculator__form__heading span').text('How many pages have to be made ?');
        }

        // Set featured options
        if ( stage2 ) { $('.featureFifth').addClass('active'); } else { $('.featureFifth').removeClass('active'); }
        if ( stage3 ) { $('.featureFirst, .featureForth').addClass('active'); } else { $('.featureFirst, .featureForth').removeClass('active'); }
        if ( stage3 && (projectType3 || projectType4) ) { $('.featureSecond').addClass('active'); } else { $('.featureSecond').removeClass('active'); }
        if ( stage3 && (projectType1 || projectType2 || projectType3) ) { $('.featureThird').addClass('active'); } else { $('.featureThird').removeClass('active'); }
      };

      // stage 3
      if ( $('.calculator__form__group--forStep3').is('.is-active') ){
        var sliderVal = $('#calcPages').val();
        if (sliderVal < 5){
          var multiplicatior = 1.5
        } else if(sliderVal < 10){
          var multiplicatior = 1.25
        } else if(sliderVal < 15){
          var multiplicatior = 1
        } else if(sliderVal < 20){
          var multiplicatior = 0.75
        }
        result = result * (sliderVal * multiplicatior);

        $('.calculator__form__group--forStep4').addClass('is-active');

      };

      // stage 4
      if ( $('.calculator__form__group--forStep3').is('.is-active') ){

        if(responsive){
          features = features * 1.4
        }
        if(react){
          features = features * 1.5
        }
        if(modx){
          features = features * 1.3
        }
        if(javascript){
          features = features * 1.3
        }
        if(mobileFirst){
          features = features * 1.2
        }
        result = result * features

      }

    };

    function setPrice(){
      if (result > 0){
        result = Math.round(result * 10) / 10;
        $('.calculator__form__price').css('opacity', 1);
        $('.calculator__form__price__result span').text(result);
      } else{
        $('.calculator__form__price').css('opacity', 0);
      }
    };
    setTimeout(calculate, 200);
    setTimeout(setPrice, 200);

  });
  // End calculator logic


});
