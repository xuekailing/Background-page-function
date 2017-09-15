 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 var util = require('../common/util.js');
 var cs_id = util.getSearch("cs_id");
 $.get("/v6/course/picture", { cs_id: cs_id }, function(data) {
     if (data.code == 200) {
         data.result.editIndex = 2;
         $("#course-edit2").append(template("course-edit2-tpl", data.result))
         initPlugin();
     }
 })

 function initPlugin() {
     $('#uploadify').uploadify({
         swf: '/lib/jquery-uploadify/uploadify.swf',
         uploader: '/v6/uploader/cover',
         fileTypeExts: '*.gif; *.jpg; *.png',
         fileObjName: "cs_cover_original",
         formData: {
             cs_id: cs_id
         },
         buttonText: "上传",
         buttonClass: 'btn btn-success btn-sm',
         onUploadSuccess: function(file, dataStr) {
             var data = JSON.parse(dataStr);
             $(".preview img").attr("src", data.result.path)
         }
     });
 }
 $(document).on('click', '#btn-clip', function() {
     $('.preview img').Jcrop({
         aspectRatio: 2
     }, function() {
         window.J = this;
     });
 });
 $(document).on('click', '#btn-slip-save', function() {
     var data = J.getSelection();
     data.cs_id = cs_id;
     $.post('/v6/course/update/picture', data, function(data) {
         alert('裁剪成功');
         location.href = '/dist/html/course/course_edit_step3.html?cs_id=' + cs_id;
     });
 });