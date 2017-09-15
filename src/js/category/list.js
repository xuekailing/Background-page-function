 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 $.get("/v6/category", function(data) {
     $(".table-bordered").append(template("category-list-tpl", data.result)); //append尾部添加  template内的id名不需要加#号  data.result返回result的结果
 })