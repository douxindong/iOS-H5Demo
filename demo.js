var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var isApp = true;
function iosDo(event,param){    
    try {
        log("a");
        var paramstr="null";
        if(param){
            var t=typeof(param);
            log("t is "+t );
            if(t=='string'){
                paramstr="'"+param+"'";
            }else if(t=="object"){
                paramstr= JSON.stringify(param);
            }
        }
        var js="var result= window.webkit.messageHandlers."+event+".postMessage("+paramstr+"); return result;";
        log("p0 is "+paramstr );
        log("js0 is "+js );        
        (new Function(js))();
    } catch (error) {
        log(error);
        try {

            log("b");
            var paramstr="";
            if(param){
                var t=typeof(param);
                log("t is "+t );
                if(t=='string'){
                    paramstr="'"+param+"'";
                }else if(t=="object"){
                    var s="";
                    for(var o in param){
                        var t=typeof(param[o]);
                        if(t=="string"){
                            s+="'"+param[o]+"',";
                        }else{
                            s+=param[o]+",";
                        }                        
                    }
                    paramstr= s.substring(0,s.length-1);
                }
            }
            var js="return OCmodel."+event+"("+paramstr+");";
           
            log("p1 is "+paramstr );
            log("js1 is "+js );        
            (new Function(js))();
            return;

        } catch (error) {
            log(error);
        }
    }
    log("c");
    return null;
}
//初始化
function initApp() {
    log("begin initApp ");
    try {
        if (isAndroid) {
            window.OCmodel.getAppInfo(); //调用原生方法
        }
        if (isiOS) {            
            iosDo('getAppInfo');
        }
    } catch (error) {
        log("initApp error");
        log(error);
    }
}
//设置原生app的头名称
function setInnerTitle(title) {
    log("begin setInnerTitle " + title);
    try {
        if (isAndroid) {
            window.OCmodel.setInnerTitle(title); //调用原生方法：设置app的头名称
        }
        if (isiOS) {
            iosDo('setInnerTitle',title);
        }

    } catch (error) {
        log("setInnerTitle error");
        log(error);
    }
}
//调用原生app的分享
function appShareUrl(shareData) {
    log("begin appShareUrl shareData=" + JSON.stringify(shareData));
    try {
        if (isAndroid) {
            window.OCmodel.goShareUrl(JSON.stringify(shareData)); //调用原生方法：分享
        }
        if (isiOS) {
            //调用原生方法：分享
            iosDo('goShareUrl',shareData);
        }
    } catch (error) {
        log("appShareUrl error");
        log(error);
    }
}

//原生app内跳转到商品详情页
function goItem(itemInfoId) {
    log("begin goItem " + itemInfoId);
    try {
        if (isAndroid) {
            window.OCmodel.goItem(itemInfoId); //调用原生方法：跳转到原生商品详情页
        }
        if (isiOS) {
            //调用原生方法：跳转到原生商品详情页
            iosDo('goItem',itemInfoId);
        }
    } catch (error) {
        log("goItem error");
        log(error);
    }
}
//原生app去登录
function showLoginPopup() {
    log("begin showLoginPopup ");
    try {
        if (isAndroid) {
            window.OCmodel.showLoginPopup(); //调用原生方法：去登录
        }
        if (isiOS) {
            //调用原生方法：去登录
            iosDo('showLoginPopup');
        }
    } catch (error) {
        log("showLoginPopup error");
        log(error);
    }
}
//调用原生去支付
function goPay(paywaycode, paydata) {
    log("begin goPay " + paywaycode + "  " + paydata);
    try {
        if (paywaycode == "Alipay_App") {
            if (isAndroid) {
                window.OCmodel.AliPay(paydata); //调用原生方法:支付宝支付
            }
            if (isiOS) {
                //调用原生方法:支付宝支付
                iosDo('AliPay',paydata);
            }
        }
        if (paywaycode == "WxPay_App") {
            if (isAndroid) {
                window.OCmodel.WeChatPay(JSON.stringify(paydata)); //调用原生方法:微信支付
            }
            if (isiOS) {
                //调用原生方法:微信支付
                iosDo('WeChatPay',paydata);
            }
        }
    } catch (error) {
        log("goPay error");
        log(error);
    }
}

//判断是否启用app通知
function IsEnableAppNotice() {
    log("begin IsEnableAppNotice ");
    try {
        if (isAndroid) {
            return window.OCmodel.isEnableAppNotice(); //调用原生方法:判断是否启用app通知
        }
        if (isiOS) {
            //调用原生方法:判断是否启用app通知
            return iosDo('isEnableAppNotice');
        }
    } catch (error) {
        log("IsEnableAppNotice error");
        log(error);
    }
    return false;
}
//弹出去设置开启提醒的alert
function showEnableAppNoticeAlert() {
    log("begin showEnableAppNoticeAlert ");
    try {
        if (isAndroid) {
            window.OCmodel.showEnableAppNoticeAlert(); //调用原生方法:弹出去设置开启提醒的alert
        }
        if (isiOS) {
            //调用原生方法:弹出去设置开启提醒的alert
            iosDo('showEnableAppNoticeAlert');
        }
    } catch (error) {
        log("showEnableAppNoticeAlert error");
        log(error);
    }
}
//保存图片到本地
function savePhotoToAlbum(imgbase64str) {
    log("begin savePhotoToAlbum " + imgbase64str);
    try {
        if (isAndroid) {
            window.OCmodel.savePhotoToAlbum(imgbase64str); //调用原生方法:弹出保存图片
        }
        if (isiOS) {
            //调用原生方法:弹出保存图片
            iosDo('savePhotoToAlbum',imgbase64str);
        }
    } catch (error) {
        log("savePhotoToAlbum error");
        log(error);
    }
}
//呼出相册
function callAlbum() {
    log("begin callAlbum ");
    try {
        if (isAndroid) {
            window.OCmodel.callAlbum(); //调用原生方法:呼出相册
        }
        if (isiOS) {
            //调用原生方法:呼出相册
            iosDo('callAlbum');
        }
    } catch (error) {
        log("callAlbum error");
        log(error);
    }
}

//重新刷新webView
function reloadWebView() {
    log("begin reloadWebView ");
    try {
        if (isAndroid) {
            window.OCmodel.reloadWebView(); //调用原生方法:呼出相册
        }
        if (isiOS) {
            //调用原生方法:呼出相册
            iosDo('reloadWebView');
        }
    } catch (error) {
        log("reloadWebView error");
        log(error);
    }
}
//获取用户信息
function getUserInfo() {
    log("begin getUserInfo ");
    try {
        if (isAndroid) {
            window.OCmodel.getUserInfo(); //调用原生方法:获取用户信息
        }
        if (isiOS) {
            //调用原生方法:获取用户信息
            iosDo('getUserInfo');
        }
    } catch (error) {
        log("getUserInfo error");
        log(error);
    }
}
//加入购物车
function addCart(itemId) {
    log("begin addCart ");
    try {
        if (isAndroid) {
            window.OCmodel.addCart(itemId); //调用原生方法:加入购物车
        }
        if (isiOS) {
            //调用原生方法:加入购物车
            iosDo('addCart',itemId);
        }
    } catch (error) {
        log("addCart error");
        log(error);
    }
}
//礼品券加入购物车
function addGiftCoupon(itemId,code,promotionId) {
    log("begin addGiftCoupon ");
    try {
        if (isAndroid) {
            window.OCmodel.addGiftCoupon(itemId,code,promotionId); //调用原生方法:礼品券加入购物车
        }
        if (isiOS) {
            //调用原生方法:礼品券加入购物车
            iosDo('addGiftCoupon',{itemId:itemId,code:code,promotionId:promotionId});
        }
    } catch (error) {
        log("addGiftCoupon error");
        log(error);
    }
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}


var ustr = "";


function log(l) {
    var s = $("#log").html();
    $("#log").html(s + "<br/>" + l);
    console.log(l);
};


$(function () {

    //step 1 初始化
    initApp();

    $("a").each(function () {
        var obj = $(this);
        var text = obj.text();
        var href = obj.attr("href");
        obj.html("<span style='color:#000;'>" + text + "</span> (" + href + ")");
    });

    var r = getQueryString("r")||"1";
    $("#next").attr("href", "http://m.lifetest.com/test/test-app/index.html?r=" + (parseInt(r) + 1));
});