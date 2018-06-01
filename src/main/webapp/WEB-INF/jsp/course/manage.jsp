<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>管理员界面</title>
</head>
<body>
<form:form modelAttribute="course" id="pageForm" action="../courseController/manage" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						<c:choose>
							<c:when test="${course.id == null}">
								新增管理员信息
							 </c:when>
							<c:otherwise>
								修改管理员信息
    						</c:otherwise>
						</c:choose>
				</h3>
				<input id="idy" value="${course.id}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">课程号:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="couNumber" cssClass="form-control" placeholder="课程号" id="couNumber"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">课程名称:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="name" path="name" cssClass="form-control" placeholder="课程名称"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">上课教室:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="classroom" path="classroom" cssClass="form-control" placeholder="上课教室"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">任课老师:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="teacher" path="teacher" cssClass="form-control" placeholder="任课老师"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">上课周次:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="times" path="times" cssClass="form-control" placeholder="格式：周六，第3，7节"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">开始时间:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="beginTime" path="beginTime" cssClass="form-control" placeholder="请点击" readonly="true" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">结束时间:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="endTime" path="endTime" cssClass="form-control" placeholder="请点击" readonly="true" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">开设人数:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="planCount" path="planCount" cssClass="form-control" placeholder="开设人数" type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">报名人数:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="actualCount" path="actualCount" cssClass="form-control" placeholder="报名人数" type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">剩余可报名人数:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="remainCount" path="remainCount" cssClass="form-control" placeholder="剩余可报名人数" type="number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-md-12 col-sm-12 text-center">
                                <button type="button" class="btn btn-primary" id="confirm">确认</button>
                                <button type="button" class="btn btn-default" id="return">返回列表</button>
                            </div>
                        </div>
                    </div>
                    
				</div>
            </section>
        </div>
    </div>
</form:form>
</body>
<script src="/course-choice-management-system/adminStatic/js/jquery-1.10.2.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/bootstrap/js/bootstrap.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var  beginTime = $('#beginTime').val();
	var  endTime = $('#endTime').val();
	if(beginTime != ""){
		beginTime = new Date(beginTime).getTime();
		beginTime = new Date(beginTime);
	    var year = beginTime.getFullYear();
	    var month = beginTime.getMonth()+1;
	    month = month < 10 ? '0' + month : month; 
	    var date = beginTime.getDate();
	    date = date < 10 ? ('0' + date) : date; 
	    beginTime = [year,month,date].join('-');
	    $('#beginTime').val(beginTime);
		//beginTime = new Date(beginTime).format("yyyy-MM-dd");
	}
	if(endTime != ""){
		endTime = new Date(endTime).getTime();
		endTime = new Date(endTime);
	    var year = endTime.getFullYear();
	    var month = endTime.getMonth()+1;
	    month = month < 10 ? '0' + month : month; 
	    var date = endTime.getDate();
	    date = date < 10 ? ('0' + date) : date; 
	    endTime = [year,month,date].join('-');
	    $('#endTime').val(endTime);
		//endTime = new Date(endTime).format("yyyy-MM-dd");
	}
});
$("#confirm").click(function() {
	var  id = $('#idy').val();
	var couNumber = $.trim($("#couNumber").val());
	var  name = $('#name').val();
	var  classroom = $('#classroom').val();
	var teacher = $.trim($("#teacher").val());
	var  times = $('#times').val();
	var  beginTime = $('#beginTime').val();
	var  endTime = $('#endTime').val();
	var planCount = parseInt($("#planCount").val());
	var  actualCount = parseInt($('#actualCount').val());
	var  remainCount = parseInt($('#remainCount').val());
	var count = actualCount+remainCount;
	var begin = new Date(beginTime);
	var end = new Date(endTime);
	
	if (couNumber == "") {
		alert("请输入课程号");
		return;
	} else if (name == "") {
		alert("请输入课程名");
		return;
	} else if (classroom == "") {
		alert("请输入上课教室");
		return;
	}else if (teacher == "") {
		alert("请输入任课老师");
		return;
	} else if (times == "") {
		alert("请输入上课周次");
		return;
	} else if (beginTime == "") {
		alert("请输入开始时间");
		return;
	}else if (endTime == "") {
		alert("请输入结束时间");
		return;
	} else if (isNaN(planCount)) {
		alert("请输入开设人数");
		return;
	}else if (isNaN(actualCount)) {
		alert("请输入报名人数");
		return;
	} else if (isNaN(remainCount)) {
		alert("请输入剩余人数");
		return;
	}else if (couNumber.length > 20) {
		alert("课程号长度应小于20");
		return;
	} else if (name.length > 30) {
		alert("课程名长度应小于30");
		return;
	} else if (classroom.length > 30) {
		alert("上课教室长度应小于30");
		return;
	}else if (teacher.length > 20) {
		alert("任课老师长度应小于20");
		return;
	} else if (times.length > 20) {
		alert("上课周次长度应小于20");
		return;
	} else if (planCount<0 || planCount>9999) {
		alert("开设人数小于0或大于9999");
		return;
	}else if (actualCount<0 || actualCount>9999) {
		alert("报名人数小于0或大于9999");
		return;
	} else if (remainCount<0 || remainCount>9999) {
		alert("剩余人数小于0或大于9999");
		return;
	}else if (planCount != count) {
		alert("开设人数不等于报名人数加剩余人数");
		return;
	}else if (begin > end) {
		alert("开始时间不可大于结束时间");
		return;
	}
	var course = {
		id : id,
		couNumber : couNumber,
		name : name,
		classroom : classroom,
		teacher : teacher,
		times : times,
		beginTime : beginTime,
		endTime : endTime,
		planCount : planCount,
		actualCount : actualCount,
		remainCount : remainCount
	};
	var courseMessage = JSON.stringify(course);
	
	$.post("/course-choice-management-system/courseController/manage", {
		courseMessage : courseMessage
	}, function(data) {
		if (data.result == 1) {
			alert("新增成功！");
		}else if (data.result == 2){
			alert("修改成功！");
		}else if (data.result == 3){
			alert("存在相同数据！");
			return;
		}else{
			alert("操作失败！");
		}
		window.location.href = "/course-choice-management-system/courseController/list";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/courseController/list";
})
</script>
</html>