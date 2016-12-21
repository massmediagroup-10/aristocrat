var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-cssnano'),
    uncss = require('gulp-uncss'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    ghPages = require('gulp-gh-pages'),
    babel = require('gulp-babel'),
    cssimport = require('gulp-cssimport'),
    beautify = require('gulp-beautify'),
    sourcemaps = require('gulp-sourcemaps'),
    critical = require('critical').stream,
    merge = require('merge-stream');

/* baseDirs: baseDirs for the project */

var baseDirs = {
    dist:'dist/',
    src:'src/',
    assets: 'dist/assets/'
};

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: baseDirs.src+'styles/*.scss',
        _scss: baseDirs.src+'styles/_includes/*.scss',
        css: baseDirs.assets+'css/',
        fonts: baseDirs.src+'fonts/',
        fontsdist: baseDirs.assets+'fonts/'
    },

    templates: {
    	pug: baseDirs.src+'templates/*.pug',
        _pug: baseDirs.src+'templates/_includes/*.pug',
    },

    scripts: {
        base:baseDirs.src+'scripts/',
        js: baseDirs.src+'scripts/*.js',
        jsmin: baseDirs.assets+'js/'
    },
    files: {
        html: 'dist/',
        images: baseDirs.src+'images/*',
        imgmin: baseDirs.assets+'files/img/',
        cssFiles: baseDirs.assets+'css/*.css',
        htmlFiles: baseDirs.dist+'*.html',
        styleCss: baseDirs.assets+'css/style.css',
        fonts: baseDirs.assets+'fonts/'
    },

    deployDirs: {
        baseDir: baseDirs.dist,
        baseDirFiles: baseDirs.dist+'**/*',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};

/* Compiling Tasks */

// Templating

gulp.task('templates', function() {
    return gulp.src([routes.templates.pug, '!' + routes.templates._pug])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling pug.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(pug())
        .pipe(gulp.dest(routes.files.html))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'pug Compiled succesfully!',
            message: 'pug task completed.'
        }));
});

// SCSS

gulp.task('styles', function() {
    return gulp.src(routes.styles.scss)
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Compiling SCSS.",
                message:"<%= error.message %>"
            })
        }))
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/font-awesome/scss',
                'node_modules/motion-ui/motion-ui.scss'
            ],
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 3 versions'))
        //.pipe(sourcemaps.write())
        .pipe(cssimport({}))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(routes.styles.css))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'SCSS Compiled and Minified succesfully!',
            message: 'scss task completed.'
        }));
});


// FONTS
gulp.task('fonts', function () {
    return gulp.src([
            routes.styles.fonts + '/*.*',
            'node_modules/font-awesome/fonts',
        ])
        .pipe(gulp.dest(routes.styles.fontsdist))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'Fonts placed succesfully!',
            message: 'fonts task completed.'
        }));
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function() {
    return gulp.src([
            'node_modules/foundation-sites/js/foundation.core.js',
            'node_modules/foundation-sites/js/foundation.util.mediaQuery.js',
            'node_modules/foundation-sites/js/foundation.util.keyboard.js',
            'node_modules/foundation-sites/js/foundation.util.box.js',
            'node_modules/foundation-sites/js/foundation.util.triggers.js',
            'node_modules/foundation-sites/js/foundation.reveal.js',
            'node_modules/foundation-sites/js/foundation.util.motion.js',
            'node_modules/jquery-validation/dist/jquery.validate.min.js',
            'node_modules/packery/dist/packery.pkgd.min.js',
            routes.scripts.js
        ])
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Babel and Concat failed.",
                message:"<%= error.message %>"
            })
        }))
       // .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
            //.pipe(babel())
            //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(routes.scripts.jsmin))
        .pipe(browserSync.stream())
        .pipe(notify({
            title: 'JavaScript Minified and Concatenated!',
            message: 'your js files has been minified and concatenated.'
        }));
});

/* Lint, lint the JavaScript files */

gulp.task('lint', function() {
	return gulp.src(routes.scripts.js)
		.pipe(jshint({
			lookup: true,
			linter: 'jshint',
		}))
		.pipe(jshint.reporter('default'));
});

/* Image compressing task */

gulp.task('images', function() {
    gulp.src(routes.files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(routes.files.imgmin));
});

gulp.task('gh-pages', function() {
    return gulp.src(routes.deployDirs.baseDirFiles)
        .pipe(ghPages({
            message: 'Yo! Updating and pushing [timestap]'
        }));
});

/* Preproduction beautifiying task (SCSS, JS) */

gulp.task('beautify', function() {
    gulp.src(routes.scripts.js)
        .pipe(beautify({indentSize: 4}))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Beautify failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(routes.scripts.base))
        .pipe(notify({
            title: 'JS Beautified!',
            message: 'beautify task completed.'
        }));
});

/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function() {
    browserSync.init({
        server: './dist/'
    });

    gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);
    gulp.watch([routes.templates.pug, routes.templates._pug], ['templates']);
    gulp.watch(routes.scripts.js, ['scripts', 'beautify']);
    gulp.watch(routes.files.images, ['images']);
});

/* Optimize your project */

gulp.task('uncss', function() {
    return gulp.src(routes.files.cssFiles)
        .pipe(uncss({
            html:[routes.files.htmlFiles],
            ignore:['*:*']
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: UnCSS failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(routes.styles.css))
        .pipe(notify({
            title: 'Project Optimized!',
            message: 'UnCSS completed!'
        }));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
    return gulp.src(routes.files.htmlFiles)
        .pipe(critical({
            base: baseDirs.dist,
            inline: true,
            html: routes.files.htmlFiles,
            css: routes.files.styleCss,
            ignore: ['@font-face',/url\(/],
            width: 1300,
            height: 900
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "Error: Critical failed.",
                message:"<%= error.message %>"
            })
        }))
        .pipe(gulp.dest(baseDirs.dist))
        .pipe(notify({
            title: 'Critical Path completed!',
            message: 'css critical path done!'
        }));
});

/* Move slick-carousel to correct folders */

gulp.task('slick', function() {
    var slick = 'node_modules/slick-carousel/slick/';
    var jquery_path = 'node_modules/slick-carousel/node_modules/jquery/dist/jquery.min.js';
    var jquery = gulp.src(jquery_path)
        .pipe(gulp.dest(routes.scripts.jsmin));
    var js = gulp.src(slick + 'slick.min.js')
        .pipe(gulp.dest(routes.scripts.jsmin));
    var css = gulp.src(slick + 'slick.css')
        .pipe(gulp.dest(routes.styles.css));
    return merge(js, css, jquery);
});

gulp.task('dev', ['templates', 'styles', 'fonts', 'scripts',  'images', 'slick', 'serve']);

gulp.task('build', ['templates', 'styles', 'fonts', 'scripts', 'images', 'slick']);

gulp.task('optimize', ['uncss', 'critical', 'images']);

gulp.task('deploy', ['optimize',  'gh-pages']);

gulp.task('default', function() {
    gulp.start('dev');
});
