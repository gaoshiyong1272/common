var fs = require('fs');

/**
 * 构建html模板到调试目录
 * */
exports.import = {
    options: {
        replacements: function(){
            return require('../lib/tplConfig').tpl();
        }()
    },
    files: [
        {
            expand: true,
            cwd: gruntProject.src,
            src: ['*/tpl/*.html'],
            dest: gruntProject.prd,
        }
    ]
};

console.log('string-replace config initialized');