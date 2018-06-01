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
<form:form modelAttribute="teacher" id="pageForm" action="../teacherController/manage" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						<c:choose>
							<c:when test="${teacher.id == null}">
								新增管理员信息
							 </c:when>
							<c:otherwise>
								修改管理员信息
    						</c:otherwise>
						</c:choose>
				</h3>
				<input id="idy" value="${teacher.id}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">管理员账号:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="account" cssClass="form-control" placeholder="管理员账号" id="account"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">管理员密码:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="password1" path="password" cssClass="form-control" placeholder="管理员密码" type="password"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">确认密码:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<input id="password2" Class="form-control" placeholder="确认密码" type="password"/>
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
	var account = $.trim($("#account").val());
	var  password1 = $('#password1').val();
	var  password2 = $('#password2').val();
	var  id = $('#idy').val();

	if (account == "") {
		alert("请输入账号");
		return;
	} else if (password1 == "") {
		alert("请输入密码");
		return;
	} else if (password2 == "") {
		alert("请再次输入密码");
		return;
	}else if(account.length >20){
		alert("账号大于20位");
		return;
	}else if(password1.length >16){
		alert("密码大于16位");
		return;
	}else if(password1 != password2){
		alert("两次密码不一致！");
		return;
	}
	var teacher = {
		id : id,
		account : account,
		password : password1
	};
	var teacherMessage = JSON.stringify(teacher);
	
	$.post("/course-choice-management-system/teacherController/manage", {
		teacherMessage : teacherMessage
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
		window.location.href = "/course-choice-management-system/teacherController/list";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/teacherController/list";
})
</script>
</html>