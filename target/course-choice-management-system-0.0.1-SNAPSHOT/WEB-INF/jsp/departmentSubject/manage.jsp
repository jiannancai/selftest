<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>系别/专业管理界面</title>
</head>
<body>
<form:form modelAttribute="departmentSubject" id="pageForm" action="../departmentSubjectController/manage" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						<c:choose>
							<c:when test="${departmentSubject.id == null}">
								新增系别/专业信息
							 </c:when>
							<c:otherwise>
								修改系别/专业信息
    						</c:otherwise>
						</c:choose>
				</h3>
				<input id="idy" value="${departmentSubject.id}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">系别/专业编号:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="dsnumber" cssClass="form-control" placeholder="系别/专业编号" id="dsnumber"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">系别名称:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="department" path="department" cssClass="form-control" placeholder="系别名称"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">专业名称:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="subject" path="subject" cssClass="form-control" placeholder="专业名称"/>
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
	var dsnumber = $.trim($("#dsnumber").val());
	var department = $('#department').val();
	var subject = $('#subject').val();
	var id = $('#idy').val();

	if (dsnumber == "") {
		alert("请输入系别/专业编号");
		return;
	} else if (department == "") {
		alert("请输入系别名称");
		return;
	} else if (subject == "") {
		alert("请再次专业名称");
		return;
	}else if(dsnumber.length >20){
		alert("系别/专业编号大于20位");
		return;
	}else if(department.length >20){
		alert("系别名称大于16位");
		return;
	}else if(subject.length >20){
		alert("专业密码大于16位");
		return;
	}
	
	var departmentSubject = {
		id : id,
		dsnumber : dsnumber,
		department : department,
		subject : subject
	};
	var departmentSubjectMessage = JSON.stringify(departmentSubject);
	
	$.post("/course-choice-management-system/departmentSubjectController/manage", {
		departmentSubjectMessage : departmentSubjectMessage
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
		window.location.href = "/course-choice-management-system/departmentSubjectController/list";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/departmentSubjectController/list";
})
</script>
</html>