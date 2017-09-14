var domain = 'http://112.35.7.96:8086/miyou';

function _ajax(type,url,param,success){
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
                        toast(data.error,2000);
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

function toast(text,time,callback){
    var str = '<span class="toast J_toast" style="display: none">'+text+'</span>';
    if($('.J_toast').length!=0)return false;
    $('body').append(str);
    $('.J_toast').fadeIn(300);
    if(!time) return false;
    setTimeout(function(){
        $('.J_toast').fadeOut(300);
        setTimeout(function(){
            $('.J_toast').remove();
            callback&&callback();
        },300)
    },time)
}


$(document).on('click','.J_close',function(){
   $('.J_pop').remove();
});