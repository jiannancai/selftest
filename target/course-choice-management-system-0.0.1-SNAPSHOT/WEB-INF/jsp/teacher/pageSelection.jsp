<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员界面</title>
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />
</head>
<body>
	<section class="panel">
		<h2 style="text-align:center;"> 
			请选择需要管理的页面 
			<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
		</h2>
		<div class="panel-body" id="condition">
			<div class="row">
				<div class="form-horizontal">
					<div class="col-md-12 col-sm-12 text-center">
						<button type="button" class="btn btn-primary btn-lg" id="teacher">管理员信息管理</button>
						<button type="button" class="btn btn-success btn-lg" id="student">学生信息管理</button>
						<button type="button" class="btn btn-info btn-lg" id="course">课程信息管理</button>
						<button type="button" class="btn btn-warning btn-lg" id="departmentSubject">系别/专业管理</button>
						<button type="button" class="btn btn-danger btn-lg" id="announcement">主页公告管理</button>
						<button type="button" class="btn btn-default btn-lg" id="choiceResult">学生选课结果管理</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
<script src="/course-choice-management-system/adminStatic/js/jquery-1.10.2.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
	$("#teacher").click(function() {
		window.location.href = "/course-choice-management-system/teacherController/list";
	});
	$("#departmentSubject").click(function() {
		window.location.href = "/course-choice-management-system/departmentSubjectController/list";
	});
	$("#choiceResult").click(function() {
		window.location.href = "/course-choice-management-system/studentCourseController/list";
	});
	$("#announcement").click(function() {
		window.location.href = "/course-choice-management-system/announcementController/list";
	});
	$("#course").click(function() {
		window.location.href = "/course-choice-management-system/courseController/list";
	});
	$("#student").click(function() {
		window.location.href = "/course-choice-management-system/studentController/list";
	});
</script>
</html>