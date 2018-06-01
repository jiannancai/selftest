
//参数设置
function setparam(xml,path){
	try
    {

	gt.InfoKind = xml.infoKind;
	gt.InvInfoInit();
	  gt.InfoClientName= xml.infoClientName;//InfoClientName – 购方名称
	  gt.InfoClientTaxCode= xml.infoClientTaxCode;//InfoClientTaxCode – 购方税号
	  gt.InfoClientBankAccount = xml.infoClientBankAccount;// InfoClientBankAccount – 购方开户行及账号
	  gt.InfoClientAddressPhone = xml.infoClientAddressPhone;// InfoClientAddressPhone – 购方地址电话
	  gt.InfoTaxRate = xml.infoTaxRate;//InfoTaxRate – 税率，（已授权的税率）
	  gt.InfoNotes =xml.infoNotes;//InfoNotes – 备注
	  gt.InfoInvoicer = xml.infoInvoicer;//InfoInvoicer – 开票人
	  gt.InfoChecker =xml.infoChecker;//InfoChecker – 复核人，可为空
	  gt.InfoCashier = xml.infoCashier;// InfoCashier – 收款人，可为空
	  gt.InfoListName = xml.infoListName;// InfoListName – 如不为空，则开具销货清单，此为发票上商品名称栏的清单信息，应为“(详见销货清单)”字样
	  gt.InfoBillNumber=xml.infoBillNumber; // InfoBillNumber – 销售单据编号，可为空
	  gt.InfoSellerBankAccount = xml.infoSellerBankAccount;// InfoSellerBankAccount –　销方开户行及账号
	  gt.InfoSellerAddressPhone = xml.infoSellerAddressPhone;// InfoSellerAddressPhone – 销方地址电话

	  gt.ClearInvList();
	  gt.InvListInit(); 

	  $.post(path+"/invoiceManage/invoice/hXGetinvoiceDetail",{"invoiceId":xml.invoiceId},function(data){
		  $.ajaxSetup({   
              async : false  
          }); 
			if(data.info = 'success'){
				$.each(data.data,function(index,element){
					
				   gt.ListGoodsName=element.ListGoodsName;// 商品或劳务名称
	   			  gt.ListTaxItem=element.ListTaxItem;//税目，4位数字，商品所属类别
	   			  gt.ListStandard=element.ListStandard;//规格型号
	   			  gt.ListUnit=element.ListUnit;//计量单位，如计量单位为空，则忽略数量和单价
	   			  gt.ListNumber=element.ListNumber;// 数量
	   			  gt.ListPrice=element.ListPrice;//单价
	   			  gt.ListPriceKind=element.ListPriceKind;//含税价标志，单价和金额的种类， 0为不含税价，1为含税价
	   			  gt.ListAmount=element.ListAmount;//金额，可以不传(为0)，由接口软件计算，如传入则应符合计算关系
	   			  gt.ListTaxAmount=element.ListTaxAmount;// 税额，可以不传（为0），由接口软件计算，如传入则应符合计算关系
	   			  
	   			 var ps1='<?xml version="1.0" encoding="GBK" ?>'+
	             '<FPXT>'+
	             '<INPUT>'+
	             '<GoodsNo>  '+
	             '<GoodsNoVer>'+element.goodsNoVer+'</GoodsNoVer> '+
	             '<GoodsTaxNo>'+element.goodsTaxNo+'</GoodsTaxNo >   '+
	             '<TaxPre>'+element.taxPre+'</TaxPre >  '+
	             '<TaxPreCon>'+element.taxPreCon+'</TaxPreCon >   '+
	             '<ZeroTax>'+element.zeroTax+'</ZeroTax >  '+
	             '<CropGoodsNo>'+element.cropGoodsNo+'</CropGoodsNo>   '+
	             '<TaxDeduction></TaxDeduction> '+
	             '</GoodsNo>  '+
	             '</INPUT>   '+
	             '</FPXT>';
	   			 ps1 = encode64(utf16to8(ps1));
	   			var ProducNo ='<?xml version="1.0" encoding="GBK"?>'+
	             '<FPXT_COM_INPUT>'+
	             '<ID>1100</ID>'+
	             '<DATA>'+ ps1+
	             '</DATA></FPXT_COM_INPUT>';

	   			gt.BatchUpload(ProducNo);
   			  gt.AddInvList();
				});
			}else{
				
			}
		
  	});
	 gt.CheckEWM=0;
    }
	catch(e)
	    {
		 alert("请检查基础参数设置,地区,金税盘链接等");
		closecard();
	    }
}
//发票打印
function invoiceprint(infoTypeCode,infoNumber,infoKind){
	try
    {
		 gt.InfoKind =infoKind;//发票种类（0：专用发票  2：普通发票  11：货物运输业增值税专用发票  12：机动车销售统一发票）
		 gt.InfoTypeCode =infoTypeCode;//要打印发票的十位代码
		 gt.InfoNumber =infoNumber;//要打印发票的号码
		 gt.GoodsListFlag ="0";//销货清单标志，0 – 打印发票，1 – 打印销货清单
		 gt.InfoShowPrtDlg ="1";//打印时是否显示边距确认对话框，0 – 不出现，1 – 出现
		 gt.PrintInv();

		if(gt.RetCode==5001){
			alert("5001 – 未找到发票或清单");
			return false;
		}
		else if(gt.RetCode==5012){
			alert("5012 – 未打印");
			return false;
		}
		else if(gt.RetCode==5013){
			alert("5013 – 打印失败");
			return false;
		}
		else if(gt.RetCode==5011){
		//	alert("5011 – 打印成功");
			return true;
		}
    }
	catch(e)
	    {
		alert("请检查基础参数设置,地区,金税盘链接等");
		closecard();
	
	    }
}
//发票开具
function invoicekaiju(){
	try
    {
		gt.Invoice();
		if(gt.RetCode==4001){
			alert("4001 – 传入发票数据不合法");
			return false;
		}
		else if(gt.RetCode==4002){
			alert("4002 – 开票前金税卡状态错");
			return false;
		}
		else if(gt.RetCode==4003){
			alert("4003 – 金税卡开票调用错误");
			return false;
		}
		else if(gt.RetCode==4004){
			alert("4004 – 开票后取金税卡状态错");
			return false;
		}
		else if(gt.RetCode==4012){
			alert("4012 – 开票失败");
			return false;
		}
		else if(gt.RetCode==4013){
			alert("4013 – 所开发票已作废");
			return false;
		}
		else if(gt.RetCode==4011){
		//	alert("4011 – 开票成功");
			var info =gt.InfoTypeCode +","+gt.InfoNumber ;
			//alert(" "+gt.InfoNumber);
			return info;
		}
    }
	catch(e)
	    {
		alert("请检查基础参数设置,地区,金税盘链接等");
		closecard();
	    
	    }
	
}
//发票作废
function invoicerevoke(str,path,certPassWord){
	
	try
    {
		var isSuccess=false;
		  opencard(certPassWord);
    	$.post(path+"/invoiceManage/invoice/hXMakeInvoiceGetInfoByInvalidapplyIds",{"invalidapplyIds":str},function(data){
    		$.ajaxSetup({   
                async : false  
            }); 
 			if(data.info = 'success'){
 				$.each(data.data,function(index,element){
 				//	InfoKind –发票种类（0：专用发票 1：废旧物资发票 2：普通发票  11：货物运输业增值税专用发票  12：机动车销售统一发票）
 					//InfoTypeCode – 要作废发票的十位或十二位代码
 					//InfoNumber – 要作废发票的号码
 					//isSuccess=true;
 						 gt.InfoKind =element.infoKind;
 						 gt.InfoTypeCode =element.invoiceDaiMa;
 						 gt.InfoNumber =element.invoicecode;
 						 gt.GoodsListFlag ="0";
 						 gt.InfoShowPrtDlg ="1";
 						 gt.CancelInv();
 						 if(gt.RetCode==6001){
 								alert("6001 – 当月发票库未找到该发票");
 								isSuccess=false;
 								
 							}
 							else if(gt.RetCode==6002){
 								alert("6002 – 该发票已经作废");
 								isSuccess=false;
 								
 							}
 							else if(gt.RetCode==6011){
 							
 								isSuccess=true;
 								
 								
 							}
 							else if(gt.RetCode==6012){
 								alert("6012 – 作废失败");
 								isSuccess=false;
 								
 							}
 							else if(gt.RetCode==6013){
 								alert("6013 – 作废失败(异常)");
 								isSuccess=false;
 								
 							}
 					if(!isSuccess){
 						alert("作废失败");
 					}
 					
 				});
 			}
    	});
   	 closecard();
   	 return isSuccess;
    }
	catch(e)
	    {
		alert("作废异常");
	      isSuccess=false;
	      return isSuccess;
	    }
}
//发票查询
function invokequery(infoKind,infoNumber,infoBillNumber,certPassWord){
	try
    {
	  opencard(certPassWord);
	  gt.InfoKind = infoKind;
	  gt.InfoNumber= infoNumber;
	  gt.InfoBillNumber =infoBillNumber;
	  gt.QryInv();
		 /* InfoBillNumber – 销售单据编号
	  或
	  InfoKind –发票种类（0：专用发票 1：废旧物资发票 2：普通发票 11：货物运输业增值税专用发票  12：机动车销售统一发票）
	        InfoTypeCode –发票代码
	  InfoNumber –发票的号码
	  销售单据编号与发票种类代码号码只传入一个即可 */
		  alert("发票种类:"+gt.InfoKind+"发票的十位代码:"+gt.InfoTypeCode+"发票的号码:"
			  +gt.InfoNumber+"销售单据编号:"+gt.InfoBillNumber+"合计不含税金额:"+
			  gt.InfoAmount+"合计税额:"+gt.InfoTaxAmount+"开票日期:"+gt.InfoInvDate+"打印标志:"+gt.PrintFlag);

	  closecard();
    }
	catch(e)
	    {
		alert("请检查基础参数设置,地区,金税盘链接等");
	    }
}


//红冲
function subSet(str,path,certPassWord){
	$.ajaxSetup({   
        async : false  
    }); 
	try {
	 opencard(certPassWord);
        	$.post(path+"/invoiceManage/invoice/hXMakeInvoiceGetInfo",{"invoiceIds":str},function(data){
     			if(data.info = 'success'){
     				$.each(data.data,function(index,element){
     					setparam(element,path);//设置参数
     					var info= invoicekaiju();//发票开具
     					if(info==false||info==null){
     						alert("发票开具失败");
     						return false;
     					}
     					var infos=info.split(",");
     					if(infos.length>1){
         					var infoTypeCode =infos[0];//发票十位代码
         					var infoNumber =infos[1];//发票号码
     					}
     					$.ajaxSetup({   
     				        async : false  
     				    }); 
     					 $.post(path+"/invoiceManage/invoice/hXUpdateRedInvoice",{"invoiceId":element.invoiceId,"infoTypeCode":infoTypeCode,"infoNumber":infoNumber,"type":"hasBinging_notprint"},function(data){
     			          	
     			   			if(data.info = 'success'){
     			   			alert("发票信息已更新");
     			   			window.location.reload(true);
     			   			}else{
     			   			alert("发票信息更新失败");
     			   			}
     			   		
     			      	});
     					
     				});
     			}
        	});
        	history.go(0);
        	
	}catch(e)
    	    {
    		alert("请检查基础参数设置,地区,金税盘链接等");
    		closecard();
    	    }
	//$("#setRateModal").modal({backdrop: 'static', keyboard: false});
}


//开票（航信）
function bjhxsub(path,certPassWord){
	if(confirm("确认开票吗？")){
		$.ajaxSetup({   
            async : false  
        }); 
		//获取打印发票的ids
		var str = "";
        $("input[name='items']:checkbox").each(function () {
            if ($(this).prop("checked")) {
                str += $(this).val() + ","
            }
        });
        if($.trim(str) == ''){
          	 $("#blankText").html("请选择一条记录！");
          	 $('#blankModal').modal('show');
          	 return false;
        }else{
        	try{
       	 opencard(certPassWord);
        	$.post(path+"/invoiceManage/invoice/hXMakeInvoiceGetInfo",{"invoiceIds":str},function(data){

     			if(data.info = 'success'){
     				$.each(data.data,function(index,element){
     					setparam(element,path);//设置参数
     					var info= invoicekaiju();//发票开具
     					if(info==false||info==null){
     						alert("发票开具失败");
     						return false;
     					}
     					var infos=info.split(",");
     					if(infos.length>1){
         					var infoTypeCode =infos[0];//发票十位代码
         					var infoNumber =infos[1];//发票号码
     					}
     					/*     	info=invoiceprint(infoTypeCode,infoNumber,element.infoKind);//发票打印
     				
     					if(info==false){
     						alert("发票打印:失败");
     						return false;
     					}*/
     					 $.post(path+"/invoiceManage/invoice/hXUpdateinvoice",{"invoiceId":element.invoiceId,
     						 "infoTypeCode":infoTypeCode,"infoNumber":infoNumber,"type":"hasBinging_notprint"},function(data){
     						$.ajaxSetup({   
     		                    async : false  
     		                }); 
     			   			if(data.info = 'success'){
     			   		//	alert("发票打印完成，发票信息已更新");
     			   			}else{
     			   			alert("发票打印完成，发票信息更新失败");
     			   			}
     			   		
     			      	});
     					
     				});
     			}
        	});
        	closecard();
        	history.go(0);
        	}catch(e)
    	    {
        		alert("请检查基础参数设置,地区,金税盘链接等");
        	 }
        }
	}else{
		return;
	}
	//$("#setRateModal").modal({backdrop: 'static', keyboard: false});
}

//打印（航信）
function bjhxprint(path,certPassWord){
	if(confirm("确认打印发票吗？")){
		$.ajaxSetup({   
            async : false  
        }); 
		//获取打印发票的ids
		var str = "";
        $("input[name='items']:checkbox").each(function () {
            if ($(this).prop("checked")) {
                str += $(this).val() + ","
            }
        });
        if($.trim(str) == ''){
          	 $("#blankText").html("请选择一条记录！");
          	 $('#blankModal').modal('show');
          	 return false;
        }else{
        	try{
       	 opencard(certPassWord);
        	$.post(path+"/invoiceManage/invoice/hXPrintInvoiceGetInfo",{"invoiceIds":str},function(data){

     			if(data.info = 'success'){
     				$.each(data.data,function(index,element){
     		    	var info=invoiceprint(element.invoiceDaiMa,element.invoicecode,element.infoKind);//发票打印
     					if(info==false){
     						alert("发票打印:失败");
     						return false;
     					}
     					 $.post(path+"/invoiceManage/invoice/hXUpdateinvoice",
     							 {"invoiceId":element.invoiceId,"infoTypeCode":element.invoiceDaiMa,"infoNumber":element.invoicecode,"type":"hasBinging_hasprinted"},
     						function(data){
     						$.ajaxSetup({   
     		                    async : false  
     		                }); 
     			   			if(data.info = 'success'){
     			   			alert("发票打印完成，发票信息已更新");
     			   			}else{
     			   			alert("发票打印完成，发票信息更新失败");
     			   			}
     			   		
     			      	});
     					
     				});
     			}
        	});
        	closecard();
        	history.go(0);
        	}catch(e)
    	    {
        		alert("请检查基础参数设置,地区,金税盘链接等");
        	    }
        }
	}else{
		return;
	}
	//$("#setRateModal").modal({backdrop: 'static', keyboard: false});
}
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	//将Ansi编码的字符串进行Base64编码
	function encode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	do {
	chr1 = input.charCodeAt(i++);
	chr2 = input.charCodeAt(i++);
	chr3 = input.charCodeAt(i++);
	enc1 = chr1 >> 2;
	enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	enc4 = chr3 & 63;
	if (isNaN(chr2)) {
	enc3 = enc4 = 64;
	} else if (isNaN(chr3)) {
	enc4 = 64;
	}
	output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
	+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
	chr1 = chr2 = chr3 = "";
	enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
	}
	//将Base64编码字符串转换成Ansi编码的字符串
	function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;
	if (input.length % 4 != 0) {
	return "";
	}
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
	return "";
	}
	do {
	enc1 = keyStr.indexOf(input.charAt(i++));
	enc2 = keyStr.indexOf(input.charAt(i++));
	enc3 = keyStr.indexOf(input.charAt(i++));
	enc4 = keyStr.indexOf(input.charAt(i++));
	chr1 = (enc1 << 2) | (enc2 >> 4);
	chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	chr3 = ((enc3 & 3) << 6) | enc4;
	output = output + String.fromCharCode(chr1);
	if (enc3 != 64) {
	output += String.fromCharCode(chr2);
	}
	if (enc4 != 64) {
	output += String.fromCharCode(chr3);
	}
	chr1 = chr2 = chr3 = "";
	enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
	}
	function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for(i = 0; i < len; i++) {
	c = str.charCodeAt(i);
	if ((c >= 0x0001) && (c <= 0x007F)) {
	out += str.charAt(i);
	} else if (c > 0x07FF) {
	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
	out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	} else {
	out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
	out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	}
	}
	return out;
	}
	function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while(i < len) {
	c = str.charCodeAt(i++);
	switch(c >> 4) {
	case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	// 0xxxxxxx
	out += str.charAt(i-1);
	break;
	case 12: case 13:
	// 110x xxxx 10xx xxxx
	char2 = str.charCodeAt(i++);
	out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	break;
	case 14:
	// 1110 xxxx 10xx xxxx 10xx xxxx
	char2 = str.charCodeAt(i++);
	char3 = str.charCodeAt(i++);
	out += String.fromCharCode(((c & 0x0F) << 12) |
	((char2 & 0x3F) << 6) |
	((char3 & 0x3F) << 0));
	break;
	}
	}
	return out;
	}
function opencard(certPassWord){
	 gt.CertPassWord = certPassWord;
	 
	 try{
		 gt.opencard();
		 if(gt.RetCode=="1011"){
			  return true;
		  }else if (gt.RetCode=="1007"){
		      alert("金税卡已经被占用，请退出所有可能使用金税卡的程序后重试");
		      return false;
		  }else if (gt.RetCode=="1001"){
		    alert("开票信息初始化失败，请重启浏览器或重装开票系统后重试");
		    return false;
		  }else{
			  alert("金税卡开启失败，错误代码："+gt.RetCode);
			  return false;
		  }
	 }catch(e){
		 alert("开票组件出错，错误信息为："+e.description);
			closeCard();
			return false;
	 }
 
}

function closecard(){
	gt.CloseCard(); 
}