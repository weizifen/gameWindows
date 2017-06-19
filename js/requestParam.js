/**
 * Created by weizifen on 17/6/13.
 */
//将URL中的UTF-8字符串转成中文字符串
function getCharFromUtf8(str) {
    var cstr = "";
    var nOffset = 0;
    if (str == "" || str == undefined)
        return "";
    //str = str.toLowerCase();
    if(str.indexOf("%E") >= 0){
        nOffset = str.indexOf("%E");
    }else{
        nOffset = str.indexOf("%e");
    }

    if (nOffset == -1)
        return unescape(str);
    while (nOffset != -1) {
        cstr += str.substr(0, nOffset);
        str = str.substr(nOffset, str.length - nOffset);
        if (str == "" || str.length < 9)
            return cstr;
        cstr += utf8ToChar(str.substr(0, 9));
        str = str.substr(9, str.length - 9);
        if(str.indexOf("%E") >= 0){
            nOffset = str.indexOf("%E");
        }else{
            nOffset = str.indexOf("%e");
        }
    }
    return unescape(cstr + str);
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=getCharFromUtf8(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//将编码转换成字符
function utf8ToChar(str) {
    var iCode, iCode1, iCode2;
    iCode = parseInt("0x" + str.substr(1, 2));
    iCode1 = parseInt("0x" + str.substr(4, 2));
    iCode2 = parseInt("0x" + str.substr(7, 2));
    return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
}

var param = GetRequest();

window.param=GetRequest();