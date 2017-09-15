 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 $("#course-add-form").ajaxForm(function(data) {
     if (data.code == 200) {
         alert("创建成功")
         location.href = "/dist/html/course/course_edit_step1.html?cs_id=" + data.result.cs_id;
     }
 })