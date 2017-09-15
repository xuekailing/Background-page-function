 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 var util = require('../common/util.js');
 var cs_id = util.getSearch("cs_id");
 $.get("/v6/course/basic", { cs_id: cs_id }, function(data) {
     if (data.code == 200) {
         data.result.editIndex = 1;
         $("#course-edit1").append(template("course-edit1-tpl", data.result))
     }
 })
 $(document).on("change", "#category-top-select", function() { //因为整个数据回显是动态构建的，所以通过委托的方式监听父级学科select的change事件 当被选元素发生变化时触发函数内的内容
     var topCgid = $(this).val();
     $.get("/v6/category/child", { cg_id: topCgid }, function(data) {
         var html = ""
         var childList = data.result;
         if (data.code == 200) {
             for (var i = 0; i < childList.length; i++) {
                 html += '<option value="' + childList[i].cg_id + '">' + childList[i].cg_name + "</option>"
             }
         }
         $("#category-child-select").html(html);
     })
 })
 $("#course-edit1-form").ajaxForm({
     delegation: true,
     success: function(data) {
         if (data.code == 200) {
             alert("保存成功");
             location.href = "/dist/html/course/course_edit_step2.html?cs_id=" + cs_id
         }
     }
 })