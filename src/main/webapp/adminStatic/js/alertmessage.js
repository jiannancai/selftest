
function window_alert(msg,sign,ok,can,width){
    var c_=false;//是否已经关闭窗口，解决自动关闭与手动关闭冲突
    sign=sign||"";
    width=width||"";
    var s="<div id='mask_layer'></div><div id='scs_alert'><div id='alert_bg'><table width='100%' align='center' border='0' cellspacing='0' cellpadding='1'><tr>";
    if (sign!="")s+="<td width='15%'><div id='inco_"+sign+"'></div></td>";
    s+="<td id='alert_txt'>"+msg+"</td></tr></table>";
    if (sign=="confirm"){
        s+="<table width='100%' align='center' border='0' cellspacing='0' cellpadding='1'><tr><td align='right' id='pad-box'><a href='javascript:void(0)' id='confirm_ok'>确 定</a></td><td align='left' id='pad-box'><a href='javascript:void(0)' id='confirm_cancel'>取 消</a></td></tr></table>";
    }else{
        s+="<table width='100%' align='center' border='0' cellspacing='0' cellpadding='1'><tr><td align='center' id='pad-box'><a href='javascript:void(0)' id='alert_ok'>确 定</a></td></tr></table>"
    }
    s+="</div></div>";
    $("body").append(s);
    $("#scs_alert").css("margin-top",-($("#scs_alert").height()/2)+"px"); //使其垂直居
    if (width!=""){
        $("#scs_alert").css("width",width+"px");
        $("#scs_alert").css("margin-left",-width/2+"px");
    }else{
        $("#scs_alert").css("width",320+"px");
        $("#scs_alert").css("margin-left",-160+"px");
    }
    $("#scs_alert").focus(); //获取焦点，以防回车后无法触发函数

    if (typeof can == "number"){
        //定时关闭提示
        setTimeout(function(){
            close_info();
        },can*1000);
    }
    function close_info(){
        //关闭提示窗口
        if(!c_){
            $("#mask_layer").fadeOut("fast",function(){
                $("#scs_alert").remove();
                $(this).remove();
            });
            c_=true;
        }
    }
    $("#alert_ok").click(function(){
        close_info();
        if(typeof(ok)=="function")return ok();
    });
    $("#confirm_ok").click(function(){
        close_info();
        if(typeof(ok)=="function")return ok();
    });
    $("#confirm_cancel").click(function(){
        close_info();
        if(typeof(can)=="function") return can();
    });
    function modal_key(e){
        e = e||event;
        close_info();
        var code = e.which||event.keyCode;
        if (code == 13 || code == 32){if(typeof(ok)=="function")return ok()}
        if (code == 27){if(typeof(can)=="function")return can()}
    }
    //绑定回车与ESC键
    if (document.attachEvent)
        document.attachEvent("onkeydown", modal_key);
    else
        document.addEventListener("keydown", modal_key, true);
}