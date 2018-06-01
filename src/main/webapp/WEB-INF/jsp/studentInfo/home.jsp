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
<title>首页</title>
</head>
<body>
<form:form id="pageForm" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					公告列表
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
							<a href="personalInfo?id=${student.id}" class="btn btn-primary" title="个人信息">个人信息</a>
							<a href="selfChoiceView?stuNumber=${student.stuNumber}" class="btn btn-primary" title="选课">选课</a>
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
                                        		<a class="btn btn-primary" href="getAnnouncementView?id=${announcement.id}">详情</a>
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
</script>
</html>