<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>密码修改界面</title>
</head>
<body>
<form:form  id="pageForm" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					修改密码
				</h3>
				<input id="idy" value="${student.id}" hidden="true"/>
				<input id="stuNumber" value="${student.stuNumber}" hidden="true"/>
				<input id="name" value="${student.name}" hidden="true"/>
				<input id="password" value="${student.password}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">原密码:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<input Class="form-control" placeholder="原密码" id="oldPassword" type="password"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">新密码:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<input id="newPassword" Class="form-control" placeholder="新密码" type="password"/>
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
                   						<input id="confirmPassword" Class="form-control" placeholder="确认密码" type="password"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-md-12 col-sm-12 text-center">
                                <button type="button" class="btn btn-primary" id="confirm">确认</button>
                                <button type="button" class="btn btn-default" id="return">返回首页</button>
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
	var oldPassword = $.trim($("#oldPassword").val());
	var  newPassword = $('#newPassword').val();
	var  confirmPassword = $('#confirmPassword').val();
	var  id = $('#idy').val();
	var  stuNumber = $('#stuNumber').val();
	var  name = $('#name').val();
	var  password = $('#password').val();

	if (oldPassword == "") {
		alert("请输入原密码");
		return;
	} else if (newPassword == "") {
		alert("请输入新密码");
		return;
	} else if (confirmPassword == "") {
		alert("请再次输入密码");
		return;
	}else if (oldPassword != password) {
		alert("原密码错误");
		return;
	}else if (newPassword.length >16) {
		alert("新密码大于16位");
		return;
	}else if(newPassword != confirmPassword){
		alert("两次密码不一致！");
		return;
	}else if(newPassword == password){
		alert("新密码不可与原密码一致！");
		return;
	}
	var student = {
		id : id,
		stuNumber : stuNumber,
		name : name,
		password : newPassword
	};
	var studentMessage = JSON.stringify(student);
	
	$.post("/course-choice-management-system/studentInfoController/changePassword", {
		studentMessage : studentMessage
	}, function(data) {
		if (data.result == 1) {
			alert("修改成功！请重新登录！");
		}else if (data.result == 2){
			alert("新密码不可与原密码一致！");
			return;
		}else{
			alert("操作失败！");
			return;
		}
		window.location.href = "/course-choice-management-system/loginController/loginout";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/studentInfoController/home";
})
</script>
</html>