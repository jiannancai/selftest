<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>个人信息界面</title>
</head>
<body>
<form:form id="pageForm" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						个人信息详情
				</h3>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <label class="col-lg-5 col-sm-4 control-label">学号:</label>
                                <label class="col-lg-1 col-sm-1 control-label">${student.stuNumber}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <label class="col-lg-5 col-sm-4 control-label">姓名:</label>
                                <label class="col-lg-1 col-sm-1 control-label">${student.name}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <label class="col-lg-5 col-sm-4 control-label">班级:</label>
                                <label class="col-lg-1 col-sm-1 control-label">${student.clazz}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <label class="col-lg-5 col-sm-4 control-label">系别/专业编号:</label>
                                <label class="col-lg-1 col-sm-1 control-label">${student.dsnumber}</label>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-md-11 col-sm-11 text-center">
                                <a class="btn btn-primary" href="changePasswordView?id=${student.id}">修改密码</a>
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

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/studentInfoController/home";
})
</script>
</html>