require("../common/header");
require("../common/aside");
require('../common/a.js');
require('../common/b.js');
$.ajax({
    url: "/v6/teacher/profile",
    type: "get",
    success: function(data) {
        if (data.code == 200) {
            $(".teacher-profile").html(template("teacher-profile-tpl", data.result));
            initPlugin(); //位置要放在数据渲染完之后
        }
    }
})
$("#teacher-profile-form").ajaxForm({
        delegation: true,
        success: function(data) {
            if (data.code == 200) {
                alert("修改成功")
            }
        }
    })
    //日期
    // 因为页面数据是动态渲染生成的，所以用$是获取不到input的，并且只有当页面渲染完成后才可以拿到input
    //封装一个函数，然后当页面渲染完后调用
function initPlugin() {
    //引用插件
    $('input[name=tc_birthday]').datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            endDate: new Date("2017-01-01") //这里的值要为字符串

        })
        // 三级联动插件
    $('#region-container').region({
        url: '/lib/jquery-region/region.json'
    });
    // 富文本编辑器
    window.edit = CKEDITOR.replace('introduce', {
        width: 600,
        skin: 'moono-lisa'
    });
}