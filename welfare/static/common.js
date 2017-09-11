var domain = 'http://192.168.0.46:8086/miyou';

function _ajax(type,url,param,success){
	$.ajax({
            type:type,
            url:domain+url,
            data:param,
            async : false,
            success:function(data){
                if(data.code){
                    if(data.code == 1){
                        success&&success(data);
                    }else{
                        alert(data.errorMessage);
                    }
                }else{
                    success&&success(data);
                }
            },
            error:function(error,errormsg,q){
                alert('error:'+error.status);
            }
        })
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function getTimeDifference(date1,date2){
	var date3=date2-date1  //时间差的毫秒数
	//计算出相差天数
	var days=Math.ceil(date3/(24*3600*1000))
	return days;
}