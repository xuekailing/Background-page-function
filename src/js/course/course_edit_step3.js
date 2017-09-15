 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 var util = require('../common/util.js');
 var cs_id = util.getSearch("cs_id");
 var lessons;
 $.get("/v6/course/lesson", { cs_id: cs_id }, function(data) {
     if (data.code == 200) {
         lessons = data.result.lessons;
         data.result.editIndex = 3;
         $("#course-edit3").append(template("course-edit3-tpl", data.result))
     }
 })
 $(document).on("click", ".btn-lesson-edit", function() {
     var data = {
         ct_id: $(this).attr('data-id') //获取到页面中点击的元素的id值，然后用对象的方式把它的键值对存储起来
     }
     $.get("/v6/course/chapter/edit", data, function(data) {
         if (data.code = 200) {
             $("#chapterModal").html(template("course-fade-tpl", data.result))
         }
     })
 })
 $(document).on("click", "#btn-lesson-add", function() {
     $('#chapterModal').html(template('course-fade-tpl', { cs_id: cs_id }));
 })
 $("#lesson-form").ajaxForm({
     delegation: true,
     success: function(data) {
         if (data.result) {
             alert("添加成功")
             upLessons(data.result);
             $('#lesson-form').get(0).reset();
         } else {
             alert("修改成功")
             upLessons();
         }
     }
 })

 function upLessons(ct_id) {
     var formData = getFormData();
     var lessonData = {
         ct_id: formData.ct_id || ct_id,
         ct_name: formData.ct_name,
         ct_video_duration: formData.ct_minutes + ":" + formData.ct_seconds
     };
     if (ct_id) {
         lessons.push(lessonData);
     } else {
         var index = getLessonIndex(formData.ct_id);
         lessons.splice(index, 1, lessonData);
     }
     //  将添加后的数据进行渲染,这里返回的是添加后的数据
     $("#lesson-list").html(template("lesson-list-tpl", lessons))
 }

 function getFormData() {
     var formArrData = $("#lesson-form").serializeArray(); //获取到表单中的name和val的对象
     var formData = {};
     for (var i = 0; i < formArrData.length; i++) {
         formData[formArrData[i].name] = formArrData[i].value;
     }
     return formData;
 }
 //下标指的是后台传的数据所传递的zt_id的值
 function getLessonIndex(ct_id) {
     for (var i = 0, len = lessons.length; i < len; i++) {
         if (lessons[i].ct_id == ct_id) {
             return i;
         }
     }
 }