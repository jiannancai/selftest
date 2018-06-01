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
<title>课程信息管理界面</title>
</head>
<body>
<form:form modelAttribute="course" id="pageForm" action="../courseController/list" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					课程信息查询
					<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
				</h3>

				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">课程号:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="couNumber" cssClass="form-control" placeholder="课程号"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">课程名称:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="name" cssClass="form-control" placeholder="课程名称"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-md-12 col-sm-12 text-center">
                                <button type="button" class="btn btn-primary btn-lg" id="query">查询</button>
                                <button type="button" class="btn btn-default btn-lg" id="reset">重置</button>
                            </div>
                        </div>
                    </div>
                    
				</div>
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
							<a href="manageView?id=" class="btn btn-primary" title="新增课程信息">新增课程信息</a>
                            <button type="button" class="btn btn-default" id="reflashStatus" onclick="reflashStatus(${startChoose.id})">
                            	<c:choose>
                            		<c:when test="${startChoose.status == '0'}">开始选课</c:when>
                            		<c:otherwise>结束选课</c:otherwise>
                            	</c:choose>
                            </button>
							<a href="/course-choice-management-system/teacherController/pageSelection" class="btn btn-default" title="返回选择页面">返回选择页面</a>
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
                                <c:forEach items="${courselist}" var="course">
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
                                        		<a class="btn btn-default" href="manageView?id=${course.id}">修改</a>
                                				<button type="button" class="btn btn-default" id="delete" onclick="deleted(${course.id})">删除</button>
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
	
	function deleted(id){
		$.post("/course-choice-management-system/courseController/delete", {
			id : id
		}, function(data) {
			if (data.result) {
				alert("删除成功！");
			}else{
				alert("删除失败！");
			}
			window.location.href = "/course-choice-management-system/courseController/list";
		},"json");
	}
	
	function reflashStatus(id){
		$.post("/course-choice-management-system/courseController/reflashChoiceStatus", {
			id : id
		}, function(data) {
			if (data.result == 1) {
				alert("已结束选课！");
			}else if (data.result == 2) {
				alert("已开始选课！");
			}else{
				alert("操作失败！");
			}
			window.location.href = "/course-choice-management-system/courseController/list";
		},"json");
	}
	
</script>
</html>