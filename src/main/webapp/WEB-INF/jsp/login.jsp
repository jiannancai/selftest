<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
</head>
<body>
	<form id="pageForm" method="post" autocomplete="off">
		<div class="panel-body" id="condition">
			<div class="row">
				<div class="form-horizontal">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<div class="form-group ">
							<label class="col-lg-4 col-sm-4 control-label">账号:</label>
							<div class="col-lg-4 col-sm-4">
								<input path="account" Class="form-control" id="account"
									placeholder="账号" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-horizontal">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<div class="form-group ">
							<label class="col-lg-4 col-sm-3 control-label">密码:</label>
							<div class="col-lg-4 col-sm-4">
								<input path="password" Class="form-control" id="password"
									type="password" placeholder="密码" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-horizontal">
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
						<div class="form-group ">
							<div class="col-lg-12 col-sm-12">
								<input type="radio" name="identity" value="0" checked="checked">学生</input>
								<input type="radio" name="identity" value="1">管理员/教师</input>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-horizontal">
					<div class="col-md-12 col-sm-12 text-center">
						<button type="button" class="btn btn-primary btn-lg" id="login">登录</button>
						<button type="button" class="btn btn-default btn-lg" id="reset">重置</button>
					</div>
				</div>
			</div>

		</div>
	</form>
</body>
<script src="/course-choice-management-system/adminStatic/js/jquery-1.10.2.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
	$("#login").click(function() {
		var account = $.trim($("#account").val());
		var password = $.trim($("#password").val());
		var identity = $('input[name="identity"]:checked').val();
		if (account == "") {
			alert("请输入用户名");
			return false;
		} else if (password == "") {
			alert("请输入密码");
			return false;
		}
		//ajax去服务器端校验
		var loginer = {
			account : account,
			password : password,
			identity : identity
		};
		var loginMessage = JSON.stringify(loginer);

			$.post("/course-choice-management-system/loginController/login", {
				loginMessage : loginMessage
			}, function(data) {
				if (data.result == 0) {
					window.location.href = "/course-choice-management-system/teacherController/pageSelection";
				}
				else if (data.result == 1) {
					alert("登录失败，请检查账号或密码或您不为管理员/教师!");
				}
				else if (data.result == 2) {
					window.location.href = "/course-choice-management-system/studentInfoController/home";
				}
				else if (data.result == 3) {
					alert("登录失败，请检查账号或密码或您不为学生!");
				} else {
					alert("登录失败，请重试!");
				}
			},"json");
	});
	$("#reset").click(function() {
		$("#condition").find("input").val('');
		$("#condition").find("select").val("-1");
	})
</script>
</html>