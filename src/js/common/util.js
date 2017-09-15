function getSearch(key) {
    //Location 对象包含有关当前 URL 的信息。
    // search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）
    // slice() 方法可从已有的数组中返回选定的元素。   
    var searchStr = location.search.slice(1);
    // split 方法 将一个字符串分割为子字符串,然后将结果作为字符串数组返回
    var searchArr = searchStr.split("&");
    var searchObj = {},
        tempArr;
    for (var i = 0; i < searchArr.length; i++) {
        tempArr = searchArr[i].split("=");
        searchObj[tempArr[0]] = tempArr[1];
    }
    return key ? searchObj[key] : searchObj;
}
//  require 用来加载代码，而 exports 和 module.exports 则用来导出代码 
module.exports.getSearch = getSearch;