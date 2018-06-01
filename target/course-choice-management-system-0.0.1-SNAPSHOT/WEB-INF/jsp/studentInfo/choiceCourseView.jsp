<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>未选课程界面</title>
</head>
<body>
<form:form id="pageForm" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					课程列表
					<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
				</h3>
            </section>
        </div>
    </div>
</form:form>
    
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<section class="panel">
				<div class="panel-body">
					<div class="row">
						<div class="col-md-12 text-left">
							<a href="/course-choice-management-system/studentInfoController/selfChoiceView?stuNumber=${stuNumber}" class="btn btn-default" title="返回已选列表">返回已选列表</a>
						</div>
					</div>
				</div>
			</section>
		</div>
    </div>
    
    <div class="row">
		<div class="col-lg-12">
			<section class="panel">
				<div class="panel-body">
					<div class="adv-table" style="overflow:scroll">
						<table class="table table-bordered table-striped">
							<thead>
                                <tr>
                                    <th nowrap>课程号</th>
                                    <th nowrap>课程名称</th>
                                    <th nowrap>上课教室</th>
                                    <th nowrap>任课老师</th>
                                    <th nowrap>上课周次</th>
                                    <th nowrap>开始时间</th>
                                    <th nowrap>结束时间</th>
                                    <th nowrap>开设人数</th>
                                    <th nowrap>报名人数</th>
                                    <th nowrap>剩余人数</th>
                                    <th nowrap>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${courseUnchosedList}" var="course">
                                     <tr>
                                        <td nowrap>
                                        	${course.couNumber}
                                        </td>
                                        <td nowrap>
                                        	${course.name}
                                        </td>
                                        <td nowrap>
                                        	${course.classroom}
                                        </td>
                                        <td nowrap>
                                        	${course.teacher}
                                        </td>
                                        <td nowrap>
                                        	${course.times}
                                        </td>
                                        <td nowrap>
                                        	<fmt:formatDate value="${course.beginTime}" pattern="yyyy-MM-dd"/>
                                        </td>
                                        <td nowrap>
                                        	<fmt:formatDate value="${course.endTime}" pattern="yyyy-MM-dd"/>
                                        </td>
                                        <td nowrap>
                                        	${course.planCount}
                                        </td>
                                        <td nowrap>
                                        	${course.actualCount}
                                        </td>
                                        <td nowrap>
                                        	${course.remainCount}
                                        </td>
                                        <td nowrap>
                                        		<c:choose>
                                        			<c:when test="${course.remainCount <= 0}">
                                        				本课程学生数量已满
                                        			</c:when>
                                        			<c:otherwise>
                                						<button type="button" class="btn btn-default" id="delete" onclick="confirmChoice(${stuNumber},${course.couNumber})">选择</button>
                                        			</c:otherwise>
                                        		</c:choose>
                                        </td>
                                    </tr>
                                </c:forEach>
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	</div>
</body>
<script src="/course-choice-management-system/adminStatic/js/jquery-1.10.2.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
	$("#query").click(function() {
		$("#pageForm").submit();
	});
	$("#reset").click(function() {
		$("#condition").find("input").val('');
		$("#condition").find("select").val("-1");
	})
	
	function confirmChoice(stuNumber,couNumber){
		var studentCourse = {
				stuNumber : stuNumber,
				couNumber : couNumber
			};
		var studentCourseMessage = JSON.stringify(studentCourse);
		$.post("/course-choice-management-system/studentInfoController/confirmChoice", {
			studentCourseMessage : studentCourseMessage
		}, function(data) {
			if (data.result == 1) {
				alert("选课成功！");
			}else if (data.result == 2) {
				alert("你已经选择这门课！");
			}else{
				alert("操作失败！");
			}
			window.location.href = "/course-choice-management-system/studentInfoController/choiceCourseView?stuNumber="+stuNumber;
		},"json");
	}
	
</script>
</html>