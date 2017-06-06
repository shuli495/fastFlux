function $util_getMsg(xhr, callback) {
	var msg = "";

	if(typeof(xhr.responseText) != "undefined" && xhr.responseText != "undefined" && xhr.responseText.toLowerCase().indexOf("missing request header 'token' for method parameter of type string") != -1) {
		this.$util_alertStr("token失效，请重新登录！");
	}

	if(xhr.status == 0) {
		msg = '系统异常，请稍后再试！';
	} else if(xhr.status >= 400 && (typeof(xhr.responseText) == "undefined" || xhr.responseText == "undefined" || xhr.responseText == "")) {
		if(xhr.status == 404) {
			msg = '链接失效，请稍后再试！';
		} else {
			msg = '系统异常，请稍后再试！';
		}
	} else {
		if(typeof(xhr.responseText) != "undefined" && xhr.responseText != "undefined") {
			msg = eval('('+xhr.responseText+')').data;
			if(msg == '' || typeof(msg) == "undefined" || msg == "undefined") {
				msg = '成功！';
			}
		}
	}

	if(typeof(callback) != "undefined") {
		callback();
	}

	return msg;
}

function $util_alertMsg(xhr,msg,callback) {
	var className = 'alert-success';
	if(xhr.status >= 400) {
		className = 'alert-danger';
	}

	if(typeof(msg) == "undefined" || msg == "undefined" || msg == "") {
		msg = this.$util_getMsg(xhr);
	}

	var msgId = "closeMsg" + Math.random();
	var msgDiv = document.createElement('span');
	msgDiv.className = 'msg alert '+className;
	msgDiv.innerHTML = msg+'<a href="#" class="close" id="'+msgId+'" data-dismiss="alert">&times;</a>';
	document.body.appendChild(msgDiv);
	window.setTimeout("document.getElementById('"+msgId+"').click();",2000);
	if(msg.indexOf('token') != -1) {
		window.setTimeout("location.href='/page/login.html';",1000);
	}

	if(typeof(callback) != "undefined") {
		callback();
	}
}

function $util_alertStr(msg) {
	if(typeof(msg) == "undefined" || msg == "undefined" || msg == "") {
		return;
	}

	var msgId = "closeMsg" + Math.random();
	var msgDiv = document.createElement('span');
	msgDiv.className = 'msg alert alert-success';
	msgDiv.innerHTML = msg+'<a href="#" class="close" id="'+msgId+'" data-dismiss="alert">&times;</a>';
	document.body.appendChild(msgDiv);
	window.setTimeout("document.getElementById('"+msgId+"').click();",2000);
	if(msg.indexOf('token') != -1) {
		window.setTimeout("location.href='/src/page/login.html';",1000);
	}
}

//邮箱格式验证
function $util_checkMail(mail) {
	if(mail == ""){
		return false;
	}

	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	if(!reg.test(mail)){
		return false;
	}
	return true;
}

//数据校验
//fatherId 父控件id，校验该控件下的数据
//data-errMsgId：显示错误信息的div id
//data-empty：true/false 是否非空
//data-emptyText：如果为空提示文本
//data-min：最小长度
//data-minText：最小长度提示文本
//data-max：最大长度
//data-maxText：最大长度提示文本
//data-length：非空长度长度
//data-lengthText：非空长度长度提示文本
//data-include：非空包含
//data-includeText：非空包含提示文本
//data-same：与id的value是否相同
//data-sameText：与id的value是不同提示文本
//data-mail：邮箱格式
//data-mailText：邮箱格式不正确提示文本
function $util_validateValue(fatherId) {
	var fatherDOM = document.getElementById(fatherId);
	var inputs = fatherDOM.getElementsByTagName("input");
	if(this.$util_validateDOMs(inputs) == false) {
		return false;
	}
	var textareas = fatherDOM.getElementsByTagName("textarea");
	if(this.$util_validateDOMs(textareas) == false) {
		return false;
	}
	return true;

}

function $util_validateDOMs(doms) {
	for(var i=0; i<doms.length; i++) {
		var errMsgId = doms[i].getAttribute("data-errMsgId");
		if(errMsgId != null) {
			//非空校验
			var empty = doms[i].getAttribute("data-empty");
			if(empty != null && empty == "true" && doms[i].value == "") {
				var emptyText = doms[i].getAttribute("data-emptyText");
				if(emptyText == null || emptyText == "") {
					emptyText = "不能为空";
				}
				document.getElementById(errMsgId).innerHTML = emptyText;
				return false;
			}

			//最小长度校验
			var min = doms[i].getAttribute("data-min");
			if(min != null && doms[i].value.length < Number(min)) {
				var minText = doms[i].getAttribute("data-minText");
				if(minText == null || minText == "") {
					minText = "最小长度为" + min + "个字符";
				}
				document.getElementById(errMsgId).innerHTML = minText;
				return false;
			}

			//最大长度校验
			var max = doms[i].getAttribute("data-max");
			if(max != null && doms[i].value.length > Number(max)) {
				var maxText = doms[i].getAttribute("data-maxText");
				if(maxText == null || maxText == "") {
					maxText = "最大长度为" + max + "个字符";
				}
				document.getElementById(errMsgId).innerHTML = maxText;
				return false;
			}
			document.getElementById(errMsgId).innerHTML = "";

			//非空长度校验
			var length = doms[i].getAttribute("data-length");
			if(length != null && doms[i].value != "" && doms[i].value.length != Number(length)) {
				var lengthText = doms[i].getAttribute("data-lengthText");
				if(lengthText == null || lengthText == "") {
					maxText = "长度必须为" + max + "个字符";
				}
				document.getElementById(errMsgId).innerHTML = lengthText;
				return false;
			}
			document.getElementById(errMsgId).innerHTML = "";

			//非空包含
			var include = doms[i].getAttribute("data-include");
			if(include != null && doms[i].value != "" && doms[i].value.indexOf(include) == -1) {
				var includeText = doms[i].getAttribute("data-includeText");
				if(includeText == null || includeText == "") {
					includeText = "必须包含'" + include + "'";
				}
				document.getElementById(errMsgId).innerHTML = includeText;
				return false;
			}
			document.getElementById(errMsgId).innerHTML = "";

			//id的value是否相同
			var same = doms[i].getAttribute("data-same");
			if(same != null && doms[i].value != document.getElementById(same).value) {
				var sameText = doms[i].getAttribute("data-sameText");
				if(sameText == null || sameText == "") {
					sameText = "值不同";
				}
				document.getElementById(errMsgId).innerHTML = sameText;
				return false;
			}
			document.getElementById(errMsgId).innerHTML = "";

			//邮箱格式
			var mail = doms[i].getAttribute("data-mail");
			if(mail != null && mail == "true" && doms[i].value != "" && this.$util_checkMail(doms[i].value) == false) {
				var mailText = doms[i].getAttribute("data-mailText");
				if(mailText == null || mailText == "") {
					mailText = "邮箱格式不正确";
				}
				document.getElementById(errMsgId).innerHTML = mailText;
				return false;
			}
			document.getElementById(errMsgId).innerHTML = "";
		}
	}
	return true;
}

// 移除cookie
function $util_removeCookie(timeout) {
        $.removeCookie('token');
        $.removeCookie('userId');
        if(typeof(timeout) == "undefined") {
        	location.href="/page/login.html";
        } else {
        	window.setTimeout("location.href='/src/page/login.html';",timeout);
        }
}