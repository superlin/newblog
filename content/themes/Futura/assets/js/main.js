/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/
var themeApp = {
	featuredMedia: function(){
		$(".post").each(function() {
			var thiseliment = $(this);
			var media_wrapper = $(this).find('featured');
			var media_content_image = media_wrapper.find($('img'));
			var media_content_embeded = media_wrapper.find('iframe');
			if (media_content_image.length > 0) {
				$(media_content_image).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-image');
				media_wrapper.remove();
			}
			else if (media_content_embeded.length > 0) {
				$(media_content_embeded).insertAfter(thiseliment.find('.post-head')).wrap("<div class='featured-media'></div>");
				thiseliment.addClass('post-type-embeded');
			}
		});
	},
	responsiveIframe: function() {
		$('.post').fitVids();
	},
	sidebarConfig:function() {
		if(sidebar_left == true) {
			$('.main-content').addClass('col-md-push-4');
			$('.sidebar').addClass('col-md-pull-8');
		}
	},
	tagcloud:function(){
		var FEED_URL = "/rss/";
		var primary_array = [];
		$.get(FEED_URL, function (data) {
			$(data).find("category").each(function () {
				var el = $(this).text();
				if ($.inArray(el, primary_array) == -1) {
					primary_array.push(el);
				}
			});
			var formated_tag_list = "";
			for ( var i = 0; i < primary_array.length; i = i + 1 ) {
				var tag = primary_array[ i ];
				var tagLink = tag.toLowerCase().replace(/ /g, '-');
				formated_tag_list += ("<a href=\"/tag/" + tagLink + "\">" + tag + "</a>");
			}
			$('.tag-cloud').append(formated_tag_list);
		});
	},
	recentPost:function() {
		var feed_url = "/rss/";
		var code = String('');
		$.get(feed_url, function(data) {
			$(data).find('item').slice(0,recent_post_count).each(function(){
				var full = $(this).find('description').text();
				var content = $(this).contentSnippet;
				var link = $(this).find('link').text();
				var title = $(this).find('title').text();
				var published_date = $(this).find('pubDate').text();
				function format_date (dt) {
					var d = new Date(dt);
					var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
					var month = month_name[d.getMonth()];
					var date = d.getDate();
					var year = d.getFullYear();
					var formatted_dt = month+' '+date+','+' '+year;
					return formatted_dt;
				}
				code += '<div class="recent-single-post">';
				code += '<a href="' + link + '" class="post-title">' + title + '</a><div class="date">' + format_date(published_date) + '</div>';
				code += '</div>';
			})
			$(".recent-post").html(code);
		});
	},
	facebook:function() {

		// var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page_url+'&amp;width=262&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=300&amp;show-border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:300px;" allowTransparency="true"></iframe>';
		var fb_page = '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page_url+'&amp;width&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:258px; width:100%;" allowTransparency="true"></iframe>';
		$('.fb').append(fb_page);
		$(".fb").fitVids();
	},
	twitter: function() {
		var twitter_block = '<a class="twitter-timeline" href="'+twitter_url+'" data-widget-id="'+twitter_widget_id+'" data-link-color="#0062CC" data-chrome="nofooter noscrollbar" data-tweet-limit="'+number_of_tweet+'">Tweets</a>';
		twitter_block += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
		$('.twitter').append(twitter_block);
	},
	googlePlus:function() {
		if(badge_type !== "" && google_plus_url !== "") {
			$('body').append('<script src="https://apis.google.com/js/platform.js" async defer></script>');
			var container = $('.google-plus');
			var width = container.width();
			var google_plus_code = '<div class="g-'+badge_type+'" data-width="'+width+'" data-href="'+google_plus_url+'" data-rel="publisher"></div>';
			container.append(google_plus_code);
		}
	},
	mailchimp:function() {
		var form = $('#mc-embedded-subscribe-form');
		form.attr("action", mailchimp_form_url);
		var message = $('#message');
		var submit_button = $('mc-embedded-subscribe');
		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		form.submit(function(e){
			e.preventDefault();
			$('#mc-embedded-subscribe').attr('disabled','disabled');
			if($('#mce-EMAIL').val() != '' && IsEmail($('#mce-EMAIL').val())) {
				message.html('please wait...').fadeIn(1000);
				var url=form.attr('action');
				if(url=='' || url=='YOUR_MAILCHIMP_WEB_FORM_URL_HERE') {
					alert('Please config your mailchimp form url for this widget');
					return false;
				}
				else{
					url=url.replace('?u=', '/post-json?u=').concat('&c=?');
					console.log(url);
					var data = {};
					var dataArray = form.serializeArray();
					$.each(dataArray, function (index, item) {
					data[item.name] = item.value;
					});
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						success: function(response, text){
							if (response.result === 'success') {
								message.html(success_message).delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').val('');
							}
							else{
								message.html(response.result).delay(10000).fadeOut(500);
								$('#mc-embedded-subscribe').removeAttr('disabled');
								$('#mce-EMAIL').focus().select();
							}
						},
						dataType: 'jsonp',
						error: function (response, text) {
							console.log('mailchimp ajax submit error: ' + text);
							$('#mc-embedded-subscribe').removeAttr('disabled');
							$('#mce-EMAIL').focus().select();
						}
					});
					return false;
				}
			}
			else {
				message.html('Please provide valid email').fadeIn(1000);
				$('#mc-embedded-subscribe').removeAttr('disabled');
				$('#mce-EMAIL').focus().select();
			}
		});
	},
	flickr:function() {
		$('.flkr-widget').jflickrfeed({
			limit: 8,
			qstrings: {
				id: flickr_id
			},
			itemTemplate:
			'<li>' +
				'<a href="{{link}}" title="{{title}}" target="_blank"><img src="{{image_s}}" alt="{{title}}" /></a>' +
			'</li>'
		});
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
		themeApp.featuredMedia();
		themeApp.responsiveIframe();
		themeApp.sidebarConfig();
		themeApp.tagcloud();
		themeApp.recentPost();
		themeApp.facebook();
		themeApp.twitter();
		themeApp.googlePlus();
		themeApp.flickr();
		themeApp.highlighter();
		themeApp.mailchimp();
		themeApp.backToTop();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
  themeApp.init();
});
