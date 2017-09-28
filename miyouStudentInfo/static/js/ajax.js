
function ajax(dataObj){

	$(document).unbind('ajaxStart')
    $(document).ajaxStart(function(){
		layer.load()

	})
    // var url = 'http://192.168.0.46:8086/miyou/'
    // var url = 'http://192.168.15.161:8086/miyou/'
    var url = 'http://218.204.254.209:28812/miyou/'


    url += dataObj.url
	var method = dataObj.method || dataObj.type || 'get',
		async = dataObj.hasOwnProperty('async') ? dataObj.async : true,
		timeout = dataObj.timeout || 5*1000,
		cache = dataObj.cache,
		processData = dataObj.processData,
	    contentType = dataObj.contentType,
	    successFunc = function(res){
	    	layer.closeAll()
	    	console.log('success',res)
	    	dataObj.successFunc && dataObj.successFunc(res)
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
	console.log('async', async)
	console.log('menuUrl', window.location.href.split('/').reverse()[0].split('?')[0])

	$.ajax({
		
		url: url,
		type: method,
		async: async,
		cache: cache,
		processData: processData,
	    contentType: contentType,
		headers: {
			token: sessionStorage.getItem('uuid'),
			'Menu-Url': window.location.href.split('/').reverse()[0].split('?')[0] 

		},
		dataType : 'json',
		data: data,
		timeout: timeout,
		beforeSend: beforeSendFunc,
		success: successFunc,
		error: errorFunc 
	})
}

