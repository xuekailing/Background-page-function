 require('../common/header.js');
 require('../common/aside.js');
 require('../common/a.js');
 require('../common/b.js');
 $.get("/v6/course", function(data) {
     if (data.code == 200) {
         $("#course-list").append(template("courses-list-tpl", data.result));
     }
 })