var video_swf = {
	live : 0,
	swf_ready : 0,
	swf_name : 'recv',
	Init : function(swf_param,div_id,type,callbackFn){
		this.swf_param = swf_param;
		if (callbackFn == null){
			callbackFn = this.Created_cb;
		}
		var swfVersionStr = "11.0.0";
		// To use express install, set to playerProductInstall.swf, otherwise the empty string. 
		var xiSwfUrlStr = "playerProductInstall.swf";
		var flashvars = {};
		
		flashvars = {
			url:swf_param.server,
			ext_statistics:1,
			public_cdn:1,
			gid:swf_param.room_id,
			uid:swf_param.uid,
			level:swf_param.level,
			token:swf_param.token,
			nickname:swf_param.nickname,
			splash:swf_param.splash,
			bps : swf_param.bps,
			fps : swf_param.fps,
			vq : swf_param.vq,
			src_w:swf_param.src_w,
			src_h:swf_param.src_h,
			hd:swf_param.is_hd,
			obs:swf_param.obs,
			vu:1,
			speex:0,
			hdassist:0,
			camera_wl:swf_param.camera_wl
			};
		console.log(flashvars);
		var swf_name = 'recv';
		if (type==1){
			swf_name = 'send';
			flashvars.level = 900;
		}
		var params = {};
		params.quality = "high";
		params.bgcolor = "#57799c";
		params.allowscriptaccess = "sameDomain";
		params.allowfullscreen = "true";
		params.wmode = "transparent";
		var attributes = {};
		attributes.id = swf_name;
		attributes.name = swf_name;
		attributes.align = "middle";
		swfobject.embedSWF(
			'/resources/swf/'+swf_name+".swf", div_id,
			'100%', '100%',
			swfVersionStr, xiSwfUrlStr, 
			flashvars, params, attributes,callbackFn);
		this.swf_name = swf_name;
	},

	Created_cb : function(cbobj){
		if (cbobj.success){
			video_swf.swf_ready = 1;
		}
		else{
			layer.alert('flash初始化失败，请安装插件，如果您确定已经有flash插件，请更换浏览器尝试或者联系客服', {title:false,closeBtn :0,btnAlign: 'c',btn:['知道了']});
		}
	},
	
	LiveState : function(state){
		this.live = state;
		if (this.swf_name!='recv'){
			return;
		}
		
		swfobject.getObjectById("recv").LiveState(state);
	},

	
	Logout : function(){
		if (this.swf_name!='recv'){
			return;
		}
		swfobject.getObjectById("recv").Logout();
	}
};

function xconf_livestate()
{
	return video_swf.live;
}

function xconf_swf_error(ErrorCode){
	////console.log("xconf_swf_error: " + ErrorCode );
	if (ErrorCode == "-1"){
		alert("无法连接视频服务器.");
		notify.requestPermission(function() {});
		notify.createNotification('直播系统提示', {body: '无法连接视频服务器！',icon: '/room/images/star.ico'});
		//下麦
		xchat_swf.tokenop('0',0,'');
	}
	if (ErrorCode == "-2"){
		alert("与视频服务器的通信发生错误.");
		notify.requestPermission(function() {});
		notify.createNotification('直播系统提示', {body: '与视频服务器的通信发生错误！',icon: '/room/images/star.ico'});
		//下麦
		xchat_swf.tokenop('0',0,'');
	}
}

function xconf_swf_notify(type,param){
	if (type == "xconf_swf_ready"){
		////console.log("xconf_swf_ready");
	}
	if (type == "talk_stop_by_server"){
		//xMessager.cancelmic();
	}
	if (type == "CAST"){
		if (xMessager)
		{
			//xMessager.onChannelState(param);
		}
	}
}

function send_swf_lack(param)
{
	/*
	param == '0',表示本浏览器没有允许访问麦克风和摄像头，这时应该出现一个层，引导主播点击浏览器的允许按钮，并刷新页面；
	param == '1',表示本机没有安装我们允许的虚拟摄像头软件，这时应该出现一个层，引导主播下载安装虚拟摄像头软件；
	param == '20',表示本机没有安装我们的直播软件，或者安装了没有运行；这时应该出现一个层，用于引导主播下载我们的直播软件
	param == '21',表示本机已经检测到我们的直播软件，隐藏对应的层；
	*/
	console.log('send_swf_lack, ' + param);
}

function xconf_swf_publish(type){
	xchat_swf.tokenop(type);
}

function ucast_h264_log(log){
	alert('log:'+log);
	var url = "/room/ucast_h264.php";
	var data = {
		'TYPE':'log',
		'UID':video_swf.swf_param.uid,
		'DATA': log
	};

	jQuery.post(url,JSON.stringify(data),function(result){
		//console.log(result);
		/*
		var r = jQuery.parseJSON(result);
		//console.log(r.RES);
		if (r.RES==0){
		}
		if (r.RES==1){
		}
		*/
	})
	.fail(function(){
		////console.log('error');
		});
}

function MicParam(type,time){
	swfobject.getObjectById("send").MicParam(type,time);
}

function mic_action(action){
	swfobject.getObjectById("send").MicAction(action);
}

function MicTime(duration,elapse){
	swfobject.getObjectById("send").MicTime(duration,duration-elapse);
}

function recv_swf_statistics(s){
	console.log(s);
	if (video_swf.live){
		$(".loading").html(s);
	}
}

function send_swf_mic_op(type){
	if(xMessager.logined == false){
		layer.msg('聊天服务器连接失败，无法上麦', {icon: 5});
		return
	}
	console.log('send_swf_mic_op:'+type);
	if(roompara.set_relay_room){
		layer.msg('现在是转播间，不能排麦！');
		return false;
	}
	var parma_arr = {};
	parma_arr._token = csrf_token;
	parma_arr.op = type;
	parma_arr.room_id = room_id;
	var changev_div = layer.load(3);
	$.ajax({type: "POST", url:version+"/room/mic/token_op.html" ,async: false, data: parma_arr, dataType : "JSON",
		success: function(res){
			layer.close(changev_div);
			if(res.error == 0){
				SetPushURL(res.data.push);
			}else{
				layer.msg(res.message, {icon: 5});
			}
		},
		error : function(){
			layer.close(changev_div);
		}
	});
	/*if(type == "1" ){
		var requester = '';
		if (userpara){
			requester = userpara.nickname_b64;
		}
		xchat_swf.tokenop('1',0,requester);
	}
	if(type == "0" ){
		xchat_swf.tokenop('0',0,'');
	}*/
}

function Play(){
	console.log(swfobject);
	console.log(swfobject.getObjectById("recv"));
	swfobject.getObjectById("recv").LiveState(1);
}

function Stop(){
	swfobject.getObjectById("recv").LiveState(0);
}

function Pause(){
	swfobject.getObjectById("recv").Pause(1);
}

function Resume(){
	swfobject.getObjectById("recv").Pause(0);
}

function Mute(){
	swfobject.getObjectById("recv").Mute(1);
}

function UnMute(){
	swfobject.getObjectById("recv").Mute(0);
}

function SetVolume(v){
	try{
	swfobject.getObjectById("recv").SetVolume(v);
	}
	catch (e){
	}
}

function recv_swf_statistics(s){
	console.log(s);
}

function SetPushURL(url){
	swfobject.getObjectById("send").SetPushURL(url);
}

function SetPullURL(url){
	swfobject.getObjectById("recv").SetPullURL(url);
}
