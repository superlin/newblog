/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/
var themeApp = {
	sidebarConfig:function() {
		if(sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		  });
	},
	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	},
	init: function() {
		themeApp.sidebarConfig();
		themeApp.highlighter();
		themeApp.backToTop();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
  themeApp.init();

  /* ---------------------------------------------------------------------- */
  /* -------------------------- Contact Form ------------------------------ */
  /* ---------------------------------------------------------------------- */

  function checkmessage(msg){
      var msg_error = msg.split(",");
      var output_error = 'Fail to send a message';
      var $success = ' Your message has been sent. Thank you!';
			var response = '';

      if (msg_error.indexOf('error-message') != -1) {
          $("#contact-message").addClass("has-error");
          $("#contact-message").removeClass("has-success");
          output_error = 'Please enter your message.';
      } else {
          $("#contact-message").addClass("has-success");
          $("#contact-message").removeClass("has-error");
      }

      if (msg_error.indexOf('error-email') != -1) {

          $("#contact-email").addClass("has-error");
          $("#contact-email").removeClass("has-success");
          output_error = 'Please enter valid e-mail.';
      } else {
          $("#contact-email").addClass("has-success");
          $("#contact-email").removeClass("has-error");
      }

      if (msg_error.indexOf('error-name') != -1) {
          $("#contact-name").addClass("has-error");
          $("#contact-name").removeClass("has-success");
          output_error = 'Please enter your name.';
      } else {
          $("#contact-name").addClass("has-success");
          $("#contact-name").removeClass("has-error");
      }

      if (msg == 'success') {

          response = '<div class="alert alert-success success-send">' +
                  '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + $success + '</div>';

          $(".reset").trigger('click');
          $("#contact-name").removeClass("has-success");
          $("#contact-email").removeClass("has-success");
          $("#contact-message").removeClass("has-success");

      } else {

          response = '<div class="alert alert-danger error-send">' +
                  '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + output_error + '</div>';

      }
      // Hide any previous response text
      $(".error-send,.success-send").remove();
      // Show response message
      $contactform.prepend(response);
  }

  // Needed variables
  var $contactform = $('#contactform');

  $('#contactform').submit(function() {
      var name = $("#contact-name").find("input").val();
      var email = $("#contact-email").find("input").val();
      var message = $("#contact-message").find("textarea").val();
      var errors = [];
      if(name === ""){
          errors.push("error-name");
      }
      if(message === ""){
          errors.push("error-message");
      }
      var expr = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(expr.test(email) == false){
          errors.push("error-email");
      }
      if(errors.length != 0){
          checkmessage(errors.join(","));
          return false;
      }
      $("#contact button").attr('disabled', true);
      $.ajax({
          type: "POST",
          url: "/message",
          data: $(this).serialize(),
          success: checkmessage,
          complete: function () {
          	$("#contact button").attr('disabled', false);
          }
      });
      return false;
  });
});


/**********************************************
***********************************************
***********************************************
**********
********** jquery.demoscript.css
**********
***********************************************
***********************************************
**********************************************/


$(document).ready(function(){
  "use strict";
  $('#setting_panel_toggle').on("click", function(e){
    e.preventDefault();
    $('#setting_panel').toggleClass('settings-show');
  });
  var saved_color = $.cookie('chosen_color');
  $('#picker_holder').colpick({
    flat:true,
    layout:'hex',
    submit:0,
    colorScheme: 'dark',
    color: '00ada7',

    onChange: function(hsb,hex,rgb){
      $('#jqstyle').remove();

      var color = '#'+hex;
      var rgb_color = rgb.r+','+rgb.g+','+rgb.b;
      var styles = String('');
      styles += '<style id="jqstyle">'
      styles += 'a, a:hover{color: '+color+';}'
      styles += '.btn-default {border: 1px solid '+color+'; background:'+color+';}'
      styles += 'textarea:focus {border: 1px solid '+color+';}'
      styles += 'input[type="search"]:focus, input[type="text"]:focus, input[type="url"]:focus, input[type="email"]:focus, textarea:focus {border: 1px solid '+color+';}'
      styles += 'blockquote {border-left: 4px solid '+color+';}'
      styles += '::-moz-selection{background: '+color+';}'
      styles += '::selection{background: '+color+';}'
      styles += '.main-header {background-color: '+color+';}'
      styles += '.main-navigation .menu li:hover > a {color: '+color+';}'
      styles += '.main-navigation .menu li ul:hover > a {color: '+color+';}'
      styles += '.post .featured {background: '+color+';}'
      styles += '.post .post-footer .tag-list a:hover {color: '+color+';}'
      styles += '.post .post-footer .share .share-icons li a:hover i {background: '+color+'; border: 1px solid '+color+';}'
      styles += '.pagination a {background: '+color+';}'
      styles += '.pagination .page-number {background: '+color+';}'
      styles += '.widget .title:after {background: '+color+';}'
      styles += '.widget .social li a:hover i {background: '+color+'; border: 1px solid '+color+';}'
      styles += '.widget .tag-cloud a:hover {background: '+color+'; border: 1px solid '+color+';}'
      styles += '.widget .recent-post .recent-single-post .post-title:hover {color: '+color+';}'
      styles += '.main-footer .widget .tag-cloud a:hover {border: 1px solid '+color+';}'
      styles += '.main-footer .widget .recent-post .recent-single-post .post-title:hover {color: '+color+';}'
      styles += '#back-to-top {background: rgba('+rgb_color+', 0.6);}'
      styles += '#back-to-top:hover {background: '+color+';}'
      styles += '@media (max-width: 767px) {.main-navigation .menu li:hover > a {color: '+color+';}'
      styles += '</style>';
      $( styles ).appendTo( "head" );
      $.cookie('chosen_color', hex, { expires: 3, path: '/' });
    }
  });
  if(saved_color !== undefined) {
    $('#picker_holder').colpickSetColor(saved_color);
  } else {
    $('#picker_holder').colpickSetColor("00ada7");
  }
  $('#default_color').on('click', function(){
    $('#picker_holder').colpickSetColor("00ada7");
  });
  // sidebar settings
  var sidebar_position = $.cookie('sp');
  if(sidebar_position == 'left') {
    $('.main-content').addClass('col-md-push-4');
    $('.sidebar').addClass('col-md-pull-8');
    $('#left_sb').addClass('active');
    $('#right_sb').removeClass('active');
    $.cookie('sp', 'left', { expires: 3, path: '/' });
  }
  $('#left_sb').on('click', function(){
    $('.main-content').addClass('col-md-push-4');
    $('.sidebar').addClass('col-md-pull-8');
    $(this).addClass('active');
    $('#right_sb').removeClass('active');
    $.cookie('sp', 'left', { expires: 3, path: '/' });
  });
  $('#right_sb').on('click', function(){
    $('.main-content').removeClass('col-md-push-4');
    $('.sidebar').removeClass('col-md-pull-8');
    $(this).addClass('active');
    $('#left_sb').removeClass('active');
    $.cookie('sp', 'right', { expires: 3, path: '/' });
  });
});


/**********************************************
***********************************************
***********************************************
**********
********** colorpick插件
**********
***********************************************
***********************************************
**********************************************/


/*
colpick Color Picker
Copyright 2013 Jose Vargas. Licensed under GPL license. Based on Stefan Petre's Color Picker www.eyecon.ro, dual licensed under the MIT and GPL licenses

For usage and examples: colpick.com/plugin
 */

(function ($) {
  var colpick = function () {
    var
      tpl = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
      defaults = {
        showEvent: 'click',
        onShow: function () {},
        onBeforeShow: function(){},
        onHide: function () {},
        onChange: function () {},
        onSubmit: function () {},
        colorScheme: 'light',
        color: '3289c7',
        livePreview: true,
        flat: false,
        layout: 'full',
        submit: 1,
        submitText: 'OK',
        height: 156
      },
      //Fill the inputs of the plugin
      fillRGBFields = function  (hsb, cal) {
        var rgb = hsbToRgb(hsb);
        $(cal).data('colpick').fields
          .eq(1).val(rgb.r).end()
          .eq(2).val(rgb.g).end()
          .eq(3).val(rgb.b).end();
      },
      fillHSBFields = function  (hsb, cal) {
        $(cal).data('colpick').fields
          .eq(4).val(Math.round(hsb.h)).end()
          .eq(5).val(Math.round(hsb.s)).end()
          .eq(6).val(Math.round(hsb.b)).end();
      },
      fillHexFields = function (hsb, cal) {
        $(cal).data('colpick').fields.eq(0).val(hsbToHex(hsb));
      },
      //Set the round selector position
      setSelector = function (hsb, cal) {
        $(cal).data('colpick').selector.css('backgroundColor', '#' + hsbToHex({h: hsb.h, s: 100, b: 100}));
        $(cal).data('colpick').selectorIndic.css({
          left: parseInt($(cal).data('colpick').height * hsb.s/100, 10),
          top: parseInt($(cal).data('colpick').height * (100-hsb.b)/100, 10)
        });
      },
      //Set the hue selector position
      setHue = function (hsb, cal) {
        $(cal).data('colpick').hue.css('top', parseInt($(cal).data('colpick').height - $(cal).data('colpick').height * hsb.h/360, 10));
      },
      //Set current and new colors
      setCurrentColor = function (hsb, cal) {
        $(cal).data('colpick').currentColor.css('backgroundColor', '#' + hsbToHex(hsb));
      },
      setNewColor = function (hsb, cal) {
        $(cal).data('colpick').newColor.css('backgroundColor', '#' + hsbToHex(hsb));
      },
      //Called when the new color is changed
      change = function (ev) {
        var cal = $(this).parent().parent(), col;
        if (this.parentNode.className.indexOf('_hex') > 0) {
          cal.data('colpick').color = col = hexToHsb(fixHex(this.value));
          fillRGBFields(col, cal.get(0));
          fillHSBFields(col, cal.get(0));
        } else if (this.parentNode.className.indexOf('_hsb') > 0) {
          cal.data('colpick').color = col = fixHSB({
            h: parseInt(cal.data('colpick').fields.eq(4).val(), 10),
            s: parseInt(cal.data('colpick').fields.eq(5).val(), 10),
            b: parseInt(cal.data('colpick').fields.eq(6).val(), 10)
          });
          fillRGBFields(col, cal.get(0));
          fillHexFields(col, cal.get(0));
        } else {
          cal.data('colpick').color = col = rgbToHsb(fixRGB({
            r: parseInt(cal.data('colpick').fields.eq(1).val(), 10),
            g: parseInt(cal.data('colpick').fields.eq(2).val(), 10),
            b: parseInt(cal.data('colpick').fields.eq(3).val(), 10)
          }));
          fillHexFields(col, cal.get(0));
          fillHSBFields(col, cal.get(0));
        }
        setSelector(col, cal.get(0));
        setHue(col, cal.get(0));
        setNewColor(col, cal.get(0));
        cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 0]);
      },
      //Change style on blur and on focus of inputs
      blur = function (ev) {
        $(this).parent().removeClass('colpick_focus');
      },
      focus = function () {
        $(this).parent().parent().data('colpick').fields.parent().removeClass('colpick_focus');
        $(this).parent().addClass('colpick_focus');
      },
      //Increment/decrement arrows functions
      downIncrement = function (ev) {
        ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        var field = $(this).parent().find('input').focus();
        var current = {
          el: $(this).parent().addClass('colpick_slider'),
          max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : (this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255),
          y: ev.pageY,
          field: field,
          val: parseInt(field.val(), 10),
          preview: $(this).parent().parent().data('colpick').livePreview
        };
        $(document).mouseup(current, upIncrement);
        $(document).mousemove(current, moveIncrement);
      },
      moveIncrement = function (ev) {
        ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val - ev.pageY + ev.data.y, 10))));
        if (ev.data.preview) {
          change.apply(ev.data.field.get(0), [true]);
        }
        return false;
      },
      upIncrement = function (ev) {
        change.apply(ev.data.field.get(0), [true]);
        ev.data.el.removeClass('colpick_slider').find('input').focus();
        $(document).off('mouseup', upIncrement);
        $(document).off('mousemove', moveIncrement);
        return false;
      },
      //Hue slider functions
      downHue = function (ev) {
        ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        var current = {
          cal: $(this).parent(),
          y: $(this).offset().top
        };
        $(document).on('mouseup touchend',current,upHue);
        $(document).on('mousemove touchmove',current,moveHue);

        var pageY = ((ev.type == 'touchstart') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
        change.apply(
          current.cal.data('colpick')
          .fields.eq(4).val(parseInt(360*(current.cal.data('colpick').height - (pageY - current.y))/current.cal.data('colpick').height, 10))
            .get(0),
          [current.cal.data('colpick').livePreview]
        );
        return false;
      },
      moveHue = function (ev) {
        var pageY = ((ev.type == 'touchmove') ? ev.originalEvent.changedTouches[0].pageY : ev.pageY );
        change.apply(
          ev.data.cal.data('colpick')
          .fields.eq(4).val(parseInt(360*(ev.data.cal.data('colpick').height - Math.max(0,Math.min(ev.data.cal.data('colpick').height,(pageY - ev.data.y))))/ev.data.cal.data('colpick').height, 10))
            .get(0),
          [ev.data.preview]
        );
        return false;
      },
      upHue = function (ev) {
        fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
        fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
        $(document).off('mouseup touchend',upHue);
        $(document).off('mousemove touchmove',moveHue);
        return false;
      },
      //Color selector functions
      downSelector = function (ev) {
        ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        var current = {
          cal: $(this).parent(),
          pos: $(this).offset()
        };
        current.preview = current.cal.data('colpick').livePreview;

        $(document).on('mouseup touchend',current,upSelector);
        $(document).on('mousemove touchmove',current,moveSelector);

        var payeX,pageY;
        if(ev.type == 'touchstart') {
          pageX = ev.originalEvent.changedTouches[0].pageX,
          pageY = ev.originalEvent.changedTouches[0].pageY;
        } else {
          pageX = ev.pageX;
          pageY = ev.pageY;
        }

        change.apply(
          current.cal.data('colpick').fields
          .eq(6).val(parseInt(100*(current.cal.data('colpick').height - (pageY - current.pos.top))/current.cal.data('colpick').height, 10)).end()
          .eq(5).val(parseInt(100*(pageX - current.pos.left)/current.cal.data('colpick').height, 10))
          .get(0),
          [current.preview]
        );
        return false;
      },
      moveSelector = function (ev) {
        var payeX,pageY;
        if(ev.type == 'touchmove') {
          pageX = ev.originalEvent.changedTouches[0].pageX,
          pageY = ev.originalEvent.changedTouches[0].pageY;
        } else {
          pageX = ev.pageX;
          pageY = ev.pageY;
        }

        change.apply(
          ev.data.cal.data('colpick').fields
          .eq(6).val(parseInt(100*(ev.data.cal.data('colpick').height - Math.max(0,Math.min(ev.data.cal.data('colpick').height,(pageY - ev.data.pos.top))))/ev.data.cal.data('colpick').height, 10)).end()
          .eq(5).val(parseInt(100*(Math.max(0,Math.min(ev.data.cal.data('colpick').height,(pageX - ev.data.pos.left))))/ev.data.cal.data('colpick').height, 10))
          .get(0),
          [ev.data.preview]
        );
        return false;
      },
      upSelector = function (ev) {
        fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
        fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
        $(document).off('mouseup touchend',upSelector);
        $(document).off('mousemove touchmove',moveSelector);
        return false;
      },
      //Submit button
      clickSubmit = function (ev) {
        var cal = $(this).parent();
        var col = cal.data('colpick').color;
        cal.data('colpick').origColor = col;
        setCurrentColor(col, cal.get(0));
        cal.data('colpick').onSubmit(col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el);
      },
      //Show/hide the color picker
      show = function (ev) {
        // Prevent the trigger of any direct parent
        ev.stopPropagation();
        var cal = $('#' + $(this).data('colpickId'));
        cal.data('colpick').onBeforeShow.apply(this, [cal.get(0)]);
        var pos = $(this).offset();
        var top = pos.top + this.offsetHeight;
        var left = pos.left;
        var viewPort = getViewport();
        var calW = cal.width();
        if (left + calW > viewPort.l + viewPort.w) {
          left -= calW;
        }
        cal.css({left: left + 'px', top: top + 'px'});
        if (cal.data('colpick').onShow.apply(this, [cal.get(0)]) != false) {
          cal.show();
        }
        //Hide when user clicks outside
        $('html').mousedown({cal:cal}, hide);
        cal.mousedown(function(ev){ev.stopPropagation();})
      },
      hide = function (ev) {
        if (ev.data.cal.data('colpick').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
          ev.data.cal.hide();
        }
        $('html').off('mousedown', hide);
      },
      getViewport = function () {
        var m = document.compatMode == 'CSS1Compat';
        return {
          l : window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
          w : window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth)
        };
      },
      //Fix the values if the user enters a negative or high value
      fixHSB = function (hsb) {
        return {
          h: Math.min(360, Math.max(0, hsb.h)),
          s: Math.min(100, Math.max(0, hsb.s)),
          b: Math.min(100, Math.max(0, hsb.b))
        };
      },
      fixRGB = function (rgb) {
        return {
          r: Math.min(255, Math.max(0, rgb.r)),
          g: Math.min(255, Math.max(0, rgb.g)),
          b: Math.min(255, Math.max(0, rgb.b))
        };
      },
      fixHex = function (hex) {
        var len = 6 - hex.length;
        if (len > 0) {
          var o = [];
          for (var i=0; i<len; i++) {
            o.push('0');
          }
          o.push(hex);
          hex = o.join('');
        }
        return hex;
      },
      restoreOriginal = function () {
        var cal = $(this).parent();
        var col = cal.data('colpick').origColor;
        cal.data('colpick').color = col;
        fillRGBFields(col, cal.get(0));
        fillHexFields(col, cal.get(0));
        fillHSBFields(col, cal.get(0));
        setSelector(col, cal.get(0));
        setHue(col, cal.get(0));
        setNewColor(col, cal.get(0));
      };
    return {
      init: function (opt) {
        opt = $.extend({}, defaults, opt||{});
        //Set color
        if (typeof opt.color == 'string') {
          opt.color = hexToHsb(opt.color);
        } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
          opt.color = rgbToHsb(opt.color);
        } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
          opt.color = fixHSB(opt.color);
        } else {
          return this;
        }

        //For each selected DOM element
        return this.each(function () {
          //If the element does not have an ID
          if (!$(this).data('colpickId')) {
            var options = $.extend({}, opt);
            options.origColor = opt.color;
            //Generate and assign a random ID
            var id = 'collorpicker_' + parseInt(Math.random() * 1000);
            $(this).data('colpickId', id);
            //Set the tpl's ID and get the HTML
            var cal = $(tpl).attr('id', id);
            //Add class according to layout
            cal.addClass('colpick_'+options.layout+(options.submit?'':' colpick_'+options.layout+'_ns'));
            //Add class if the color scheme is not default
            if(options.colorScheme != 'light') {
              cal.addClass('colpick_'+options.colorScheme);
            }
            //Setup submit button
            cal.find('div.colpick_submit').html(options.submitText).click(clickSubmit);
            //Setup input fields
            options.fields = cal.find('input').change(change).blur(blur).focus(focus);
            cal.find('div.colpick_field_arrs').mousedown(downIncrement).end().find('div.colpick_current_color').click(restoreOriginal);
            //Setup hue selector
            options.selector = cal.find('div.colpick_color').on('mousedown touchstart',downSelector);
            options.selectorIndic = options.selector.find('div.colpick_selector_outer');
            //Store parts of the plugin
            options.el = this;
            options.hue = cal.find('div.colpick_hue_arrs');
            huebar = options.hue.parent();
            //Paint the hue bar
            var UA = navigator.userAgent.toLowerCase();
            var isIE = navigator.appName === 'Microsoft Internet Explorer';
            var IEver = isIE ? parseFloat( UA.match( /msie ([0-9]{1,}[\.0-9]{0,})/ )[1] ) : 0;
            var ngIE = ( isIE && IEver < 10 );
            var stops = ['#ff0000','#ff0080','#ff00ff','#8000ff','#0000ff','#0080ff','#00ffff','#00ff80','#00ff00','#80ff00','#ffff00','#ff8000','#ff0000'];
            if(ngIE) {
              var i, div;
              for(i=0; i<=11; i++) {
                div = $('<div></div>').attr('style','height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='+stops[i]+', endColorstr='+stops[i+1]+'); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='+stops[i]+', endColorstr='+stops[i+1]+')";');
                huebar.append(div);
              }
            } else {
              stopList = stops.join(',');
              huebar.attr('style','background:-webkit-linear-gradient(top,'+stopList+'); background: -o-linear-gradient(top,'+stopList+'); background: -ms-linear-gradient(top,'+stopList+'); background:-moz-linear-gradient(top,'+stopList+'); -webkit-linear-gradient(top,'+stopList+'); background:linear-gradient(to bottom,'+stopList+'); ');
            }
            cal.find('div.colpick_hue').on('mousedown touchstart',downHue);
            options.newColor = cal.find('div.colpick_new_color');
            options.currentColor = cal.find('div.colpick_current_color');
            //Store options and fill with default color
            cal.data('colpick', options);
            fillRGBFields(options.color, cal.get(0));
            fillHSBFields(options.color, cal.get(0));
            fillHexFields(options.color, cal.get(0));
            setHue(options.color, cal.get(0));
            setSelector(options.color, cal.get(0));
            setCurrentColor(options.color, cal.get(0));
            setNewColor(options.color, cal.get(0));
            //Append to body if flat=false, else show in place
            if (options.flat) {
              cal.appendTo(this).show();
              cal.css({
                position: 'relative',
                display: 'block'
              });
            } else {
              cal.appendTo(document.body);
              $(this).on(options.showEvent, show);
              cal.css({
                position:'absolute'
              });
            }
          }
        });
      },
      //Shows the picker
      showPicker: function() {
        return this.each( function () {
          if ($(this).data('colpickId')) {
            show.apply(this);
          }
        });
      },
      //Hides the picker
      hidePicker: function() {
        return this.each( function () {
          if ($(this).data('colpickId')) {
            $('#' + $(this).data('colpickId')).hide();
          }
        });
      },
      //Sets a color as new and current (default)
      setColor: function(col, setCurrent) {
        setCurrent = (typeof setCurrent === "undefined") ? 1 : setCurrent;
        if (typeof col == 'string') {
          col = hexToHsb(col);
        } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
          col = rgbToHsb(col);
        } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
          col = fixHSB(col);
        } else {
          return this;
        }
        return this.each(function(){
          if ($(this).data('colpickId')) {
            var cal = $('#' + $(this).data('colpickId'));
            cal.data('colpick').color = col;
            cal.data('colpick').origColor = col;
            fillRGBFields(col, cal.get(0));
            fillHSBFields(col, cal.get(0));
            fillHexFields(col, cal.get(0));
            setHue(col, cal.get(0));
            setSelector(col, cal.get(0));

            setNewColor(col, cal.get(0));
            cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 1]);
            if(setCurrent) {
              setCurrentColor(col, cal.get(0));
            }
          }
        });
      }
    };
  }();
  //Color space convertions
  var hexToRgb = function (hex) {
    var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
  };
  var hexToHsb = function (hex) {
    return rgbToHsb(hexToRgb(hex));
  };
  var rgbToHsb = function (rgb) {
    var hsb = {h: 0, s: 0, b: 0};
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var delta = max - min;
    hsb.b = max;
    hsb.s = max != 0 ? 255 * delta / max : 0;
    if (hsb.s != 0) {
      if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;
      else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;
      else hsb.h = 4 + (rgb.r - rgb.g) / delta;
    } else hsb.h = -1;
    hsb.h *= 60;
    if (hsb.h < 0) hsb.h += 360;
    hsb.s *= 100/255;
    hsb.b *= 100/255;
    return hsb;
  };
  var hsbToRgb = function (hsb) {
    var rgb = {};
    var h = hsb.h;
    var s = hsb.s*255/100;
    var v = hsb.b*255/100;
    if(s == 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      var t1 = v;
      var t2 = (255-s)*v/255;
      var t3 = (t1-t2)*(h%60)/60;
      if(h==360) h = 0;
      if(h<60) {rgb.r=t1; rgb.b=t2; rgb.g=t2+t3}
      else if(h<120) {rgb.g=t1; rgb.b=t2; rgb.r=t1-t3}
      else if(h<180) {rgb.g=t1; rgb.r=t2; rgb.b=t2+t3}
      else if(h<240) {rgb.b=t1; rgb.r=t2; rgb.g=t1-t3}
      else if(h<300) {rgb.b=t1; rgb.g=t2; rgb.r=t2+t3}
      else if(h<360) {rgb.r=t1; rgb.g=t2; rgb.b=t1-t3}
      else {rgb.r=0; rgb.g=0; rgb.b=0}
    }
    return {r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b)};
  };
  var rgbToHex = function (rgb) {
    var hex = [
      rgb.r.toString(16),
      rgb.g.toString(16),
      rgb.b.toString(16)
    ];
    $.each(hex, function (nr, val) {
      if (val.length == 1) {
        hex[nr] = '0' + val;
      }
    });
    return hex.join('');
  };
  var hsbToHex = function (hsb) {
    return rgbToHex(hsbToRgb(hsb));
  };
  $.fn.extend({
    colpick: colpick.init,
    colpickHide: colpick.hidePicker,
    colpickShow: colpick.showPicker,
    colpickSetColor: colpick.setColor
  });
  $.extend({
    colpick:{
      rgbToHex: rgbToHex,
      rgbToHsb: rgbToHsb,
      hsbToHex: hsbToHex,
      hsbToRgb: hsbToRgb,
      hexToHsb: hexToHsb,
      hexToRgb: hexToRgb
    }
  });
})(jQuery);


/**********************************************
***********************************************
***********************************************
**********
********** cookie插件
**********
***********************************************
***********************************************
**********************************************/


/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };

}));
