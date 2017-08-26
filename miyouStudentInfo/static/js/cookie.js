function setCookie(name,value,expire,timeByMin,path,domain,secure){
	//timeByDay传入布尔值：true按分钟计expiretime，默认为false,按天计
	var cookie = encodeURIComponent(name)+'='+encodeURIComponent(value);
	var exdate = new Date();
	if(!timeByMin){	
		exdate.setDate(exdate.getDate()+expire);
	}else
		exdate.setMinutes(exdate.getMinutes()+expire);
	cookie += ';expires='+exdate.toGMTString();
	if(path){
		cookie += ';path=' + path;
	}
	if(domain){
		cookie += ';domain=' +domain;
	}
	if(secure){
		cookie += ';secure='+secure;
	}
	document.cookie = cookie;
}

function getCookie(name){
	if(name){
		var cookieStr = document.cookie;
		if(document.cookie.length > 0){
			var startIndex = cookieStr.indexOf(name+'=');
			if(startIndex != -1){
				startIndex = startIndex+name.length+1;
				var endIndex = cookieStr.indexOf(';',startIndex);
				if(endIndex === -1){
					endIndex = cookieStr.length;
				}
				return decodeURIComponent(cookieStr.substring(startIndex,endIndex));
			}
		}
		return '';
	}else{
		var cookieObj={};
		if(document.cookie != ''){
			var cookieStr = document.cookie;
			
			var tempArr = cookieStr.split(';');
			tempArr = tempArr.map(function(x){
				return x.split('=');
			})
			for(let item of tempArr){
				var key = decodeURIComponent(item[0]);
				cookieObj[key] = decodeURIComponent(item[1]);
			}

		}
		return cookieObj;
	}
}

function removeCookie(name){
	document.cookie = name+'=;max-age=0;'
}





