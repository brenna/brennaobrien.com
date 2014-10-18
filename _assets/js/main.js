$(document).ready(function() {

	// outside links open in new tab
	$(document.links).filter(function() {
		return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

	//activate fitvids.js for blog posts and talks
	$('.blog-content').fitVids();
	$('.talk-entries').fitVids();


	//smooth scroll to contact and activate CSS bouncy text
	$('#contact-link').click(function() {
		$('html,body').animate({
			scrollTop: $('#contact').offset().top
		}, 500, function() {
			//trigger CSS animation
			$("#contact h3").addClass('animate').bind('oanimationend animationend webkitAnimationEnd', function() {
				//reset the animation once complete
				$(this).removeClass('animate');
			});
		});
		return false;
	});

	//min-height on teeny blog posts
	var minBlogHeight = $(window).height() - $('header.global').height() - $('footer.global').height() - 160;
	$('.blog-post').css('min-height', minBlogHeight);

	//init prettyprint for code snippets
	prettyPrint();

});