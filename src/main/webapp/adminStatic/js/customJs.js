//打开提示模态框
function openModal(msg){
	$('#msgText').html(msg);
	$('#msgModal').modal({
		keyboard : false,
		backdrop : false,
		show : true
	 });
}
// 打开模态框，点击“确定”按钮后加载页面
function  openModalLoad(msg,url){
	$('#msgText').html(msg);
	$('#msgModal').modal({
		keyboard : false,
		backdrop : false,
		show : true
	});
	$('#msgModal').on('hidden.bs.modal', function () {  
		loadJsp(url);  
	}); 
}
// 加载页面		
function loadJsp(url){
	$("#content").load(url,function(response,status){
		
	});
}
		
//阻止事件冒泡
function stopPropagation(e) {  
    e = e || window.event;  
    if(e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();  
    } else {  
        e.cancelBubble = true; //IE阻止冒泡方法  
    }  
}	
		 
 
