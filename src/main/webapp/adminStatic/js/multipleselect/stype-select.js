/**
 * 收入类型多选下拉菜单
 * 
 * 依赖css：bootstrap-multiselect.css
 * 依赖js：bootstrap-multiselect.js
 */
$(function() {
	//添加多选属性
	//$("#stype").attr("multiple","multiple");
	
    $("#stypeList").multiselect({
    	includeSelectAllOption: true,
        //enableFiltering: true,
        inheritClass: true,
        nonSelectedText: '请选择',
        selectAllText: '全选',
        allSelectedText: '全选',
        nSelectedText: '个已选择',
        maxHeight:'400'
//		optionLabel: function(element) {
//            return $(element).html() + '(' + $(element).val() + ')';
//        }
        
    });
    
    
    $("#stypeListNew").multiselect({
    	includeSelectAllOption: true,
        //enableFiltering: true,
        inheritClass: true,
        nonSelectedText: '请选择',
        selectAllText: '全选',
        allSelectedText: '全选',
        nSelectedText: '个已选择',
        maxHeight:'400'     
    });
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
    
    $(".table").addClass("table-hover");
    $(".table").removeClass("table-bordered");
    	
  	function toggleMore(){
  		
    	if($("#hiddenSearch").css("display")=="none"){
    		$("#hiddenSearch").css("display","block");
    	}else{
    		$("#hiddenSearch").css("display","none");
    	}
   	}
    
     	

});