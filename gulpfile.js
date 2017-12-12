const gulp = require('gulp');


// 替代gulp-clean
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const useref = require('gulp-useref');

// html：压缩，src => dist
gulp.task('dist:html', ['dist:css','dist:js'], function(){
  var options = {
    removeComments: true,//清除HTML注释
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true,//压缩页面CSS
    collapseWhitespace: true,//压缩HTML
    preserveLineBreaks:true//保留换行，生产false
  };
  del(['dist/*.html']);
  return gulp
          .src('src/*.html')
          .pipe(useref())
          // .pipe(htmlmin(options))
          .pipe(gulp.dest('dist'))
})

// css：压缩，生成版本号
const csso = require('gulp-csso');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const concat = require('gulp-concat');

gulp.task('dist:css', ['lib:css'], function(){
  del(['dist/css/*.*']);
  return gulp
          .src('src/css/**/*.scss')
          .pipe(sass())
          .pipe(concat('index.css'))
          .pipe(sourcemaps.init())
          .pipe(csso())
          .pipe(autoprefixer({
            browsers: ['last 3 versions', 'not ie <= 8'],
            cascade: false
          }))
          .pipe(rev())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('dist/css'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('dist/rev/css'))
})

gulp.task('lib:css', function(){
  del(['dist/css/lib/*.css']);
  return gulp
          .src('src/css/lib/*.css')
          .pipe(concat('vendor.css'))
          .pipe(csso())
          .pipe(gulp.dest('dist/css/lib'))
})


// js
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('dist:js', ['lib:js'], function(){
  del(['dist/js/*.*']);
  return gulp
          .src('src/js/*.js')
          .pipe(concat('index.js'))
          .pipe(sourcemaps.init())
          .pipe(babel())
          .pipe(uglify())
          .pipe(rev())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('dist/js'))
          .pipe(rev.manifest())
          .pipe(gulp.dest('dist/rev/js'))
})

gulp.task('lib:js', function(){
  del(['dist/js/lib/*.js']);
  return gulp
          .src('src/js/lib/*.js')
          .pipe(concat('vendor.js'))
          .pipe(gulp.dest('dist/js/lib'))
})

//assets
gulp.task('copyAssets', function(){
  return gulp
          .src('src/assets/**/*')
          .pipe(gulp.dest('dist/assets'))
})

//html 路径替换
const revCollector = require('gulp-rev-collector');

gulp.task('rev',['dist:html'], function(){
  return gulp
          .src(['dist/rev/**/*.json', 'dist/*.html'])
          .pipe(revCollector({
            replaceReved: true
          }))
          .pipe(gulp.dest('dist'))
})

//browser-sync
const browserSync = require('browser-sync').create();

gulp.task('server', function(){
  const files = ['dist/**/*'];
  browserSync.init(files, {
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch('src/index.html', ['dist:html']);
  gulp.watch('src/css/*.scss', ['dist:css']);
  gulp.watch('src/js/*.js', ['dist:js']);
  
  gulp.watch('src/assets/**/*', ['copyAssets']);
  gulp.watch('src/css/lib/**/*', ['lib:css']);
  gulp.watch('src/js/lib/**/*', ['lib:js']);
})