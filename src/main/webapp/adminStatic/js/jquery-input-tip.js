	/*
		输入框提示 Ninputtip
		@CSS
			.Ninputtip{color:#999}
		@DOM
			<input type="text" name="search" class="search" />
		@Usage
			$('.search').Ninputtip(options);
		@options
			tipId		:'',	//显示提示信息的id
			maxLength	:0,		//最大长度
			maxTipId	:'',	//提示模块id
			maxTipText	:'',	//正常提示信息
			maxTipError	:'',	//错误提示信息
			pwdTipId	:''		//提示模块id
	*/
	$.fn.Ninputtip = function(options){
		var options = $.extend({}, {
			tipId		:'',
			maxLength	:0,
			maxTipId	:'',
			maxTipText	:'',
			maxTipError	:'',
			pwdTipId	:''
		}, options);
		this.each(function(){
			var input = $(this);
			if(options.tipId != ""){
				$(input).focusin(function(){
					$('#'+options.tipId).hide();
				}).focusout(function(){
					if($(input).val() == ""){
						$('#'+options.tipId).show();
					}
				});
				$('#'+options.tipId).click(function(){
					$(this).hide();
					$(input).focus();
				});
			}
			if(options.maxLength > 0){
				$("#"+options.maxTipId).hide();
				$(this).focusin(function(){
					showTip($(this));
					$("#"+options.maxTipId).fadeIn();
				}).focusout(function(){
					$("#"+options.maxTipId).fadeOut();
				}).keyup(function(){
					showTip($(this));
				}).bind("text",function(){
					showTip($(this));
				});
				//提示框显示
				function showTip(obj){
					if(options.maxLength - getLen(obj) >= 0){
						$("#"+options.maxTipId).html(options.maxTipText.replace(/\%t/g, (options.maxLength - getLen(obj))));
					}else{
						$("#"+options.maxTipId).html(options.maxTipError.replace(/\%t/g, (getLen(obj)-options.maxLength)));
					}
				}
				//获取输入框内容长度(中文为2个)
				function getLen(obj){
					return obj.val().replace(/[^\x00-\xff]/g,'xx').length;
				}
			}
			if(options.pwdTipId != ""){
				$("#"+options.pwdTipId).hide();
				$(this).focusin(function(){
					pwdTip($(this));
					$("#"+options.pwdTipId).fadeIn();
				}).focusout(function(){
					$("#"+options.pwdTipId).fadeOut();
				}).keyup(function(){
					pwdTip($(this));
				}).bind("text",function(){
					pwdTip($(this));
				});
				//提示框显示
				function pwdTip(obj){
					$("#"+options.pwdTipId).html( evaluatePswd(obj.val()) );
				}
				function evaluatePswd(word){
					var arr=new Array('低','中','高','强');
					if(word==""){
						var grd=0;
					}else if(word.length<7){
						var grd=1;
					}else{
						var grd=word.match(/[a-z](?![^a-z]*[a-z])|[A-Z](?![^A-Z]*[A-Z])|\d(?![^\d]*\d)|[^a-zA-Z\d](?![a-zA-Z\d]*[^a-zA-Z\d])/g).length;
					}
					return (grd==0) ? '请输入密码等待强度检测' : '密码强度检测：'+arr[grd-1];
				}
			}
		});
	};
	