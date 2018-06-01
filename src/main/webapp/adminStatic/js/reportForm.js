/*
create by CuiZhenli for reportForm 20160229
 */
function save(str){
    if ($("#r01C01i").val() == null) {
        alert("您没有进行任何修改操作，不需要保存");
        return;
    }
    $.getJSON(
        str+"/trRptsubsidiaryOneManage/trRptsubsidiaryOne/saveReport",
        {
            r01C01: $("#r01C01i").val(),
            r01C02: $("#r01C02i").val(),
            r01C03: $("#r01C03i").val(),
            r01C04: $("#r01C04i").val(),
            r01C07: $("#r01C07i").val(),
            r01C08: $("#r01C08i").val(),
            r02C01: $("#r02C01i").val(),
            r03C01: $("#r03C01i").val(),
            r04C01: $("#r04C01i").val(),
            r05C07: $("#r05C07i").val(),
            r05C08: $("#r05C08i").val(),
            r08C01: $("#r08C01i").val(),
            r08C04: $("#r08C04i").val(),
            r09bC01: $("#r09bC01i").val(),
            r09aC01: $("#r09aC01i").val(),
            r09aC04: $("#r09aC04i").val(),
            periodindex: $("#periodindex").val(),
            reportId: $("#reportId").val(),
            reportcode: $("#reportCode").val(),
            r09bC02: $("#r09bC02i").val(),
            r09bC03: $("#r09bC03i").val(),
            r09bC04: $("#r09bC04i").val(),
            r11C04: $("#r11C04i").val(),
            r10C01: $("#r10C01i").val(),
            r10C04: $("#r10C04i").val(),
            r11C03: $("#r11C03i").val(),
            r11C02: $("#r11C02i").val(),
            r11C01: $("#r11C01i").val(),
            r12C01: $("#r12C01i").val(),
            r12C04: $("#r12C04i").val(),
            r13aC01: $("#r13aC01i").val(),
            r13aC04: $("#r13aC04i").val(),
            r13bC01: $("#r13bC01i").val(),
            r13bC04: $("#r13bC04i").val(),
            r13cC01: $("#r13cC01i").val(),
            r13cC04: $("#r13cC04i").val(),
            r19C03: $("#r19C03i").val(),
        },
        function (data) {
            if (data.success == true) {
                window.localtion.reload();
                alert("更新成功");
            } else if(data.info=="reject"){
                alert("该数据已审核通过或数据有缺失，不允许修改")
            } else {
                alert("出现错误");
            }

        }
    );
}
function editBtnClick() {
    $("#r01C01").hide();
    $("#r01C01ii").attr("id","r01C01i");
    $("#r01C01i").show();
    $("#r01C02").hide();
    $("#r01C02i").show();
    $("#r01C03").hide();
    $("#r01C03i").show();
    $("#r01C04").hide();
    $("#r01C04i").show();
    $("#r01C07").hide();
    $("#r01C07i").show();
    $("#r01C08").hide();
    $("#r01C08i").show();
    $("#r02C01").hide();
    $("#r02C01i").show();
    $("#r03C01").hide();
    $("#r03C01i").show();
    $("#r04C01").hide();
    $("#r04C01i").show();
    $("#r05C07").hide();
    $("#r05C07i").show();
    $("#r05C08").hide();
    $("#r05C08i").show();
    $("#r08C01").hide();
    $("#r08C01i").show();
    $("#r08C04").hide();
    $("#r08C04i").show();
    $("#r09aC01").hide();
    $("#r09aC01i").show();
    $("#r09aC04").hide();
    $("#r09aC04i").show();
    $("#r09bC01").hide();
    $("#r09bC01i").show();
    $("#r09bC02").hide();
    $("#r09bC02i").show();
    $("#r09bC03").hide();
    $("#r09bC03i").show();
    $("#r09bC04").hide();
    $("#r09bC04i").show();
    $("#r10C01").hide();
    $("#r10C01i").show();
    $("#r10C04").hide();
    $("#r10C04i").show();
    $("#r11C01").hide();
    $("#r11C01i").show();
    $("#r11C02").hide();
    $("#r11C02i").show();
    $("#r11C03").hide();
    $("#r11C03i").show();
    $("#r11C04").hide();
    $("#r11C04i").show();
    $("#r12C01").hide();
    $("#r12C01i").show();
    $("#r12C04").hide();
    $("#r12C04i").show();
    $("#r13aC01").hide();
    $("#r13aC01i").show();
    $("#r13aC04").hide();
    $("#r13aC04i").show();
    $("#r13bC01").hide();
    $("#r13bC01i").show();
    $("#r13bC04").hide();
    $("#r13bC04i").show();
    $("#r13cC01").hide();
    $("#r13cC01i").show();
    $("#r13cC04").hide();
    $("#r13cC04i").show();
    $("#r19C03").hide();
    $("#r19C03i").show();
}