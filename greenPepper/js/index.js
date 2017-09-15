//dialog插件封装

function toast(text, status){
	var iconUrl = ''
	if(status === 'success'){
		iconUrl = '../img/success.png'
	}else if(status === 'fail'){
		iconUrl = '../img/fail.png'
	}else if(status === 'loading'){
		iconUrl = '../img/loading.gif'
	}
	$(document).dialog({
		type: 'toast',
		infoIcon: iconUrl,
		infoText: text,
		autoClose: 1500
	})
}
function dialog(obj){
	 var dialog = $(document).dialog({
        type : obj.type || 'alert',
        style: 'default',  // default、ios、android
        // titleText: title,
        content: obj.text,
        onClickConfirmBtn: obj.ok
    });
	return dialog
}
function notice(text){
	$(document).dialog({
        type : 'notice',
        infoText: text,
        autoClose: 1500
    });
}


 //根据请求url获取参数
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

// Date对象格式化
Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
}

