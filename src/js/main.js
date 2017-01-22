$(document).ready(function(){

  // language
  var userLang = navigator.language || navigator.userLanguage;
  var lang = new Lang();
  lang.dynamic('ru', '/js/langpack/ru.json');

  lang.init({
      defaultLang: 'en'
  });

  // if(userLang.split('-')[0] == 'ru') {
  //   lang.init({
  //       defaultLang: 'en',
  //       currentLang: 'ru',
  //   });
  // } else {
  //   lang.init({
  //       defaultLang: 'en'
  //   });
  // }

  // switch language
  $('.sidebar__lang').on('click', function(){
    if ($(this).is('.en')){
      lang.change('ru');
      $(this).removeClass('en').addClass('ru');
    } else {
      lang.change('en');
      $(this).removeClass('ru').addClass('en');
    }
    return false;
  });

  // hamburger
  $('.mobile-navi').on('click', function(){
    $(this).find('.hamburger').toggleClass('is-active');
    $(this).parent().find('.sidebar').toggleClass('is-active');
  });

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
        }, (700 * (Math.exp(i * 0.14))) - 700);
      });
    }

    //contact form
    if (wScroll > $('.contact').offset().top - ($(window).height() / 3.5)) {
      $('.contact__wrapper').addClass('is-showing');
    } else{
      $('.contact__wrapper').removeClass('is-showing');
    };
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
  const lowText = lang.translate('Great! Seems to be an simple project and could be compleated quite fast');
  const midText = lang.translate('Awesome! You have an serious project with complex business logic');
  const highText = lang.translate('With a project of this size I would like to talk with you before setting an correct budjet.');
  const sliderStates = [
    {name: "low", tooltip: lowText, range: _.range(1, 7) },
    {name: "med", tooltip: midText, range: _.range(7, 20)},
    {name: "high", tooltip: highText, range: [21] },
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
          $('.calculator__form__group--forStep3 .calculator__form__heading span').text(lang.translate('How many screens have to be made?'));
        } else {
          $('.calculator__form__group--forStep3 .calculator__form__heading span').text(lang.translate('How many pages have to be made ?'));
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

  // Contact form
  $('.btn--contact').on('click', function(e){
    if ($(this).is('.validateTextarea')){
      e.preventDefault();
      var textAreaVal = $(this).closest('.contact__form').find('textarea').val();
      if(textAreaVal != '' && textAreaVal.length >= 10 ) {
        $('.contact__form__textarea-validation').fadeOut();
        $('.contact__form__field--first').removeClass('active');
        $('.contact__form__field--second').addClass('active');
        $(this).removeClass('validateTextarea').addClass('readyToSend').text('Send');
        $('.contact__form__back').addClass('active');
      } else {
        $('.contact__form__textarea-validation').fadeIn();
      }
    } else {
      var formData = {
          'message'           : $('textarea[name=message]').val(),
          'email'             : $('input[name=email]').val()
      };

      $.ajax({
        type        : 'POST',
        url         : 'contact.php',
        data        : formData,
        dataType    : 'json',
        encode      : true
      }).done(function(data) {

          if ( ! data.success) {

              if (data.errors.message) {
                $('.contact__form').append('<div class="help-block">' + data.errors.name + '</div>'); // add the actual error message under our input
              }
              if (data.errors.email) {
                $('.contact__form').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
              }

          } else {
            $('.contact__form__field').fadeOut();
            $('.contact__form').append('<div class="contact__form__success">' + data.message + '</div>');
          }
        }).fail(function(data) {
          console.log(data);
        });

      e.preventDefault();
    }
  });

  $('.contact__form__back').on('click', function(){
    $('.contact__form__field--first').addClass('active');
    $('.contact__form__field--second').removeClass('active');
    $('.btn--contact').removeClass('readyToSend').addClass('validateTextarea').text('Next');;
    $('.contact__form__back').removeClass('active');
  });


  $('input[type=email]').blur(function() {
      if($(this).val() != '') {
          var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(pattern.test($(this).val())){
              $('.input__label--kuro').removeClass('not-valid').addClass('valid');
              // $('#valid').text('Верно');
          } else {
              $('.input__label--kuro').removeClass('valid').addClass('not-valid');
              // $('#valid').text('Не верно');
          }
      } else {
          $('.input__label--kuro').removeClass('valid').addClass('not-valid');
          // $('#valid').text('Поле email не должно быть пустым');
      }
  });

  // Text input
  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  })();

});



// textarea autoExpand
$(document)
  .one('focus.autoExpand', 'textarea.autoExpand', function(){
      var savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
  })
  .on('input.autoExpand', 'textarea.autoExpand', function(){
      var minRows = this.getAttribute('data-min-rows')|0, rows;
      this.rows = minRows;
      rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
      this.rows = minRows + rows;
  });
