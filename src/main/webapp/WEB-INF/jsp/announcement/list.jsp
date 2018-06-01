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
<title>公告管理界面</title>
</head>
<body>
<form:form modelAttribute="announcement" id="pageForm" action="../announcementController/list" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					公告查询
					<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
				</h3>

				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group ">
                                    <label class="col-lg-4 col-sm-4 control-label">公告标题:</label>
                                    <div class="col-lg-4 col-sm-4">
                   						<form:input path="title" cssClass="form-control" placeholder="公告标题"/>
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
							<a href="manageView?id=" class="btn btn-primary" title="新增公告">新增公告</a>
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
                                    <th nowrap>公告标题</th>
                                    <th nowrap>发布时间</th>
                                    <th nowrap>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${announcementList}" var="announcement">
                                    <tr>
                                        <td nowrap>
                                        	${announcement.title}
                                        </td>
                                        <td nowrap>
                                        	<fmt:formatDate value="${announcement.modifyTime}" pattern="yyyy-MM-dd"/>
                                        </td>
                                        <td nowrap>
                                        		<a class="btn btn-primary" href="getView?id=${announcement.id}">详情</a>
                                        		<a class="btn btn-primary" href="manageView?id=${announcement.id}">修改</a>
                                				<button type="button" class="btn btn-default" id="delete" onclick="deleted(${announcement.id})">删除</button>
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
		$.post("/course-choice-management-system/announcementController/delete", {
			id : id
		}, function(data) {
			if (data.result) {
				alert("删除成功！");
			}else{
				alert("删除失败！");
			}
			window.location.href = "/course-choice-management-system/announcementController/list";
		},"json");
	}
	
</script>
</html>