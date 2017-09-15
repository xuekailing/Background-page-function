require("../common/header");
require("../common/aside");
require('../common/a.js');
require('../common/b.js');
$("#repass-form").on("submit", function() {
    if ($("#input-pass").val() !== $("#input-pass-repeat").val()) {
        alert("俩次密码不一致");
        return false;
    }
    $("#repass-form").ajaxSubmit({
        success: function(data) {
            alert("修改成功")
        }
    })
    return false;
})