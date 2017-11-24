var domain = 'http://218.204.254.209:28811/miyou/';
// var domain = 'http://192.168.0.46:8086/miyou/';
// var domain = 'http://192.168.12.121:8086/miyou/';


function _ajax(type,url,param,success,error){
	$.ajax({
            type:type,
            url:domain+url,
            data:param,
            async : false,
            success:function(data){
                if(data.code!=null){
                    if(data.code == 1){
                        success&&success(data);
                    }else{
                        error?error(data):toast(data.error,2000);
                    }
                }else{
                    success&&success(data);
                }
            },
            error:function(error,errormsg,q){
                toast('error:'+error.status,2000);
            }
        })
}

function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function getTimeDifference(date1,date2){
	var date3=date2-date1;  //时间差的毫秒数
	//计算出相差天数
	var days=Math.ceil(date3/(24*3600*1000));
	return days;
}

function authPop(title,content,btn,link){
    var str =   '<div class="pop J_pop">' +
                    '<div class="pop-content">' +
                        '<img src="./images/notice.png" class="wrong">' +
                        '<h5>'+title+'</h5>' +
                        '<p>'+content+'</p>' +
                        '<a href="'+link+'">'+btn+'</a>' +
                    '</div>' +
                    '<img src="./images/close.png" class="J_close pop-close">' +
                    '<div class="pop-bg"></div>' +
                '</div>';
    $('body').append(str);
}

function warnAlert(text){
    var str =   '<div class="pop J_pop">' +
                    '<div class="alert-content">' +
                        '<p>'+text+'</p>' +
                        '<a href="javascript:void(0)" class="J_close alert-close">确定</a>' +
                    '</div>' +
                    '<div class="pop-bg"></div>' +
                '</div>';
    $('body').append(str);
}

var timer = null;
function toast(text,time,callback){
    var str = '<div class="toast-bg J_toast" style="display: none"><span class="toast">'+text+'</span></div>';
    clearTimeout(timer);
    removeToast();
    $('body').append(str);
    $('.J_toast').fadeIn(300);
    if(!time) return false;
    timer = setTimeout(function(){
        $('.J_toast').fadeOut(300);
        setTimeout(function(){
            removeToast();
            callback&&callback();
        },300)
    },time)
}

function removeToast(){
    $('.J_toast').remove();
}


$(document).on('click','.J_close',function(){
   $('.J_pop').remove();
});

// 取得下载页面地址, appType-- 1: Android 2: iOS
function getDownloadUrl(appType){
    var downloadUrl = appType === 1 ? 
                    'https://www.pgyer.com/jqwanbeta':
                    'https://www.pgyer.com/ypob';
    _ajax('get', 'api/getNewestPackage', {
        appType: appType
    }, function(response){
        console.log(response);
        if(response.code === 1){
            if(response.data && response.data.downloadFileUrl){
                downloadUrl = response.data.downloadFileUrl;
            }

        }else if(response.code === 0){
            toast(response.error);
        }else{
            toast('出现错误');
        }
    }, function(xhr, status){
        toast(status);
    })
    return downloadUrl;
}
