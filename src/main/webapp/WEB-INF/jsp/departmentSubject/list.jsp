<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>系别/专业管理界面</title>
</head>
<body>
<form:form modelAttribute="departmentSubject" id="pageForm" action="../departmentSubjectController/list" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					系别/专业查询
					<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
				</h3>

				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">系别/专业编号:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="dsnumber" cssClass="form-control" placeholder="系别/专业编号"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">系别名称:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="department" cssClass="form-control" placeholder="系别名称"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">专业名称:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="subject" cssClass="form-control" placeholder="专业名称"/>
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
							<a href="manageView?id=" class="btn btn-primary" title="新增系别/专业">新增系别/专业</a>
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
                                    <th nowrap>系别/专业编号</th>
                                    <th nowrap>系别名称</th>
                                    <th nowrap>专业名称</th>
                                    <th nowrap>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${departmentSubjectList}" var="departmentSubject">
                                    <tr>
                                        <td nowrap>
                                        	${departmentSubject.dsnumber}
                                        </td>
                                        <td nowrap>
                                        	${departmentSubject.department}
                                        </td>
                                        <td nowrap>
                                        	${departmentSubject.subject}
                                        </td>
                                        <td nowrap>
                                        		<a class="btn btn-default" href="manageView?id=${departmentSubject.id}">修改</a>
                                				<button type="button" class="btn btn-default" id="delete" onclick="deleted(${departmentSubject.id})">删除</button>
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
		$.post("/course-choice-management-system/departmentSubjectController/delete", {
			id : id
		}, function(data) {
			if (data.result) {
				alert("删除成功！");
			}else{
				alert("删除失败！");
			}
			window.location.href = "/course-choice-management-system/departmentSubjectController/list";
		},"json");
	}
	
</script>
</html>