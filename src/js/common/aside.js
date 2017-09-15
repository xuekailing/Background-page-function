var userinfoStr = localStorage.getItem("userinfo"); //获取到存储在缓存里面的头像
var userinfo = JSON.parse(userinfoStr); //JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
$(".aside img").attr("src", userinfo.tc_avatar); //attr() 方法设置或返回被选元素的属性值。 (属性名，属性值)
console.log(userinfoStr)
$(".aside h4").text(userinfo.tc_name); //text() 方法方法设置或返回被选元素的文本内容。
$(".navs a").on("click", function() {
    $(this).next("ul").slideToggle(); //slideToggle() 方法通过使用滑动效果（高度变化）来切换元素的可见状态。//next 下一个兄弟元素
})
var path = location.pathname;
//console.log(path);//返回的是当前的路径
$(".navs a").removeClass("active");
$('.navs a[href="' + path + '"]').addClass('active').parents('ul').show();
//show jq中显示的意思