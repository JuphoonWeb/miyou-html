
function ajax(obj){

    var url = 'http://122.227.209.194:8086/miyou/api/' 

    url += obj.url
	

	var successFunc = function(res){
	    	console.log('success',res)
	    	obj.success && obj.success(res)
	    },
	    errorFunc = function(xhr, status){
	    	console.log('error',status)
	    	obj.error && obj.error(xhr, status)
	    },
	    beforeSendFunc = function(xhr, settings){
	    	console.log('beforesend')
	    	obj.beforeSend && obj.beforeSend(xhr, settings)
	    }


	$.ajax({
		
		url: url,
		type: obj.type,
		headers: {
			token: getCookie('api_token')
		},
		async: obj.async,
		timeout: obj.timeout || 5*1000,
		cache: obj.cache,
		processData: obj.processData,
	    contentType: obj.contentType,
		dataType : 'json',
		data: obj.data,
		timeout: obj.timeout,
		beforeSend: beforeSendFunc,
		success: successFunc,
		error: errorFunc 
	})
}

