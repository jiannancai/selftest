/**
 * 
 */
// 点击重置按钮操作
$("#Reset").click(function() {
	$("#queryCond")[0].reset();
});

// 点击添加按钮操作
$("#Add").click(function() {
	addOperate();
});

// 点击修改按钮操作
$("#Update").click(function() {
	var chkIds = getSelectIds();
	var chkIdsNum = chkIds.length;
	if (chkIdsNum == 0) {
		openModal('未选中数据');
		return;
	}
	if (chkIdsNum > 1) {
		openModal('只能选中一条数据进行编辑');
		return;
	}
	openDetail(chkIds[0]);
});

// 获取选中chekbox操作
function getSelectIds() {
	var chk_value = [];
	$("input[type='checkbox'][name='checkId']:checked").each(function() {
		chk_value.push($(this).val());
	});
	return chk_value;
}

// 点击保存按钮操作
$('#saveBtn').click(function() {
    $('#myAddForm').bootstrapValidator('validate');
});

// 点击撤销操作按钮操作
$('#resetBtn').click(function() {
    $('#myAddForm').data('bootstrapValidator').resetForm(true);
});
