//导入注册码信息，用来验证是否有操作权限
var returnCode = "00000000";
function importlicense(path){
	var ret = "";
	try
    {
		$.post(path+"/invoiceManage/invoice/importlicense",{"methodType":"importlicense"},function(data){
			$.ajaxSetup({   
                 async : false  
             });
//			alert(data);
			ret = mgInvoke.OperateDiskX(data);

		}
		);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//导入商品编码。v2.0.6.4版本之后都需要重新导入商品编码
function importspbm(path){
	var ret = "";
	try
	{
		$.post(path+"/invoiceManage/invoice/importlicense",{"methodType":"importspbm"},function(data){
			$.ajaxSetup({   
				async : false  
			});
//			alert(data);
			ret = mgInvoke.OperateDiskX(data);
			
		}
		);
	}
	catch(e)
	{
		alert(e.message + ",errno:" + e.number);
	}
	return ret;
}
//税控盘信息查询
function getSkpMess(){
	var ret = "";
	try
    {
		var xmlDemo = ("<?xml version=\"1.0\" encoding=\"gbk\"?>\n<business comment=\"税控盘信息查询\" id=\"SKPXXCX\">\n<body yylxdm=\"1\">\n<input>\n<skpkl>88888888</skpkl>\n</input>\n</body>\n</business>");
		alert(xmlDemo);
//		var comActiveX =new ActiveXObject("NISECSKPCX.NISECSKPCXCtrl.1");
		ret = mgInvoke.OperateDiskX(xmlDemo);
		
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//发票查询
function getInvoiceMsg(){
	var ret = "";
	try
    {
		var xmlDemo = ("<?xml version=\"1.0\" encoding=\"gbk\"?>\n<business comment=\"发票查询\" id=\"FPCX\">\n<body yylxdm=\"1\">\n<input>\n<nsrsbh>710000000000044</nsrsbh>\n<skpbh>499000140252</skpbh>\n<skpkl>88888888</skpkl>\n<keypwd>12345678</keypwd>\n<fplxdm>004</fplxdm>\n<cxfs>1</cxfs>\n<cxtj>2016010120160728</cxtj>\n<cxlx>0</cxlx>\n</input>\n</body>\n</business>");
		alert(xmlDemo);
		ret = mgInvoke.OperateDiskX(xmlDemo);
		
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//统计信息查询
function getCountMsg(){
	var ret = "";
	try
    {
		var xmlDemo = ("<?xml version=\"1.0\" encoding=\"gbk\"?>\n<business comment=\"统计信息查询\" id=\"TJXXCX\">\n<body yylxdm=\"1\">\n<input>\n<nsrsbh>710000000000044</nsrsbh>\n<skpbh>499000140252</skpbh>\n<skpkl>88888888</skpkl>\n<keypwd>12345678</keypwd>\n<fplxdm>004</fplxdm>\n</input>\n</body>\n</business>");
		alert(xmlDemo);
		ret = mgInvoke.OperateDiskX(xmlDemo);
		
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//打印设置边距
function invoiceinstall(xml){
	var ret = "";
	try
    {
		ret = mgInvoke.OperateDiskX(xml);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//发票打印
function invoiceprint(xml){
	var ret = "";
	try
    {
		ret = mgInvoke.OperateDiskX(xml);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//发票开具
function invoicekaiju(xml){
	var ret = "";
	try
    {
		ret = mgInvoke.OperateDiskX(xml);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}

//发票作废
function invoicerevoke(xml){
	var ret = "";
	try
    {
		ret = mgInvoke.OperateDiskX(xml);
//		alert(ret);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//判断ActiveX控件是否已经注册并加载到浏览器 
//@return true-已经注册，并且加载；false-未注册控件或未能成功加载ActiveX控件。 
function isActiveXRegistered() {  
    try {  
    	var comActiveX =new ActiveXObject("NISECSKPCX.NISECSKPCXCtrl.1");  
        return true;  
    } catch (e) {
    	alert(e.message + ",errno:" + e.number); 
    }  
    return false;  
}  
//检测是否允许ActiveX控件运行 
//@param true-允许ActiveX控件运行；false-不允许ActiveX控件运行 
function DisActiveX()
{ 
   //xmlhttp对象
   var kXmlHttp = null;    
   try
   {
      //非微软IE支持的xmlhttp对象
     if (typeof XMLHttpRequest != "undefined")
     {
        kXmlHttp = new XMLHttpRequest();
        return true;
     }     
   }
   catch(e)
   {  }
   //微软IE支持的xmlhttp对象
   var aVersionhs = ["MSXML2.XMLHttp.5.0",
       "MSXML2.XMLHttp.4.0",
       "MSXML2.XMLHttp.3.0",
       "MSXML2.XMLHttp",
       "Microsoft.XMLHttp"];
   //IE创建方式
   for (var i = 0; i < aVersionhs.length; i++)
   {      
      try
     {
        kXmlHttp = new ActiveXObject(aVersionhs[i]);
        return true;
     }
    catch(e)
     { }      
   }
 return false;
}
//设置打印边距（百旺）
function szbwmg_setMargin(path,fplxdm,topMargin,leftMargin,taxSysType) {
	$.ajaxSetup({
		async : false
	});
	
	//查询税控盘信息
//	var xml = getSkpMess();
//	alert(xml);
//	var msg = getInvoiceMsg();
//	alert(msg);
//	var countMsg = getCountMsg();
//	alert(countMsg);
	// 调用注册码导入接口
	var paramInfo = importlicense(path);// 注册码导入
//	alert(paramInfo);
	var returnres = parsexml(paramInfo);
//	var returnres = '0';
	if (returnCode == returnres) {
		
		$.post(path + "/invoiceManage/invoice/szbwgetParamMargin", {
			"methodType" : "invoiceSetMargin",
			"fplxdm" : fplxdm,
			"topMargin" : topMargin,
			"leftMargin" : leftMargin,
			"taxSysType" : taxSysType
		}, function(data) {
			$.ajaxSetup({
				async : false
			});
			var dataMess = data.info;
			var result = dataMess.split("|");
			for ( var i = 0; i < result.length; i++) {
				var linkXML = result[i];
				var st = linkXML.substring(0, linkXML.indexOf("="));
				var strg = linkXML.substring(linkXML.indexOf("<"));
				// 调用打印边距设置接口
//				alert(strg);
				var returnXML = invoiceinstall(strg);
//				alert(returnXML);
				var returnres = parsexml(returnXML);
//				alert(returnres);
				if ('00000000' == returnres) {
					
				} else {
					$("#blankText").text("设置打印边距失败！响应报文："+returnXML);
					$('#blankModal').modal('show');
				}

			}
		});

	} else {
		$("#blankText").text("注册码信息导入失败！响应报文：=="+paramInfo+"==若响应报文为空，请检查税控盘是否插好！");
		$('#blankModal').modal('show');
	}
}

//开票（百旺）
function szbwmgsub(path){
	modalconfirm("确认开票吗？");
    $('#confirmModalId').one("click",function(){submitszbwmgsub(path);});
    return false;
}

function submitszbwmgsub(path){
	$.ajaxSetup({   
        async : false  
    }); 
	//获取发票开具的ids
	var str = "";
   $("input[name='items']:checkbox").each(function () {
       if ($(this).prop("checked")) {
           str += $(this).val() + ","
       }
   });
   if($.trim(str) == ''){
     	 $("#blankText").html("请选择一条记录！");
     	 $('#blankModal').modal('show');
   }else{
   	//导入注册码信息，用来验证是否有操作权限
   	var paramInfo = importlicense(path);
    var returnres = parsexml(paramInfo);
   	//var returnres = '00000000';
   	if(returnCode == returnres){
   		$.post(path+"/invoiceManage/invoice/szbwsmgetParam",{"invoiceIds":str,"methodType":"invoicekaiju"},function(data){
   			$.ajaxSetup({   
   	             async : false  
   	         }); 
   			var dataMess = data.info;
   			if(dataMess == 'fail'){
   				$("#blankText").html("发票开具失败,请检查发票是否已经开具！");
   	          	$('#blankModal').modal('show');
   			}else{
       		var result = dataMess.split("|");        		
       		for(var i=0;i<result.length;i++){
       			var linkXML = result[i];
       			var st = linkXML.substring(0,linkXML.indexOf("="));
       			var strg = linkXML.substring(linkXML.indexOf("<"));
       			//调用发票开具接口
//       			alert(strg);
       			var returnXML = invoicekaiju(strg);
//       			alert(returnXML);
       			var returnres = parsexml(returnXML);
//       			var returnres = '0';
       			if('0'==returnres){
       				var invoicecode = fphmxml(returnXML);
       				var invoicedama = fpdmxml(returnXML);
//       				var invoicecode ='20160817';
//       			    var invoicedama ='2589632568';	
       				var type = "hasBinging_notprint";
       				var updateReturn = returnAjax(path,st,invoicecode,invoicedama,type);
       				if(updateReturn == 'success'){
       					$("#blankText").html("发票开具完成，发票信息已更新");
       		          	$('#blankModal').modal('show');
       				}else{
       					$("#blankText").html("发票开具完成，发票信息更新失败");
       		          	$('#blankModal').modal('show');
       				}
       				
       			}else if('0100008F'==returnres){	//导入商品编码
       				var paramInfo1 = importspbm(path);
       			    var spbmRetCode = parsexml(paramInfo);
       			    if(returnCode == spbmRetCode){
       			    	$("#blankText").text("发票开具失败！原因：未导入商品编码.已重新导入商品编码，请重新开票！");
           	          	$('#blankModal').modal('show');
       			    }else{
       			    	$("#blankText").text("发票开具失败！导入商品编码响应报文："+paramInfo1);
           	          	$('#blankModal').modal('show');
       			    }
       			}
       			else{
       				$("#blankText").text("发票开具失败！响应报文："+returnXML);
       	          	$('#blankModal').modal('show');
       			}
       			
       		}
   			}
       	});
   	
   	}else{
   		$("#blankText").text("注册码信息导入失败！响应报文："+paramInfo+" 若响应报文为空，请检查税控盘是否插好！");
         	$('#blankModal').modal('show');
   	}
   }  
}
//打印（百旺）
function szbwmgprint(path){	
	modalconfirm("确认打印发票吗？");
	$('#confirmModalId').one("click",function(){submitszbwmgprint(path);});
    return false;
}

function submitszbwmgprint(path){
	$.ajaxSetup({   
        async : false  
    }); 
	//获取打印发票的ids
	var str = "";
    $("input[name='items']:checkbox").each(function () {
        if ($(this).prop("checked")) {
            str += $(this).val() + ",";
        }
    });
    if($.trim(str) == ''){
      	 $("#blankText").html("请选择一条记录！");
      	 $('#blankModal').modal('show');
    }else{
    	var paramInfo = importlicense(path);
     	var returnres = parsexml(paramInfo);
//    	var returnres ='0';
    	if(returnCode == returnres){
    		
    		$.post(path+"/invoiceManage/invoice/szbwsmgetParam",{"invoiceIds":str,"methodType":"invoiceprint"},function(data){
    			$.ajaxSetup({   
    	            async : false  
    	        }); 
    			var dataMess = data.info;
        		var result = dataMess.split("|");        		
        		for(var i=0;i<result.length;i++){
        			var linkXML = result[i];
        			var st = linkXML.substring(0,linkXML.indexOf("="));
        			var strg = linkXML.substring(linkXML.indexOf("<"));
//        			alert(strg);
        			//调用发票打印接口
        			var returnXML  = invoiceprint(strg);
//        			alert(returnXML);
        			var returnres = parsexml(returnXML);
        			if('00000000'==returnres){
        				var invoicecode =fphmPrintxml(strg);
        				var invoicedama =fpdmPrintxml(strg);
        				var type = "hasBinging_hasprinted";
        			    var updateMess = returnAjax(path,st,invoicecode,invoicedama,type);
        			    if(updateMess == 'success'){
        					$("#blankText").html("发票打印完成，发票信息已更新");
        		          	$('#blankModal').modal('show');
        				}else{
        					$("#blankText").html("发票打印完成，发票信息更新失败");
        		          	$('#blankModal').modal('show');
        				}
        			}else{
        				$("#blankText").text("发票打印失败！响应报文："+returnXML);
        	          	$('#blankModal').modal('show');
        			}
        			
        		}
        	});
    	
    	}else{
    		$("#blankText").text("注册码信息导入失败！响应报文："+paramInfo+" 若响应报文为空，请检查税控盘是否插好！");
          	$('#blankModal').modal('show');
    	}
    }
}
//发票作废审核通过(深圳百旺)
function szbw_mgInvoke(path,invalidapplyIds) {
	$.ajaxSetup({   
        async : false  
    }); 
//   alert(invalidapplyIds);
	//var paramInfo = importlicense(path);//设置参数
 	//var returnres = parsexml(paramInfo);
	var returnres = returnCode;
	if(returnCode == returnres){
		$.post(path+"/invoiceManage/invoice/szbwMakeInvoiceGetInfoByInvalidapplyIds",{"invalidapplyIds":invalidapplyIds},function(data){
    		$.ajaxSetup({   
                async : false  
            }); 
//    		alert(data.info);
 			if(data.info = 'success'){
 				$.each(data.data,function(index,element){
 				var invoiceIds = "";	
 				var invoiceIds = element.invoiceId;
 				invoiceIds += ",";
// 				alert(invoiceIds);
 				$.post(path+"/invoiceManage/invoice/szbwsmgetParam",{"invoiceIds":invoiceIds,"methodType":"invoicerevoke"},function(data){
 	    			$.ajaxSetup({   
 	    	            async : false  
 	    	        }); 
 	    			var dataMess = data.info;
 	        		var result = dataMess.split("|"); 
 	        		for(var i=0;i<result.length;i++){
// 	        			alert(result[i]);
 	        			var linkXML = result[i];
 	        			var st = linkXML.substring(0,linkXML.indexOf("="));
 	        			var strg = linkXML.substring(linkXML.indexOf("<"));
// 	        			alert(strg);
 	        			//调用发票作废接口
 	        			//2017-05-10摩根没有作废接口，直接通过
 	        			//var returnXML  = invoicerevoke(strg);
 	        			//var returnres = parsexml(returnXML);
 	        			var returnres = '00000000';
// 	        			alert(returnres);
 	        			if('00000000'==returnres){
 	        				//作废日期
 	        				//var canexamTime = zfrqrevokexml(returnXML);
// 	        				var canexamTime = '20160720';
 	        				//2017-05-10摩根没作废接口，直接模拟数据
 	        				var canexamTime = getNowDateStr();
// 	        				alert(canexamTime);
 	        				$.post(path+"/invalidapplyManage/invalidapply/passApproveSZBW",{"invalidapplyIds":invalidapplyIds,"canexamTime":canexamTime},function(data){
 	        	        		resultMess = "<ul>";
 	        	     			if(data.info == 'success'){
 	        	     				$.each(data.data,function(index,element){
 	        	     					resultMess +="<li>发票号码:"+ element.invoiceNo + " " + element.operateDesc+"</li>";
 	        	     				});
 	        	     			}else{
 	        	     				resultMess += "作废失败，在修改明细数据时出现错误";
 	        	     			}
 	        	     			resultMess +="</ul>"
 	        	     			$("#auditText").html(resultMess);
 	        	             	$('#auditModal').modal('show');
 	        	        	});
 	        				
 	        			}else if('02000014'==returnres){	//原发票已开作废发票
 	        				var date = new Date();
 	        				var canexamTime = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()+''+date.getHours()+''+date.getMinutes()+''+date.getSeconds();
// 	        				var canexamTime = '20160720';
// 	        				alert(canexamTime);
 	        				$.post(path+"/invalidapplyManage/invalidapply/passApproveSZBW",{"invalidapplyIds":invalidapplyIds,"canexamTime":canexamTime},function(data){
 	        					if(data.info == 'success'){
 	        						$("#auditText").text("发票作废失败！响应报文："+returnXML);
 	    	        	          	$('#auditModal').modal('show');
 	        	     			}else{
 	        	     				resultMess += "作废失败，在修改明细数据时出现错误";
 	        	     			}
 	        					
 	        				});
 	        			}else{
 	        				$("#auditText").text("发票作废失败！响应报文："+returnXML);
 	        	          	$('#auditModal').modal('show');
 	        			}
 	        			
 	        		}
 	        	});		 
 					
 				});
 			}
    	});
		
	
	}else{
		$("#auditText").text("注册码信息导入失败！响应报文："+paramInfo+" 若响应报文为空，请检查税控盘是否插好！");
      	$('#auditModal').modal('show');
	}
    
}

function getNowDateStr(){
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
	month = month + 1;
	if (month < 10) 
		month = "0" + month;
	if (date < 10) 
		date = "0" + date;
	return year + month + date; 
}

function parsexml(xml){
	var b='';
	$(function () {
        var a = $.parseXML(xml);
        $(a).find('output').each(function () {
        	b=$(this).children('returncode').text();
           
        });
});
	return b;
}
function fpdmxml(xml){
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('output').each(function () {
			b=$(this).children('fpdm').text();
			
		});
	});
	return b;
}
function fphmxml(xml){
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('output').each(function () {
			b=$(this).children('fphm').text();
			
		});
	});
	return b;
}
function fpdmPrintxml(xml){
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('input').each(function () {
			b=$(this).children('fpdm').text();
			
		});
	});
	return b;
}
function fphmPrintxml(xml){
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('input').each(function () {
			b=$(this).children('fphm').text();
			
		});
	});
	return b;
}
function zfrqrevokexml(xml){
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('output').each(function () {
			b=$(this).children('zfrq').text();
			
		});
	});
	return b;
}
function parseclztxml(xml){
	var b='';
	$(function () {
        var a = $.parseXML(xml);
        $(a).find('returndata').each(function () {
        	b=$(this).children('clzt').text();
           
        });
});
	return b;
}
function returnAjax(path,st,invoicecode,invoicedama,type){
	var ifSuccess = '';
	$.post(path+"/invoiceManage/invoice/updateszbw",{"st":st,"invoicecode":invoicecode,"invoicedama":invoicedama,"type":type},function(data){
		ifSuccess = data.info;
		
	});
	return ifSuccess;
}
