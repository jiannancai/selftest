<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>公告管理界面</title>
</head>
<body>
<form:form modelAttribute="announcement" id="pageForm" action="../announcementController/manage" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						<c:choose>
							<c:when test="${announcement.id == null}">
								新增公告
							 </c:when>
							<c:otherwise>
								修改公告
    						</c:otherwise>
						</c:choose>
				</h3>
				<input id="idy" value="${announcement.id}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">公告标题:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="title" cssClass="form-control" placeholder="公告标题" id="title"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">公告内容:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:textarea id="content" cssStyle="width:610px;height:500px;resize:none;border:1px splid;" wrap="hard" path="content" cssClass="form-control" placeholder="公告内容"/>
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
<script type="text/javascript">
$("#confirm").click(function() {
	var title = $.trim($("#title").val());
	var  content = $('#content').val();
	var  id = $('#idy').val();

	if (title == "") {
		alert("请输入标题");
		return;
	} else if (content == "") {
		alert("请输入内容");
		return;
	} 
	var announcement = {
		id : id,
		title : title,
		content : content
	};
	var announcementMessage = JSON.stringify(announcement);
	
	$.post("/course-choice-management-system/announcementController/manage", {
		announcementMessage : announcementMessage
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
		window.location.href = "/course-choice-management-system/announcementController/list";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/announcementController/list";
})
</script>
</html>