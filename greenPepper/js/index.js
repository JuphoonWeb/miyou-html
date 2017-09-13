

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

function notice(text){
	$(document).dialog({
        type : 'notice',
        infoText: text,
        autoClose: 1500
    });
}