/**
 * 2016.8.30 14.36
 * 统一写clearValue 方法 目的是reset 选择性的清除
 * pageForm下的 input checkbox button
 * 且pageNo也要赋值 否则一起被清除了
 * 不想清除的标签class加上notReset
 * chenyuhao
 */
function clearValue() {
	    $("#pageForm").find("input").not(":checkbox").not(":button").not(".notReset").val('');
	    $("#pageForm").find("select").val("-1");
	    $("#pageNo").val("1");
	}
/**
 *  hover 时高亮
 */
$(".table").addClass("table-hover");

$("#checkAll").click(function(){
	
	if($("#checkAll")[0].checked){
		
		$("[name=items]").each(function(index,obj){
			
			$(this).prop("checked",true);
		})
		
	}else{
		$("[name=items]").each(function(){
			$(this).prop("checked",false);
		})
	}
	
		
})
$("#xnypager").parent("div").attr("class","col-lg-12");