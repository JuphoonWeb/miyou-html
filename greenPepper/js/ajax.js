
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
	    }

	$.ajax({
		
		url: url,
		type: obj.type,
		async: obj.async,
		cache: obj.cache,
		processData: obj.processData,
	    contentType: obj.contentType,
		dataType : 'json',
		data: obj.data,
		timeout: obj.timeout,
		success: successFunc,
		error: errorFunc 
	})
}

