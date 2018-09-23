module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            options: { //可选项配置
                separator: ';'   //使用;连接合并
            },
            build: { //此名称任意
                src:  ["src/js/*.js"],  //合并哪些js文件
                dest: "build/js/built.js" //输出的js文件
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'build/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/built.js']
                }
            }
        },
        cssmin:{
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            build: {
                files: {
                    'build/css/output.min.css': ['src/css/*.css']
                }
            }
        },
        watch : {
            scripts : {
                files : ['src/js/*.js', 'src/css/*.css'],
                tasks : ['concat', 'uglify', 'cssmin'],
                options : {spawn : false}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','uglify','cssmin','watch']);

};