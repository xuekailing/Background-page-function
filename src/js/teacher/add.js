require("../common/header");
require("../common/aside");
require('../common/a.js');
require('../common/b.js');
$("#teacher-add-form").ajaxForm(function(data) {
    if (data.code == 200) {
        alert("添加成功")
    }
})