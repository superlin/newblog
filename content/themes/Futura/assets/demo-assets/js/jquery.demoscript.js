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
