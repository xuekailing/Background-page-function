var isLogin = !!$.cookie("PHPSESSID");
var isLoginPage = location.pathname == "/dist/html/user/login.html"
if (isLoginPage && isLogin) {
    location.href = "/dist"
} else if (!isLoginPage && !isLogin) {
    location.href = "/dist/html/user/login.html"
}
NProgress.start();
window.onload = function() {
    NProgress.done();
};