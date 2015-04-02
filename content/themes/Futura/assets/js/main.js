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
	tagcloud:function(){
		var FEED_URL = "/rss/";
		var primary_array = [];
		var tag_num = {};
		$.get(FEED_URL, function (data) {
			$(data).find("category").each(function () {
				var el = $(this).text();
				if ($.inArray(el, primary_array) == -1) {
					primary_array.push(el);
					tag_num[el] = 1;
				} else {
					tag_num[el] +=1;
				}
			});
			var formated_tag_list = "";
			for ( var i = 0; i < primary_array.length; i = i + 1 ) {
				var tag = primary_array[ i ];
				var tagLink = tag.toLowerCase().replace(/ /g, '-');
				formated_tag_list += ("<a href=\"/tag/" + tagLink + "\">" + tag +" ("+tag_num[tag]+") " + "</a>");
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
					var date = d.getDate() > 9 ? d.getDate() : '0'+d.getDate();
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
		themeApp.tagcloud();
		themeApp.recentPost();
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
