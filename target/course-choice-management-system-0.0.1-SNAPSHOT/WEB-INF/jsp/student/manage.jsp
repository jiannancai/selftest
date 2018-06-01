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
<form:form modelAttribute="student" id="pageForm" action="../studentController/manage" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
						<c:choose>
							<c:when test="${student.id == null}">
								新增管理员信息
							 </c:when>
							<c:otherwise>
								修改管理员信息
    						</c:otherwise>
						</c:choose>
				</h3>
				<input id="idy" value="${student.id}" hidden="true"/>
				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">学号:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="stuNumber" cssClass="form-control" placeholder="学号" id="stuNumber"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">姓名:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="stuNumber" id="name" cssClass="form-control" placeholder="姓名"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">班级:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="clazz" id="clazz" cssClass="form-control" placeholder="班级"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">系别/专业编号:</label>
                                    <div class="col-lg-4 col-sm-4">
                                    	<form:select path="dsnumber" id="dsnumber" cssClass="form-control">
                                    		<c:forEach items="${departmentSubjectList}" var="departmentSubject">
                                    			<form:option value="${departmentSubject.dsnumber}">${departmentSubject.dsnumber}(${departmentSubject.department} --- ${departmentSubject.subject})</form:option>
                                    		</c:forEach>
                                    	</form:select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">密码:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input id="password" path="password" cssClass="form-control" placeholder="密码" type="password"/>
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
	var  stuNumber = $("#stuNumber").val();
	var  name = $('#name').val();
	var  clazz = $('#clazz').val();
	var  dsnumber = $('#dsnumber').val();
	var  password = $('#password').val();
	var  id = $('#idy').val();

	if (stuNumber == "") {
		alert("请输入学号");
		return;
	} else if (name == "") {
		alert("请输入姓名");
		return;
	} else if (clazz == "") {
		alert("请输入班别");
		return;
	}else if (dsnumber == "") {
		alert("请选择系别/专业编号");
		return;
	}else if (password == "") {
		alert("请输入密码");
		return;
	}else if(stuNumber.length >15){
		alert("学号大于15位");
		return;
	}else if(name.length >15){
		alert("姓名大于15位");
		return;
	}else if(clazz.length >15){
		alert("班级大于15位");
		return;
	}else if(password.length >16){
		alert("密码大于16位");
		return;
	}
	
	var student = {
		id : id,
		stuNumber : stuNumber,
		name : name,
		clazz : clazz,
		dsnumber : dsnumber,
		password : password
	};
	var studentMessage = JSON.stringify(student);
	
	$.post("/course-choice-management-system/studentController/manage", {
		studentMessage : studentMessage
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
		window.location.href = "/course-choice-management-system/studentController/list";
	},"json");
});

$("#return").click(function() {
	window.location.href = "/course-choice-management-system/studentController/list";
})
</script>
</html>