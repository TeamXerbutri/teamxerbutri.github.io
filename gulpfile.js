const gulp = require('gulp');
const browserSync = require('browser-sync');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var cleanCSS = require('gulp-clean-css');
//const del = (...args) => import('del').then(({default: del})=> del(...args));
const del = require('delete');
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// configuration
const paths = {
  styles: {
    src: 'src/styles/*.css',
    dest: 'dist/assets/css/'
  },
  scripts: {
    src: 'src/scripts/*.js',
    dest: 'dist/assets/js/'
  },
  html: {
    src: ['./src/*.html'],
    dest: './dist/',
  },
  images: {
    src: ['./src/images/**/*'],
    dest: './dist/content/images/',
  },
  data: {
    src: ['./src/data/**/*'],
    dest: './dist/data/',
  },
};

// Shared variables
const server = browserSync.create();

/* Cleans the dist folder */
function clean() {
  return del(['dist/*/']);
}

/* Copies the HMTL */
function copyHtml() {
  return src(paths.html.src).pipe(dest(paths.html.dest));
}

/* Copies the data */
function copyData() {
  return src(paths.data.src).pipe(dest(paths.data.dest));
}

/* Reloads the server */
function reload(done) {
  server.reload();
  done();
}

/* Initializes the server */
function serve(done) {
  server.init({
    server: {
      baseDir: './src'
    }
  });
  done();
}


// expose the default task
//const dev = gulp.series(serve);
exports.default = gulp.series(clean, serve);
