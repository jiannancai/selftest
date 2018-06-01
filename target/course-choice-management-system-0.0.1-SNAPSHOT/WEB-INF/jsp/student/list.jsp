<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap.min.css" />  
<link rel="stylesheet" type="text/css" href="/course-choice-management-system/adminStatic/bootstrap/css/bootstrap-theme.min.css" />
<title>学生信息管理界面</title>
</head>
<body>
<form:form modelAttribute="student" id="pageForm" action="../studentController/list" method="post" autocomplete="off">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <section class="panel">
                <h3 style="margin-left: 100px;">
					学生信息查询
					<input hidden="true" value="${message}" id="message"/>
					<span><a href="/course-choice-management-system/loginController/loginout" style="font-size:18px;">注销</a></span>
				</h3>

				<div class="panel-body" id="condition">
                    <div class="row">
                        <div class="form-horizontal">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">学号:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="stuNumber" cssClass="form-control" placeholder="学号"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">姓名:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="name" cssClass="form-control" placeholder="姓名"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">班级:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="clazz" cssClass="form-control" placeholder="班级"/>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4 col-sm-4">
                                    <label class="col-lg-4 col-sm-4 control-label">系别/专业编号:</label>
                                    <div class="col-lg-8 col-sm-8">
                   						<form:input path="dsnumber" cssClass="form-control" placeholder="系别/专业编号"/>
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
							<a href="manageView?id=" class="btn btn-primary" title="新增学生信息">新增学生信息</a>
							<!-- <a href="download" class="btn btn-primary">下载模板</a> -->
							<button class="btn btn-primary" onclick="download()">下载模板</button>
							<button class="btn btn-primary" data-toggle="modal" data-target="#uploadDialog">上传学生信息</button>
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
                                    <th nowrap>学号</th>
                                    <th nowrap>姓名</th>
                                    <th nowrap>班级</th>
                                    <th nowrap>系别/专业编号</th>
                                    <th nowrap>密码</th>
                                    <th nowrap>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <c:forEach items="${studentList}" var="student">
                                    <tr>
                                        <td nowrap>
                                        	${student.stuNumber}
                                        </td>
                                        <td nowrap>
                                        	${student.name}
                                        </td>
                                        <td nowrap>
                                        	${student.clazz}
                                        </td>
                                        <td nowrap>
                                        	${student.dsnumber}
                                        </td>
                                        <td nowrap>
                                        	${student.password}
                                        </td>
                                        <td nowrap>
                                        		<a class="btn btn-primary" href="manageView?id=${student.id}">修改</a>
                                				<button type="button" class="btn btn-default" id="delete" onclick="deleted(${student.id})">删除</button>
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
	
	<!-- 上传页面 -->
            <div class="modal fade" id="uploadDialog" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                <span class="pficon pficon-close"></span>
                            </button>
                            <h4 class="modal-title">上传</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" id="uploadForm" enctype="multipart/form-data" method="post" action="/course-choice-management-system/studentController/upload">
                                <div class="form-group">
                                    <label class="col-md-3 control-label">选取文件</label>
                                    <div class="col-md-6">
                                        <input data-my-Directive type="file" name="uploadfile" accept=".xls,.xlsx" id="uploadfile">
                                    </div>
                                    <div class="col-md-3"></div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" id="cancel"  data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" id="confirmUpload" onclick="startUpload()">确认</button>
                        </div>
                    </div>
                </div>
            </div>
</body>
<script src="/course-choice-management-system/adminStatic/js/jquery-1.10.2.min.js"></script>
<script  src="/course-choice-management-system/adminStatic/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		var message = $("#message").val();
		  if(message != null && message !=""){
			  alert(message);
		  }
	});
	$("#query").click(function() {
		$("#pageForm").submit();
	});
	$("#reset").click(function() {
		$("#condition").find("input").val('');
		$("#condition").find("select").val("-1");
	});
	function download(){
		window.location.href = "/course-choice-management-system/studentController/download";
	}

	function startUpload(){
		filename = $('#uploadfile').val();
		if(filename == null){
			alert("无法上传空文件！");
			return;
		}
		var suffix = filename.substr(filename.lastIndexOf("."));
		if(".xls" != suffix && ".xlsx" != suffix ){    
            alert("选择Excel格式的文件导入！");    
            return false;    
        }
		$("#uploadForm").submit();
		$("#uploadfile").val("");
        $('#uploadDialog').modal('hide');
	} 
	function deleted(id){
		$.post("/course-choice-management-system/studentController/delete", {
			id : id
		}, function(data) {
			if (data.result) {
				alert("删除成功！");
			}else{
				alert("删除失败！");
			}
			window.location.href = "/course-choice-management-system/studentController/list";
		},"json");
	}
	
</script>
</html>