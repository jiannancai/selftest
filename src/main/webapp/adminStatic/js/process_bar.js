/**
 * author fujialin
 * version 1.0 
 * Date 2016/07/02
 * description 模态框进度条显示和关闭
 */

function openLoading() {
	createDom();
    $("#myModal2_process").html('<iframe src="../../adminStatic/process_bar.html"  scrolling="no" style="border: 0px;width:100%;height:100%;filter:alpha(Opacity=70);-moz-opacity:0.7;opacity:0.7;"/>');
    $('#myModal2_process').modal('show');
}

//    模态框关闭
function closeLoading() {
    $('#myModal2_process').modal('hide');
}


function createDom(){
	$("<div class='modal fade' id='myModal2_process' tabindex='-1' role='dialog' aria-labelledby='myModalLabel2' aria-hidden='true'></div>").appendTo("body");  
}



