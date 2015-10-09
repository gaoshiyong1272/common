/**
 * [exports description] 模板配置文件处理
 * @return {[type]} [description]
 */
exports.tpl = function(){
	var setting = require('./setting').setting;
	var temp = [
		{
            pattern: /<!-- @import (.+) -->/ig,
            replacement: function (match, $1) {
                return grunt.file.read(gruntProject.src + $1);
            }
        },

        //替换域名
		{
		    pattern: /\{host\}/ig,
		    replacement: function (match, $1) {
		        return setting.host;
		    }
		},

		//替换版本号
		{
		    pattern: /\{version\}/ig,
		    replacement: function (match, $1) {
		        return setting.version;
		    }
		}
	];

	return temp;
}

console.log('replace tpl pattern');