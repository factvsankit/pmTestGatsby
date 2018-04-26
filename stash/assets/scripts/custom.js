$(function(){

	// scrollbar js initialization
	$(".nano").nanoScroller();


	// Window Width/Height
	wwwh = function(){
		ww = $(window).width();
		wh = $(window).height();
	}
	wwwh();

	// Sticky Navigation Initialization
	$(".logo-nav").sticky({ topSpacing: 0 });

	// Full Slider/Image Section Initialization
	$('.home-slider').each(function(){
		noOfSlides = $(this).find('.slides-container').children('img').length;
		if(noOfSlides>1){
			playTime = '12000';
			animSpeed = '1600';
		}
		else{
			playTime = '0';
			animSpeed = 'normal';
			$(this).addClass('singleSlide');
		}
		$(this).superslides({
			animation: 'fade',
			play: playTime,
			animation_speed: animSpeed,
			pagination:false
		});
	})

	//Scroll to Sections
	$(document).on('click','.scroll-to',function(e){
		findTarget = $(this).attr('data-scroll-to');
		findTargetOffset = $('#'+findTarget).offset().top;

		$('.offcanvas').removeClass('show-offcanvas');
		$('.body-inactive').fadeOut(350);

		$('body,html').animate({
			scrollTop: findTargetOffset - $('.logo-nav').height()
		},500);
		e.preventDefault();
	});

	// cloning menu items in mobile
	$mobileNav = $('<div id="mobileNav"></div>').prependTo('.offcanvas .nano .nano-content');
	$mobileNav.append($('.mynav > ul').clone());

	// offcanvas toggle
	$('.toggle a').click(function(e){
		$('.offcanvas').addClass('show-offcanvas');
		$('body').addClass('pushed');
		$('.body-inactive').fadeIn(350);
		e.preventDefault();
	});

	// closing ups clicking on the screen
	$('.body-inactive, .coff a').click(function(e){
		$('.offcanvas').removeClass('show-offcanvas');
		$('.body-inactive').fadeOut(350);
		e.preventDefault();
	});


	// Lightbox Initialization
	$('a[data-rel^=lightcase]').lightcase({
		showTitle: true,
		caption: $(this).data('data-caption'),
		showCaption: true,
		fixedRatio: false,
		transition:'fadeInline',
		onStart : {
			bar: function() {
				$('.lightcase-contentInner').each(function(){
					findSrc = $(this).children('img').attr('src');
					$(this).children('img').wrap(function(){
						html = '<div>';
						html+='<div class="fullScreenWrapper" style="background-image:url('+findSrc+')">';
						html+='</div>';
						html+='</div>';

						return html;
					});
				})
			}
		},

		onFinish : {
			baz: function() {
				findLightCaseCaptionHeight = $('#lightcase-info').height();
				findLightCaseCaptionPadding = parseInt($('#lightcase-info').css('padding-top'));
				totalLightCaseCaptionHeight = findLightCaseCaptionHeight + findLightCaseCaptionPadding*2;
				halfOfTotalLightCaseCaptionHeight = totalLightCaseCaptionHeight / 2;
				totalOffset = halfOfTotalLightCaseCaptionHeight - halfOfTotalLightCaseCaptionHeight/4;
				$('#lightcase-nav .lightcase-icon-prev, #lightcase-nav .lightcase-icon-next, #lightcase-nav .lightcase-icon-play, #lightcase-nav .lightcase-icon-pause').css('margin-bottom',totalOffset+'px').addClass('show-lightcase-nav');

			}
		},		

		onClose : {
			qux: function() {
				$('#lightcase-nav').removeClass('show-lightcase-nav');
			}
		}
	});	

	// Active Section

	jQuery(window).scroll(function(){
		wwwh();
		scrolled = jQuery(window).scrollTop();
		if(scrolled < ww){
			jQuery('.mynav ul li').removeClass('nav-active');			
		}
		jQuery('.section').each(function(){
			if(jQuery(this).visible(true)){
				findID = jQuery(this).attr('id');
				jQuery('.mynav ul li').removeClass('nav-active');
				jQuery('.mynav ul li a#scroll-section-'+findID).parent().addClass('nav-active');
			}
			else{
			}
		})
	});	

	// Window Resize Orientation Change
	$(window).bind('resize orientationchange',function(){
		wwwh();
	})
})