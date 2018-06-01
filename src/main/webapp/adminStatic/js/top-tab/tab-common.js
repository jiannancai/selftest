$(function() {
	// nav收缩展开
	$('.nav-item>a')
			.on(
					'click',
					function() {
						if ($(this).siblings('.nav-item-two').css('display') == "none") {
							//展开未展开
							$('.nav-item').children('.nav-item-two').slideUp(
									300);
							$(this).siblings('.nav-item-two').slideDown(300);
							$(this).addClass('nav-show').parent('li').siblings(
									'a').removeClass('nav-show');
						} else {
							//收缩已展开
							$(this).siblings('.nav-item-two').slideUp(300);
							$(this).removeClass('nav-show');
						}
					});
	$('.nav-item-two>li>a').on(
			'click',
			function() {
				if ($(this).siblings('ul').css('display') == "none") {
					//展开未展开
					$('.nav-item-two').children('ul').slideUp(300);
					$(this).siblings('ul').slideDown(300);
					$(this).addClass('nav-show').parent('li').siblings('a')
							.removeClass('nav-show');
				} else {
					//收缩已展开
					$(this).siblings('ul').slideUp(300);
					$(this).removeClass('nav-show active');
				}
				$(this).addClass('active').parent().parent().siblings()
				.children().children().removeClass('active');
				
			});
	
	$('.nav-item-three>li>a').on(
			'click',
			function() {
				if (!$(this).hasClass('active')) {
					$(this).addClass('active').parent().parent().siblings()
					.children().children().removeClass('active')
				} else {
					$(this).removeClass('active')
				}
				
			});

	$('.nav-item-on').on(
			'click',
			function() {
				if (!$(this).hasClass('nav-item-on-active')) {
					$(this).addClass('nav-item-on-active').parent().parent().siblings()
							.children().children().removeClass('nav-item-on-active')
				} else {
					$(this).removeClass('nav-item-on-active')
				}
			})
	$('.top-tab-l').on('click', function() {
		$('.left-tab').toggle();
		$('body').toggleClass('nav-p');
		if($("body").hasClass('nav-p')){
			$('.top-tab').css({'margin-left':'-240px','border-left':'240px solid transparent'})
		}else{
			$('.top-tab').css({'margin-left':'0px','border-left':'0px solid transparent'})
		}
//		margin-left: -240px;
//	    border-left: 240px solid transparent;
	})

	$(".user-option>i").on('mouseover', function() {
		$('.user-opton-none').show();
	})
	$(".user-option>i").on('mouseout', function() {
		$('.user-opton-none').hide();
	})
	$(".user-opton-none").on('mouseover', function() {
		$(this).show();
	})
	$(".user-opton-none").on('mouseout', function() {
		$(this).hide();
	})

	$('.nav-item').on('click','a',function() {
		$('.nav-item a').removeClass('active')
		$(this).addClass('active')
		if ($(this).parent().parent().parent().parent().hasClass('nav-item-two')) {
			$(this).parent().parent().siblings('a').addClass('active')
		}
	})

});