

//创建命名空间
var oasgames = {}

/**
 * 创建工具类对象
 */
oasgames.util = {};

/**
 * [oasgames.util.getUrl description] 获取url地址或者指定字符串中参数,只获取链接地址中的第一次出现的key的值作为返回值
 * @param  {[string]} key  [description] 键值名称
 * @param  {[string]} str [description]
 * @return {[type]}      [description]
 */
oasgames.util.getUrl =  function(key , str) {
	var val = null;
	var tempStr = str == undefined ? window.location.search.substring(1) : str.split('?')[1];
	if(tempStr.length != 0){
		var arr = tempStr.split('&');
		var len = arr.length;
		for(i=0 ; i < len ; i++){
			if(arr[i].split('=')[0] == key){
				val = arr[i].split('=')[1];
				break;
			}
		}
	}
	return val;
};

/**
 * [oasgames.util.tab description] tab切换类操作
 * @param  {[string]} opt.eType   [description] 事件类型 hover 和 click  默认 click
 * @param  {[object]} opt.tabEleParent  [description] 	切换元素对象 
 * @param  {[object]} opt.contEleParent [description]   被切换元素对象
 * @param  {[string]} opt.css [description]   			切换当前元素样式
 * @param  {[type]} opt.callback [description]   		切换后回调方法
 * @param  {[type]} opt.stop [description]   			取消冒泡事件
 * @param  {[type]} opt.actStop [description]   		当前元素是否能启动连接操作
 */
oasgames.util.tab = function(options){
	var defin = {
		eType : 'click',
		tabEleParent : null,
		contEleParent : null,
		css : 'active',
		callback : null,
		stop : true,
		actStop : true
	}
	var opt = $.extend({} , defin , options ? options : {});
	if(opt.eType != 'click' && opt.eType != 'hover' ) return;
	opt.tabEleParent.children()[opt.eType](function(e){
		if(opt.actStop && $(this).hasClass(opt.css)) return false;
		var index = $(this).index();
		$(this).addClass(opt.css).siblings().removeClass(opt.css);
		opt.contEleParent.children().eq(index).show().siblings().hide();
		if(typeof opt.callback == 'function' ) opt.callback(opt,$(this),opt.contEleParent.children().eq(index),opt.contEleParent.children().eq(index));
		if(opt.stop){
			e.stopPropagation();
			return false;	
		}
	});	
};


/**
 * [oasgames.util.getEleData description] 解析元素属性特定字符串，并转换为特定对象格式返回
 * @param  {[object]} element [description]  元素对象
 * @param  {[string]} attr    [description]	 元素属性名称
 * @return {[object]}         [description]  返回json格式
 */
oasgames.util.getEleData = function(element,attr){
	var json = {} , temp = [] , len , klen;
	var str = $(element).attr( attr ? attr : 'data-post');
	if(!str) return {};
	temp = str.split('&');
	len = temp.length;
	for(var i = 0; i < len ; i++){
		var a = temp[i].split('=');
		if(a.length > 2){
			var key = a[0];
			var arr = a.slice(1);
			var val = arr.join('=');
		}else{
			var key = a[0];
			var val = a[1];
		}
		json[key] = val;
	}
	return json;
};



/**
 * [oasgames.util.getEleInfo description] 获取元素对象高，宽，坐标值,没有找对元素节点对象返回null
 * @param  {[object]} element 	[description] 	元素节点
 * @param  {[boolean]} outType 	[description] 	高度是否包含元素padding、margin、border
 * @return {[type]}         [description] 		返回json格式对象，包括（高，宽，坐标值信息）假如是window,返回滚动条高度
 */
oasgames.util.getEleInfo = function(element,outType){
	outType = outType == undefined ? false :  outType;
	var json = {};
	if(element === undefined) element = $(window); 
	if($(element).length == 0) return {};
	if(element.get(0) == window){
		json.h = $(element).height();
		json.w = $(element).width();
		json.st = $(element).scrollTop();
		json.sl = $(element).scrollLeft();
	}else{
		if(outType) {
			json.h = $(element).outerHeight();
			json.w = $(element).outerWidth();
		}else{
			json.h = $(element).height();
			json.w = $(element).width();	
		}
	}
	if(element.get(0) == window) return json;
	json.t = Math.floor($(element).offset().top);
	json.l = Math.floor($(element).offset().left);
	return json;
};


/**
 * [oasgames.util.rando description] 生成随机数
 * @param  {[number]} min [description] 生成最小数字
 * @param  {[number]} max [description] 生成最大数字
 * @return {[number]}     [description] 返回随机数
 */
oasgames.util.random = function(min, max){
	var Range = max - min;
    var Rand = Math.random();
    return(min + Math.round(Rand * Range));
};



//加载underscore组件
oasgames._ = require('../lib/underscore-min.js');


/**
 * 创建配置类对象
 */
oasgames.config = {}
oasgames.config._setting = {};

/**
 * [oasgames.config.get description]  获取配置信息，如果没有找到该配置返回null
 * @param  {[string]} key [description] 配置名字
 * @return {[type]}     [description] 	返回配置信息(String)
 */
oasgames.config.get = function(key) {
	return oasgames.config._setting[key] ? oasgames.config._setting[key] : null;
};

/**
 * [oasgames.config.set description] 写入配置信息
 * @param {[string]} key   [description] 配置名字
 * @param {[string]} value [description] 配置信息
 */
oasgames.config.set = function(key, value) {
	if ($.isPlainObject(key)) {
		$.extend(oasgames.config._setting, key);
	} else {
		oasgames.config._setting[key] = value;
	}
};

oasgames.config.set('site_www','');
oasgames.config.set('site_cdn','');
oasgames.config.set('site_version','');


/**
 * 创建cookie对象
 */
oasgames.cookie = {}

/**
 * [oasgames.cookie.get  description] 读取cookie值
 * @param  {[string]} key     [description] cookie键值名称
 * @param  {[object]} options [description] cookie可选对象
 * @return {[string]}         [description] 返回cookie键值所对应的的值，没有值返回null
 */
oasgames.cookie.get = function (key, options) {
	options = options || {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


/**
 * [oasgames.cookie.remove description] 删除指定键值所对应的cookie值
 * @param  {[type]} key     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
oasgames.cookie.remove = function (key,options) {
	oasgames.cookie.set(key, null , options ? options : {});
};


/**
 * [oasgames.cookie.set description] 添加指定名称cookie值 , 过期时间小时制
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 * @param {[type]} opt   [description] cookie相关属性，
 */
oasgames.cookie.set = function (key, value, options) {
	options = $.extend({},{
    	domain : '',
    	path : '/'
    }, options);

	//删除cookie操作处理
    if (value === null) {
        options.expires = -1;
    }

    //设置过期时间
    if (typeof options.expires === 'number') {
		var seconds = options.expires, t = options.expires = new Date();
        t.setTime(t.getTime() + seconds*1000*60*60);
    }

    //强制转换为字符串格式
    value = '' + value;

    //设置cookie信息
    return (document.cookie = [
        encodeURIComponent(key), '=',
        options.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
    ].join(''));
};


/**
 * 创建字符类对象
 */
oasgames.string = {}

/**
 * [oasgames.string.encode description] 转义html中的标签<>符号]
 * @param  {[string]} html [description] 需要转义的html字符串
 * @return {[string]}      [description] 返回转义完成的html字符串
 */
oasgames.string.encode = function(html){
	var newStr = '';
	newStr = html.replace(/\</g, '&lt;');
	newStr = newStr.replace(/\>/g, '&gt;');
	return newStr;	
};


/**
 * [oasgames.string.filter description] 去掉HTML所有标签
 * @param  {[string]} html     [description] 需要过滤的HTML字符串
 * @param  {[string]} allowed  [description] 被允许通过的一个或多个标签字符串'<b><div><i>'
 * @return {[type]}         [description]
 */
oasgames.string.filter = function (html, allowed) {
	var allowed =  allowed == undefined  ? '' : allowed;
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return html.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};


/**
 * [oasgames.string.len description] 获取字符长度 , 英文长度为1，汉字长度为2
 * @param  {[boolean]} type [description] false - 返回英文模式长度(默认)  true - 返回汉字模式长度
 * @return {[type]}      [description]
 */
oasgames.string.len = function(str,type){
	var flag = type == undefined ? false : type;
	var count= 0;
	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) > 255) {
			count += 2
		} else {
			count++
		}
	}
	if(!flag) return count;
	if(Math.round(count/2) == 1) var strlenth = 1;
	else var strlenth = Math.round(count/2);
	return strlenth;
};


/**
 * [oasgames.string.cut description] 指定截取字符串长度(区分中英文)
 * @param  {[string]} str [description] 需要截取的字符串
 * @param  {[number]} len [description] 需要截取的字符长度
 * @param  {[number]} type [description] 需要截取的字符长度
 * @return {[type]}     [description] 新的字符串长度
 */
oasgames.string.cut = function(str,len,type) {
	var wlen = oasgames.string.len(str,false), newstr = '';
	if(type != undefined) var fix = '...';
	else  var fix = '';
	if(wlen > len){
		var c = str.replace(/&/g, " ").replace(/[^\x00-\xff]/g, "&&");
		newstr = str.slice(0, c.slice(0, len).replace(/&&/g, " ").replace(/&/g, "").length) + fix;
	}else {
		newstr = str;
	}
	return newstr;
};


/**
 * [oasgames.string.deEncode description] 给指定的字符串长进行编码或者解码
 * @param  {[string]} str  [description] 需要编码或者解码的字符串
 * @param  {[boolean]} type [description] 编码或者解码  false（默认）: 解码   true : 编码
 * @return {[string]}      [description] 返回编码或解码后的新字符串
 */
oasgames.string.deEncode = function(str,type){
	var flag = type == undefined ? false : type;
	var newStr = '';
	if(flag){
		newStr = encodeURIComponent(str);
		newStr = newStr.replace(/\*/g, '%2A');
		newStr = newStr.replace(/\!/g, '%21');
		newStr = newStr.replace(/\(/g, '%28');
		newStr = newStr.replace(/\)/g, '%29');
		newStr = newStr.replace(/\'/g, '%27');
	}else{
		newStr = decodeURIComponent(str);
	};
	return newStr;
};


oasgames.change = {};
oasgames.change.time = 200;   
	
//存储窗口滚动事件处理方法
oasgames.change.scrollCode = {};
oasgames.change.scrollTimeer = null;  
$(window).scroll(function(e){
	if(oasgames.change.scrollTimeer) clearTimeout(oasgames.change.scrollTimeer);
	oasgames.change.scrollTimeer = setTimeout(function(){
		for( var key in oasgames.change.scrollCode){
			if(typeof oasgames.change.scrollCode[key] == 'function') {
				oasgames.change.scrollCode[key]();
			}
		}
	},oasgames.change.time);
});

//存储窗口大小改变事件处理方法
oasgames.change.resizeCode = {};
oasgames.change.resizeTimeer = null;
$(window).resize(function(e){
	if(oasgames.change.resizeTimeer) clearTimeout(oasgames.change.resizeTimeer);
	oasgames.change.resizeTimeer = setTimeout(function(){
		for( var key in oasgames.change.resizeCode){
			if(typeof oasgames.change.resizeCode[key] == 'function') {
				oasgames.change.resizeCode[key]();
			}
		}
	},oasgames.change.time);
});



module.exports = oasgames;
