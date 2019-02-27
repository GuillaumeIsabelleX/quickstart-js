var appGoalName = "Mastery Firebase Structhor App";

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'), // image optimization
	notify = require("gulp-notify"),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	minify = require('gulp-minify'),
	run = require('gulp-run');
	
	
//@feature --task-list to get the task list

var taskListing = require('gulp-task-listing');
 
// Add a task to render the output
gulp.task('help', taskListing);
gulp.task('help-more', taskListing.withFilters(/:/));
/* //@feature Classify Help into subtask 
//@a Try it
gulp.task('help', taskListing.withFilters(function(task) {
	isSubTask = // test task name for sub task properties
    return isSubTask;
}));
*/


//@a ###############################################
//@v 				When changes, The App is Automatically Deployed
//@a ###############################################


const { parallel } = require('gulp');






var debug = false;
var ignorecommittag = "8dba672ac2714e4c9e8675d3c2399e58";


var notify = require("gulp-notify");












// const { src, dest, parallel } = require('gulp');
// var gulp = require('gulp');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// var log = require('fancy-log');
// log(appGoalName + " Started");

var util = require("gulp-util");
util.log(appGoalName + " Started");


// require('require-dir')('./gulp');


// // Require dependencies
//@v BUMP the NPM Version before Deploying
var bump = require('gulp-bump');
// var filter = require('gulp-filter');
//@v COMMIT the work when Deploying
// var git = require('gulp-git');
// var shell = require('gulp-shell');
//@v TAG the committed work when Deploying
// var tagversion = require('gulp-tag-version');

var tlid = require('tlid');


var fs = require('fs');
var path = require('path'),
	merge = require('merge-stream');


var watch = require('gulp-watch');



var
	filter = require('gulp-filter'),
	git = require('gulp-git'),
	shell = require('gulp-shell'),
	tagversion = require('gulp-tag-version');





var packConf = require(path.join(process.cwd(), "package.json"));


var rootBase = process.cwd();





gulp.task('test-gulp', function () {

	console.log(`Gulp works...`);

});

var wait = require('gulp-wait');









var watchSources = [rootBase + '/**', rootBase + '/*', rootBase + '/**/*.html', rootBase + '/**/*'];


var inAction = 0;



gulp.task('watch-deploy', function () {
	// watch many files
	console.log("An attempt to watch and deploy firebase that is not working");

	watch(watchSources, function () {

		wait(111);
		if (!inAction == 0) wait(2222);

		if (inAction == 0) {
			inAction++;

			//  console.log("waiting before releasing...");
			wait(444);
			if (inAction == 1) {
				//
				console.log("-----------------------------------");
				console.log(appGoalName + " is releasing ");

				var msgCompleted = appGoalName + '\t  Distributed!';


				//  .pipe(git.add());
				var r = gulp.src('./package.json')

					// commit changes
					.pipe(shell([
						'firebase deploy '
					]))

					.on('end', function () { util.log(msgCompleted); })



					.pipe(gulp.dest('logs'))
					.pipe(notify(appGoalName + " - Deployment Completed"))

					;

				inAction = 0;

				return r;
			}
		} else {
			console.log("--------- SKIPPED, already in Action....");
			return null;
		}


	});
});

//######################################
//@v Deploy an Angular App on Firebase 190225
//@a Gulp that dist in here ./ngapp
var ngapp_dist_source = "w://x/ngapp190223b/dist/ngapp190223b";
var ngapp_dist_target = "./ngapp";
gulp.task('sync-ngapp', function () {
	console.log(`//@a Sync the distribution of the NGApp190223b :  Path: ${ngapp_dist_source} in order to deploy it on Firebase
	`);
	return gulp.src(ngapp_dist_source + "/**")
		.pipe(gulp.dest(ngapp_dist_target));
});





var pl_public_root = "h://x/_pl_dist/workdir2/public";

var pl_sources = [pl_public_root + "/**"
	//,"!" + pl_public_root + ".svn/**"

];


gulp.task('deploy-firebase', function () {
	console.log(`//@a Deploy all to firebase `);
	return gulp.src('./package.json')

		// commit changes
		.pipe(shell([
			'firebase deploy '
		]));

});

//@a Puts the public dir in the dist
gulp.task('sync-pl', function () {
	console.log(`//@a Sync the PatternLab distribution  :  Path: ${pl_public_root} in order to deploy it on Firebase at /pl/index.html
	`);
	return gulp.src(pl_public_root + "/**")
		//(["public/**",'!.svn/**','!*/.svn/**']) //@bug Combine with BUILD??

		.pipe(gulp.dest("pl/"));
});

//@result Path in the App will be compatible
gulp.task('sync-pl-js-path-compatible', function () {
	console.log(`//@issue Fix the PatternLab distribution  :  Path: ${pl_public_root} in order to deploy it on Firebase and keep JS Path compatible
	`);
	return gulp.src("./pl/js/**").pipe(gulp.dest("./js/"));
});
gulp.task('sync-pl-css-path-compatible', function () {
	console.log(`//@issue Fix the PatternLab distribution  :  Path: ${pl_public_root} in order to deploy it on Firebase and keep CSS Path compatible
	`);
	return gulp.src("./pl/css/**").pipe(gulp.dest("./css/"));
});
gulp.task('sync-pl-images-path-compatible', function () {
	console.log(`//@issue Fix the PatternLab distribution  :  Path: ${pl_public_root} in order to deploy it on Firebase and keep images Path compatible
	`);
	return gulp.src("./pl/images/**").pipe(gulp.dest("./images/"));
});



gulp.task('sync-pl-compatibility',
	gulp.series('sync-pl-js-path-compatible', 'sync-pl-css-path-compatible', 'sync-pl-images-path-compatible')
);

gulp.task('sync-all', gulp.series('sync-pl', 'sync-pl-compatibility', 'sync-ngapp'));

gulp.task('deploy-all', gulp.series('sync-pl-compatibility', 'deploy-firebase'));

gulp.task('deploy', gulp.series('deploy-firebase'));

gulp.task('clean-pl', function () {

	console.log("Cleaning PL: ");
	return gulp.src("./pl/", { read: false, allowEmpty: true, force: true })

		.pipe(clean());
});

