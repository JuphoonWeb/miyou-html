
function ajax(dataObj){

	$(document).unbind('ajaxStart')
    $(document).ajaxStart(function(){
		layer.load()

	})
    var url = 'http://122.227.209.194:8086/miyou/'

    url += dataObj.url
	var method = dataObj.method || 'get',
		async = dataObj.hasOwnProperty('async') ? dataObj.async : true,
		timeout = dataObj.timeout || 5*1000,
		cache = dataObj.cache,
		processData = dataObj.processData,
	    contentType = dataObj.contentType,
	    uuid = getCookie('uuid'),
	    successFunc = function(res){
	    	layer.closeAll()
	    	console.log('success',res)
	    	dataObj.successFunc && dataObj.successFunc(res)
	    },
	    errorFunc = function(xhr, status){
	    	layer.closeAll()
	    	console.log('error',status)
	    	dataObj.errorFunc && dataObj.errorFunc(xhr, status)
	    }

	    var data = dataObj.data

	    if(data){
			data.page = data.page || 1
			data.size = data.size || 12
		}
	console.log('async', async)


	$.ajax({
		
		url: url,
		type: method,
		async: async,
		cache: cache,
		processData: processData,
	    contentType: contentType,
		headers: {
			token: uuid
		},
		dataType : 'json',
		// data: {
		// 	username: username,
		// 	password: password,
		// 	page: page,
		// 	size: size,
		// 	clazzId: clazzId,
		// 	studentId: studentId,	
		// 	phone: phone,
		// 	pid: pid,
		// 	uid: uid,
		// 	parentId: parentId
		// },
		data: data,
		timeout: timeout,
		success: successFunc,
		error: errorFunc 
	})
}

