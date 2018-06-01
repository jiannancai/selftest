//参数设置
function setparam(path){
	var ret = "";
	try
    {
		$.post(path+"/invoiceManage/invoice/szbwSetParam",{"methodType":"setparam"},function(data){
			$.ajaxSetup({   
                 async : false  
             });
//			alert(data);
			ret = sk.Operate(data);
//			alert(ret);
		}
		);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//红字信息表申请
function redDashedApply(xml){
	var ret = "";
	try
    {
		ret = sk.Operate(xml);
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
		ret = sk.Operate(xml);
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
		ret = sk.Operate(xml);
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
		ret = sk.Operate(xml);
//		alert(ret);
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
		ret = sk.Operate(xml);
		//alert(ret);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//发票查询
function invokequery(xml){
	var ret = "";
	try
    {
		ret = sk.Operate(xml);
		alert(ret);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}
//税控钥匙信息查询
function taxcontrolkey(path){
	try
    {
		$.post(path+"/invoiceManage/invoice/szbwSetTaxKeyParam",{"methodType":"taxcontrolkey"},function(data){
			$.ajaxSetup({   
                 async : false  
             }); 
			alert(data);
			ret = sk.Operate(data);
			alert(ret);
			
		}
		);
    }
	catch(e)
	    {
	      alert(e.message + ",errno:" + e.number);
	    }
	return ret;
}


//设置打印边距（百旺）
function szbw_setMargin(path,fplxdm,topMargin,leftMargin,taxSysType) {
	$.ajaxSetup({
		async : false
	});
	var ret = "";
//	var x = taxcontrolkey(path);
//	alert(x)
	// 调用参数设置接口
	var paramInfo = setparam(path);// 设置参数
//	alert(paramInfo);
	var returnres = parsexml(paramInfo);

//	alert(returnres);
	if ('0' == returnres) {
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
				if ('0' == returnres) {
					
//					ret = 'success';
				} else {
					$("#blankText").text("调用接口设置打印边距失败！响应报文： "+returnXML);
					$('#blankModal').modal('show');
//					ret = 'fail';
				}

			}
		});

	} else {
		$("#blankText").text("参数设置失败！响应报文： "+paramInfo+" 若响应报文为空，请检查税控钥匙是否插好！");
		$('#blankModal').modal('show');
//		ret = 'fail';
	}
//	return ret;
}
//红冲发票申请、查询 flag 0：申请 1：查询
function redInvoiceDashed(path,invoiceId,reason,flag){
	$.ajaxSetup({   
        async : false  
    }); 
	//调用参数设置接口
	//var paramInfo = setparam(path);//设置参数
 	//var returnres = parsexml(paramInfo);
	var returnres='0';
	if('0' == returnres){
		alert(returnres);
		
		$.post(path+"/invoiceManage/invoice/szbwRedInvoiceApply",{"invoiceIds":invoiceId,"methodType":"redDashedInvoice","reason":reason,"flag":flag},function(data){
			$.ajaxSetup({   
		        async : false  
		    });
			var dataMess = data.info;
			if(dataMess == 'fail'){
				$("#blankText").html("发票红冲报文拼接出错");
	          	$('#blankModal').modal('show');
			}else{
    		//var result = dataMess.split("|");        		
    		//for(var i=0;i<result.length;i++){
    			var linkXML = dataMess;
    			var st = linkXML.substring(0,linkXML.indexOf("="));
    			var strg = linkXML.substring(linkXML.indexOf("<"));
    			//调用红字信息表申请接口
    			alert(strg);
    			//var returnXML = redDashedApply(strg);
    			//var returnres = parsexml(returnXML);
    			var returnres = '0';
    			//alert(returnres);
    			if('0'==returnres){
    				var processState = parseclztxml(returnXML);
    				if('2' == processStatus) {
    					if('0' == flag){
    						reopen($("#invoiceId").val(),$("#applyId").val(),"",reason,managerId);
    					}else{
    						reopen($("#invoiceId").val(),$("#applyId").val(),"",reason,managerId);
    					}
    					
    				}else if(processStatus=='0' || processStatus=='1' || processStatus=='3'){
    					window.location.href = "${ctx }/invoiceManage/invoice/saveProcessStatus?processStatus="+processStatus+"&invoiceId="+$("#invoiceId").val();
    					
    				}
    				
    			}else{
    				$("#blankText").html("调用红字信息表申请接口返回信息为失败！");
    	          	$('#blankModal').modal('show');
    			}
    			
    	//	}
			}
    	});
	
	}else{
		$("#blankText").html("参数设置失败！");
      	$('#blankModal').modal('show');
	}
	
}

//开票（百旺）
function szbwsub(path){
	modalconfirm("确认开票吗？");
	$('#confirmModalId').one("click",function(){submitszbwsub(path);});
    return false;
}
function submitszbwsub(path){
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
   	//调用参数设置接口
//   	alert("kaip");
   	debugger;
   	var paramInfo = setparam(path);//设置参数
    	var returnres = parsexml(paramInfo);
   	if('0' == returnres){
   		$.post(path+"/invoiceManage/invoice/szbwgetParam",{"invoiceIds":str,"methodType":"invoicekaiju"},function(data){
   			$.ajaxSetup({   
   	             async : false  
   	         }); 
   			debugger;
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
       			var returnres = parsexml(returnXML);
//       			alert(returnres);
       			if('0'==returnres){
       				var invoicecode = fphmxml(returnXML);
       				var invoicedama = fpdmxml(returnXML);
       				var type = "hasBinging_notprint";
       				var updateReturn = returnAjax(path,st,invoicecode,invoicedama,type);
       				if(updateReturn == 'success'){
       					$("#blankText").html("发票开具完成，发票信息已更新");
       		          	$('#blankModal').modal('show');
       				}else{
       					$("#blankText").html("发票开具完成，发票信息更新失败");
       		          	$('#blankModal').modal('show');
       				}
       				
       			}else{
       				$("#blankText").text("发票开具失败！响应报文： "+returnXML);
       	          	$('#blankModal').modal('show');
       			}
       			
       		}
   			}
       	});
   	
   	}else{
   		$("#blankText").text("参数设置失败！响应报文： "+paramInfo+" 若响应报文为空，请检查税控钥匙是否插好！");
         	$('#blankModal').modal('show');
   	}
   }  
}

//打印（百旺）
function szbwprint(path){
	modalconfirm("确认打印发票吗？");
	$('#confirmModalId').one("click",function(){submitszbwprint(path);});
    return false;
}
function submitszbwprint(path){
	$.ajaxSetup({   
        async : false  
    }); 
	//获取打印发票的ids
	debugger;
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
    	var paramInfo = setparam(path);//设置参数
     	var returnres = parsexml(paramInfo);
    	if('0' == returnres){
    		
    		$.post(path+"/invoiceManage/invoice/szbwgetParam",{"invoiceIds":str,"methodType":"invoiceprint"},function(data){
    			$.ajaxSetup({   
    	            async : false  
    	        }); 
    			var dataMess = data.info;
        		var result = dataMess.split("|");        		
        		for(var i=0;i<result.length;i++){
        			var linkXML = result[i];
        			var st = linkXML.substring(0,linkXML.indexOf("="));
        			var strg = linkXML.substring(linkXML.indexOf("<"));
        			//调用发票打印接口
        			var returnXML  = invoiceprint(strg);
        			var returnres = parsexml(returnXML);
        			if('0'==returnres){
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
        				$("#blankText").text("发票打印失败！响应报文： "+returnXML);
        	          	$('#blankModal').modal('show');
        			}
        			
        		}
        	});
    	
    	}else{
    		$("#blankText").text("参数设置失败！响应报文： "+paramInfo+" 若响应报文为空，请检查税控钥匙是否插好！");
          	$('#blankModal').modal('show');
    	}
    }
}
//发票作废接口调用(深圳南方百旺)
function szbw_nfInvoke(path,invalidapplyIds) {
	$.ajaxSetup({   
        async : false  
    }); 
   
//	alert(invalidapplyIds);
	debugger;
	var paramInfo = setparam(path);//设置参数
 	var returnres = parsexml(paramInfo);
// 	var returnres='0';
 	//alert(returnres);
	if('0' == returnres){
		//alert("参数");
		$.post(path+"/invoiceManage/invoice/szbwMakeInvoiceGetInfoByInvalidapplyIds",{"invalidapplyIds":invalidapplyIds},function(data){
    		$.ajaxSetup({   
                async : false  
            }); 
    		//alert(data.info);
 			if(data.info = 'success'){
 				//alert("发票作废进入");
 				$.each(data.data,function(index,element){
 				var invoiceIds = "";	
 				var invoiceIds = element.invoiceId;
 				invoiceIds += ","
// 				alert(invoiceIds);
 				$.post(path+"/invoiceManage/invoice/szbwgetParam",{"invoiceIds":invoiceIds,"methodType":"invoicerevoke"},function(data){
 	    			$.ajaxSetup({   
 	    	            async : false  
 	    	        }); 
 	    			var dataMess = data.info;
 	        		var result = dataMess.split("|"); 
 	        		for(var i=0;i<result.length;i++){
 	        			//alert(result[i]);
 	        			var linkXML = result[i];
 	        			var st = linkXML.substring(0,linkXML.indexOf("="));
 	        			//alert(st);
 	        			var strg = linkXML.substring(linkXML.indexOf("<"));
// 	        			alert(strg);
 	        			//调用发票作废接口
 	        			var returnXML  = invoicerevoke(strg);
 	        			var returnres = parsexml(returnXML);
// 	        			var returnres='0';
 	        			//alert(returnres);
 	        			if('0'==returnres){
 	        				//作废日期
 	        				var canexamTime = zfrqrevokexml(returnXML);
// 	        				var canexamTime = '20160720';
 	        				//alert(canexamTime);
 	        				invalidapplyIds += ","
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
 	        				
 	        			}else{
 	        				$("#auditText").text("发票作废失败！响应报文： "+returnXML);
 	        	          	$('#auditModal').modal('show');
 	        			}
 	        			
 	        		}
 	        	});		 
 					
 				});
 			}
    	});
		
	
	}else{
		$("#auditText").text("参数设置失败！响应报文： "+paramInfo+" 若响应报文为空，请检查税控钥匙是否插好！");
      	$('#auditModal').modal('show');
	}
}
//auditSZBW废弃不用
function auditSZBW(path) {
	$.ajaxSetup({   
        async : false  
    }); 
    var str = "";
    $("input[name='items']:checkbox").each(function () {
        if ($(this).prop("checked")) {
            str += $(this).val() + ","
        }
    })
    if (str == "") {
        $("#auditText").html("请选择要通过审核的发票！");
        $('#auditModal').modal('show');
    } else {
    	//alert("start参数");
    	var paramInfo = setparam(path);//设置参数
    	//alert("end参数");
     	var returnres = parsexml(paramInfo);
     	//alert(returnres);
    	if('0' == returnres){
    		//alert("参数");
    		$.post(path+"/invoiceManage/invoice/szbwMakeInvoiceGetInfoByInvalidapplyIds",{"invalidapplyIds":str},function(data){
        		$.ajaxSetup({   
                    async : false  
                }); 
        		//alert(data.info);
     			if(data.info = 'success'){
     				//alert("发票作废进入");
     				$.each(data.data,function(index,element){
     				var invoiceIds = "";	
     				var invoiceIds = element.invoiceId;
     				invoiceIds += ","
     				//alert(invoiceIds);
     				$.post(path+"/invoiceManage/invoice/szbwgetParam",{"invoiceIds":invoiceIds,"methodType":"invoicerevoke"},function(data){
     	    			$.ajaxSetup({   
     	    	            async : false  
     	    	        }); 
     	    			var dataMess = data.info;
     	        		var result = dataMess.split("|"); 
     	        		for(var i=0;i<result.length;i++){
     	        			//alert(result[i]);
     	        			var linkXML = result[i];
     	        			var st = linkXML.substring(0,linkXML.indexOf("="));
     	        			//alert(st);
     	        			var strg = linkXML.substring(linkXML.indexOf("<"));
     	        			//alert(strg);
     	        			//调用发票作废接口
     	        			var returnXML  = invoicerevoke(strg);
     	        			var returnres = parsexml(returnXML);
     	        			//alert(returnres);
     	        			if('0'==returnres){
     	        				//作废日期
     	        				var canexamTime = zfrqrevokexml(returnXML);
     	        				//alert(canexamTime);
     	        				$.post(path+"/invalidapplyManage/invalidapply/passApproveSZBW",{"invalidapplyIds":str,"canexamTime":canexamTime},function(data){
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
     	        				
     	        			}else{
     	        				$("#auditText").html("发票作废失败！");
     	        	          	$('#auditModal').modal('show');
     	        			}
     	        			
     	        		}
     	        	});		 
     					
     				});
     			}
        	});
    		
    	
    	}else{
    		$("#auditText").html("参数设置失败！");
          	$('#auditModal').modal('show');
    	}
//    	history.go(0);
    }
}

function parsexml(xml){
	debugger;
	var b='';
	$(function () {
		//var xmlDemo = ("<?xml version=\"1.0\" encoding=\"gbk\"?><business id=\"20004\" comment=\"发票打印\"><body yylxdm=\"1\"><returncode>0</returncode><returnmsg>成功</returnmsg></body></business>");
		//var xmlDemo = ("<?xml version=\"1.0\" encoding=\"gbk\"?><business id=\"20004\" comment=\"发票打印\"><body yylxdm=\"1\"><kpzdbs>001</kpzdbs><fplxdm>007</fplxdm><fpdm>2541</fpdm><fphm>null</fphm><dylx>0</dylx><dyfs>0</dyfs></body></business>");
        var a = $.parseXML(xml);
        $(a).find('body').each(function () {
        	b=$(this).children('returncode').text();
           
        });
});
	return b;
}

function fpdmxml(xml){
	debugger;
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('returndata').each(function () {
			b=$(this).children('fpdm').text();
			
		});
	});
	return b;
}
function fphmxml(xml){
	debugger;
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('returndata').each(function () {
			b=$(this).children('fphm').text();
			
		});
	});
	return b;
}
function fpdmPrintxml(xml){
	debugger;
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('body').each(function () {
			b=$(this).children('fpdm').text();
			
		});
	});
	return b;
}
function fphmPrintxml(xml){
	debugger;
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('body').each(function () {
			b=$(this).children('fphm').text();
			
		});
	});
	return b;
}
function zfrqrevokexml(xml){
	debugger;
	var b='';
	$(function () {		
		var a = $.parseXML(xml);
		$(a).find('returndata').each(function () {
			b=$(this).children('zfrq').text();
			
		});
	});
	return b;
}
function parseclztxml(xml){
	debugger;
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
	debugger;
	var ifSuccess = '';
	$.post(path+"/invoiceManage/invoice/updateszbw",{"st":st,"invoicecode":invoicecode,"invoicedama":invoicedama,"type":type},function(data){
		ifSuccess = data.info;
		
	});
	return ifSuccess;
}
