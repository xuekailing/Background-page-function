var loadingHTML = '<div class ="overlay">' + '<img src="/img/loading.gif">' + '</div>'
$("body").append(loadingHTML);
$(document).on("ajaxStart", function() {
    $('.overlay').show(); //如果已经被隐藏就显示
})
$(document).on("ajaxStart", function() {
    $('.overlay').hide(); //元素已被显示,则隐藏
})