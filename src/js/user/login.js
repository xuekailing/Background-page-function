require('../common/b.js');
require('../common/a.js');
var userinfo = JSON.parse(localStorage.getItem('userinfo')) || {};
var tc_avatar = userinfo.tc_avatar || '/public/img/default.png';
$('.avatar img').attr('src', tc_avatar);

$("#login-form").ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert("登陆成功");
            localStorage.setItem("userinfo", JSON.stringify(data.result));
            location.href = "/dist";
        } else {
            alert("登陆失败")
        }
    },
    error: function() {
        alert("登陆失败")
    }
})