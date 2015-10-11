
/**
 * 开发模式生产结构化代码，
 * 部署模式生产混淆压缩代码
 * */
exports.options = {
    alias : {
        'main': gruntProject.src + '/common/scripts/main.js',
        'common' : gruntProject.src + '/common/lib/oas.common.js'
    }
};

/**
 * 开发模式合并js到调试目录
 * 部署模式合并js到生产目录
 * */
exports.all = {
    files: [
        {
            expand: true,
            cwd: gruntProject.src,
            src: ['*/scripts/*.js'],
            dest: gruntProject.prd
        }
    ]
};

console.log('browserify config initialized');