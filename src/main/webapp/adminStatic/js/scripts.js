
(function() {
    "use strict";
    // custom scrollbar
    $(".main-content").niceScroll({styler:"fb",cursorcolor:"#93a0e7", cursorwidth: '6', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

    $(".left-tab").niceScroll({styler:"fb",cursorcolor:"#93a0e7", cursorwidth: '10', cursorborderradius: '0px', background: '#424f63', spacebarenabled:false, cursorborder: '0'});

    $(".left-tab").getNiceScroll();
    if ($('body').hasClass('left-side-collapsed')) {
        $(".left-tab").getNiceScroll().hide();
    }
    
    // Toggle Left Menu
   /* $(window.parent.document).find('.menu-list > a').click(function() {
    	
        var parent = jQuery(this).parent();
        var sub = parent.find('> ul');
        if(!$(window.parent.document).find('body').hasClass('left-side-collapsed')) {
            if(sub.is(':visible')) {
                sub.slideUp("fast", function(){
                    parent.removeClass('nav-active');
                    jQuery('.main-content').css({height: ''});
                    mainContentHeightAdjust();
                });
            } else {
                visibleSubMenuClose(parent);
                parent.addClass('nav-active');
                sub.slideDown("fast", function(){
                    mainContentHeightAdjust();
                });
            }
        }
        return false;
    });*/
   /* $(window.parent.document).find('.sub-menu-list li a').click(function() {
    	var li=$(this).parent();
    	$(window.parent.document).find('.sub-menu-list li').removeClass("active");
    	li.addClass('active');
    	$(window.parent.document).find('.main-div').find('#main-iframe').attr("src",$(this).attr('targetUrl'));
    	
    });*/
    
   /* $(window.parent.document).find('#index a').click(function() {
    	$(window.parent.document).find('.menu-list').removeClass('nav-active');
    	$(window.parent.document).find('.sub-menu-list li').removeClass('active');
    	$(this).parent().addClass('active');
    	$(window.parent.document).find('.main-div').find('#main-iframe').attr("src",$(this).attr('targetUrl'));
    	
//    	$(this).parent().addClass('active').siblings().removeClass("active");
    });*/
    


    //  class add mouse hover
    $(window.parent.document).find('.custom-nav > li').hover(function(){
        jQuery(this).addClass('nav-hover');
    }, function(){
        jQuery(this).removeClass('nav-hover');
    });


    // Menu Toggle 
    $('.toggle-btn').click(function(){
    	var isShow = showMenu();
    	addToSession(isShow);
    });
    function addToSession(isShow){
    	
    	var url = getRootPath_web() + "/commonController/showMenu";
    	jQuery.ajax({
    		async:false,
    		dataType:"json",
    		type:"post",
    		url:url,
    		data:{isShow:isShow},
    		success:function(data){
    			alert(data);
    		}
    	});
    }
    function getRootPath_web() {
    	
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return (localhostPaht + projectName);
    }
    // show left menu
    function showMenu(){
    	
    	 $(window.parent.document).find(".left-tab").getNiceScroll().hide();

        if ($(window.parent.document).find('body').hasClass('left-side-collapsed')) {
        	 $(window.parent.document).find(".left-tab").getNiceScroll().hide();
        }
        var body = $(window.parent.document).find('body');
        var bodyposition = body.css('position');
        var isShow = false;// true-show,false-hide

        if(bodyposition != 'relative') {

            if(!body.hasClass('left-side-collapsed')) {// hide
                body.addClass('left-side-collapsed');
                //$(window.parent.document).find('.custom-nav ul').attr('style','');

                jQuery(this).addClass('menu-collapsed');
                
                isShow = false;

            } else {// show
                body.removeClass('left-side-collapsed chat-view');
                //$(window.parent.document).find('.custom-nav li.active ul').css({display: 'block'});

                jQuery(this).removeClass('menu-collapsed');
                
                isShow = true;

            }
        } else {

            if(body.hasClass('left-side-show')){// show
                body.removeClass('left-side-show');
            	isShow = true;
            } else {// hide
                body.addClass('left-side-show');
                isShow = false;
            }
            mainContentHeightAdjust();
        }
        return isShow;
    }

    searchform_reposition();

    jQuery(window).resize(function(){

        if(jQuery('body').css('position') == 'relative') {

            jQuery('body').removeClass('left-side-collapsed');

        } else {

            jQuery('body').css({left: '', marginRight: ''});
        }

        searchform_reposition();

    });

    function searchform_reposition() {
        if(jQuery('.searchform').css('position') == 'relative') {
            jQuery('.searchform').insertBefore('.left-side-inner .logged-user');
        } else {
            jQuery('.searchform').insertBefore('.menu-right');
        }
    }

    // panel collapsible
//    $('.panel .tools .fa').click(function () {
//        var el = $(this).parents(".panel").children(".panel-body");
//        if ($(this).hasClass("fa-chevron-down")) {
//            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
//            el.slideUp(200);
//        } else {
//            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
//            el.slideDown(200); }
//    });

    $('.panel .title-click').click(function () {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("it-down")) {
            $(this).removeClass("it-down").addClass("it-up");
            el.slideUp("fast");
        } else {
            $(this).removeClass("it-up").addClass("it-down");
            el.slideDown("fast"); }
    });

    $('.todo-check label').click(function () {
        $(this).parents('li').children('.todo-title').toggleClass('line-through');
    });

    $(document).on('click', '.todo-remove', function () {
        $(this).closest("li").remove();
        return false;
    });

//    $("#sortable-todo").sortable();


    // panel close
    $('.panel .tools .fa-times').click(function () {
        $(this).parents(".panel").parent().remove();
    });


    // tool tips

    $('.tooltips').tooltip();

    // popovers

    $('.popovers').popover();
    

})();
function visibleSubMenuClose(obj) {
/*	obj.children().each(function() {
		var t = jQuery(this);
    	t.find('> ul').slideUp("fast");
    });*/
}
function mainContentHeightAdjust() {
    // Adjust main content height
//    var docHeight = jQuery(document).height();
//    if(docHeight > jQuery('.main-content').height())
//        jQuery('.main-content').height(docHeight);
}
/*function menuClick(obj){
	 var parent = jQuery(obj).parent();
     var sub = parent.find('> ul');
     if(!$(window.parent.document).find('body').hasClass('left-side-collapsed')) {
         if(sub.is(':visible')) {
             sub.slideUp("fast", function(){
                 parent.removeClass('nav-active');
                 jQuery('.main-content').css({height: ''});
                 mainContentHeightAdjust();
             });
         } else {
             visibleSubMenuClose(parent);
             $(window.parent.document).find('.menu-list').removeClass('nav-active');
             $(window.parent.document).find('.sub-menu-list li').removeClass("nav-active");
             jQuery(obj).parents(".menu-list").addClass('nav-active');
             parent.addClass('nav-active');
             sub.slideDown("fast", function(){
                 mainContentHeightAdjust();
             });
         }
     }
     return false;
}*/



function lastSubMenuClick(obj){
	/*var li=$(obj).parent();
	$("#index").removeClass("active");
	$(window.parent.document).find('.sub-menu-list li').removeClass("nav-active");	//去掉二级菜单选中样式
	$(window.parent.document).find('.sub-menu-list li').removeClass("active");		//去掉三级菜单选中样式
	visibleSubMenuClose(li.parent());
	jQuery(obj).parents(".sub-menu-list li").addClass('nav-active');				//添加当前二级菜单选中样式
	li.addClass('active');		*/													//添加当前三级菜单选中样式
	$(obj).attr("href",$(obj).attr('targetUrl'));
	/*$(window.parent.document).find('.main-model').find('.iframe-content').attr("data-url",$(obj).attr('targetUrl')).attr("src",$(obj).attr('targetUrl'));*/
}
function indexMenuClick(obj){
	/*$("#index").removeClass("active");
	$(window.parent.document).find('.menu-list').removeClass('nav-active');
	$(window.parent.document).find('.sub-menu-list li').removeClass("nav-active");
	$(window.parent.document).find('.sub-menu-list li').removeClass('active');
	$(obj).parent().addClass('active');*/
	$(obj).attr("href",$(obj).attr('targetUrl'));
	/*$(window.parent.document).find('.main-model').find('.iframe-content').attr("data-url",$(obj).attr('targetUrl')).attr("src",$(obj).attr('targetUrl'));*/
//	$(this).parent().addClass('active').siblings().removeClass("active");
}



