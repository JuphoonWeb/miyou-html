
function ajax(dataObj){

	$(document).unbind('ajaxStart')
    $(document).ajaxStart(function(){
		layer.load()

	})
	var url = 'http://192.168.0.46:8086/miyou/'
    // var url = 'http://192.168.12.1:8086/miyou/'
    // var url = 'http://192.168.15.161:8086/miyou/'
    // var url = 'http://122.227.209.194:8086/miyou/'

    // var url = 'http://218.204.254.209:28812/miyou/'


    url += dataObj.url
	var method = dataObj.method || dataObj.type || 'get',
		async = dataObj.hasOwnProperty('async') ? dataObj.async : true,
		timeout = dataObj.timeout || 5*1000,
		cache = dataObj.cache,
		processData = dataObj.processData,
	    contentType = dataObj.contentType,
	    successFunc = function(res){
	    	layer.closeAll()
	    	if(res.code === -2){
	    		layer.open({
	    			type: 0,
					closeBtn: 0,
					title: '提示',
					icon: 7,
					content: '您没有权限'
	    		})
	    	}else if(res.code === -1){
	    		relogin()
	    	}else{
		    	console.log('success',res)
		    	dataObj.successFunc && dataObj.successFunc(res)
		    }
	    },
	    errorFunc = function(xhr, status){
	    	layer.closeAll()
	    	console.log('error',status)
	    	dataObj.errorFunc && dataObj.errorFunc(xhr, status)
	    },
	    beforeSendFunc = function(xhr, settings){
	    	console.log('beforeSend')
	    	dataObj.beforeSendFunc && dataObj.beforeSendFunc(xhr, settings)	
	    }
	    var data = dataObj.data

	    if(data&&dataObj.z_type!=0){
			data.page = data.page || 1
			data.size = data.size || 12
		}

		var menuUrl = window.location.href.replace('#','').split('/').reverse()[0].split('?')[0]
		
		if(menuUrl){
			var reg = /(.+?html)/
			menuUrl = reg.exec(menuUrl)[1] 
		}

	$.ajax({
		
		url: url,
		type: method,
		async: async,
		cache: cache,
		processData: processData,
	    contentType: contentType,
		headers: {
			token: sessionStorage.getItem('uuid'),
			'Menu-Url': menuUrl 

		},
		dataType : 'json',
		data: data,
		timeout: timeout,
		beforeSend: beforeSendFunc,
		success: successFunc,
		error: errorFunc 
	})
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

Array.prototype.remove = function(val){
	var index = this.indexOf(val)
	if(index > -1){
		this.splice(index, 1);
		return val;
	}
	return null
}

function removeRepeat(array){
	var resultArray = []
	for(var i = 0; i < array.length; i++){
		if(resultArray.indexOf(array[i]) == -1){
			resultArray.push(array[i]);
		}
	}
	return resultArray;
}
var authLevelStatus = ["一级未审核","一级审核拒绝","一级审核通过","二级未审核","二级审核拒绝","二级审核通过"];



function relogin(){
	sessionStorage.removeItem('uuid')
	sessionStorage.removeItem('login')
	sessionStorage.removeItem('username')
	layer.open({
		type: 0,
		closeBtn: 0,
		icon:7, 
		title: '重新登录',
		content: '超过30分钟未操作，已自动登出，请重新登录',
		yes: function() {
			top.open('login.html', '_self')
		}
	})
}

function showNodata(){
	$('#nodata').show()
	$('tbody').children().remove()
	$('#data-num').text(0)
}

//将13位时间戳转换为'yyyy-MM-dd hh:mm:ss'形式
function timeFormat(time){
	time = (time && time.toString().length == 10 )? time*1000 : time //若是10位，则转换为13位
	return new Date(time).Format('yyyy-MM-dd hh:mm:ss')
}

