// setLoading.js  
//*************************** 
//加载设定,自定义一个方法来实现
// nathan 2014-24-23
//内嵌的方式来实现的
//默认状态
//***************************
jQuery.fn.simpleLoadingModal = function (options) {
    var settings = {
        'background': '#000',
        'image': 'images/ajax-loader.gif',
        'zIndex': 99999,
        'tipText':'加载中...',
        'tipTextColor':'#fff',
        'opacity':0.5,
        'delay':1000,
        'tipTextbackground':'#877349',
        'width':'300',
        'startUs':true
    };
    thisOb = this;
    return this.each(function () {
        if (options) {
            $.extend(settings, options);
        }

        function centerToBox(cur, box) {

            var position = $(box).position();
            var posTopOffset = ($(box).height()) / 2;
            var posLeftOffset = ($(box).width()) / 2;
            position.left = position.left + posLeftOffset;
            position.top = position.top + posTopOffset;
            $(cur).css({
                'position': 'fixed',
                'left':'50%',
                'top': '30%',
                'margin-left': -(settings.width)/2,
                "z-index": 99999,
                'padding': '15px',
                'border':'2px solid #fff',
                'display': 'block',
                'background-color': settings.tipTextbackground,
                '-moz-box-shadow': '1px 2px 5px rgba(8, 1, 3, 0.3)',
                '-webkit-box-shadow': '1px 2px 5px rgba(8, 1, 3, 0.3)',
                'box-shadow': '1px 2px 5px rgba(8, 1, 3, 0.3)'

            });
            return this;
        }
        //层居中方法
        function ajaxLoadList() {
            var a = $(thisOb).height();
            var b = $(thisOb).width();
            var position = $(thisOb).position();
            $("body").append("<div id=\"dvGlobalMask\"></div><div id=\"loader\"><img src=\"" + settings.image + "\" id=\"loadpic\"><div id=\"tipText\">" + settings.tipText + "</div></div>");
            $("#dvGlobalMask").css({
                width: b,
                height: a,
                'background-color': settings.background,
                'position': 'fixed',
                'left': position.left,
                'top': position.top,
                'display': 'inline-block',
                "z-index": settings.zIndex,
                'opacity': settings.opacity,
                '-moz-opacity':settings.opacity

            }).fadeTo("fast");
            $("#loadpic").css({
                'float':'left',
                'display': 'block',
                'margin-right': '10px'
            });
            $("#tipText").css({

                'height': '32px',
                'line-height': '32px',
                'display': 'inline-block',
                'color':settings.tipTextColor
            });
            centerToBox($("#loader"), $(thisOb));
            $("#loader").show()
            //$("#loader").show().fadeOut();
            //$("#dvGlobalMask").fadeOut();
        }
        //
        function ajaxClose(){
            if(!settings.startUs){
                $("#loader").delay(settings.delay).fadeOut().remove();
                $("#dvGlobalMask").delay(settings.delay).fadeOut().remove();
            }
        }
        if(settings.startUs)
        {
            ajaxLoadList();
        }else{
            ajaxClose();
        }
        return this;
    });
}