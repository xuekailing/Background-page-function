 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 $.get("/v6/category/top", function(data) { //请求后台参数，并将结果返回到模板处
         if (data.code == 200) {
             $("#category-top-select").html(template("select-tpl", data.result));
         }
     })
     //提交表单时触发，执行函数内的事件
 $("#category-add-form").ajaxForm(function(data) {
     //当页面加载完成后开始执行
     if (data.code == 200) {
         alert("创建成功")
     }
 })