import * as gulp from 'gulp'; 								// npm i @types/gulp --save-dev
import { Gulpclass, Task, SequenceTask } from 'gulpclass'; 	// npm i gulpclass --save-dev
import * as del from 'del'; 								// npm i @types/del --save-dev
import * as gts from 'gulp-typescript';						// npm i gulp-typescript --save-dev

let config = {
	src : 'src/**/*.{ts,tsx}',
	destDir: './dist',
	tempDir: './.tmp',
	tmp: './.tmp/**',
	dst: './dist/**'
};

@Gulpclass()
export class Gulpfile {

	private tsProject = gts({ jsx:"react" });

	@Task()
	clean(cb: Function) {
		console.log(`clean ${config.tmp}`);
		return del([ config.tmp, config.dst ], cb);
	}

	@Task()
	copyTmpToDest() {
		return gulp.src([ config.tmp ])
			.pipe(gulp.dest(config.destDir));
	}

	@Task()
	compile() {
		return gulp
			.src(config.src)
			.pipe(this.tsProject)
			.pipe(gulp.dest(config.tempDir));
	}

	@SequenceTask()	build() { return [ 'compile', 'copyTmpToDest' ]; }
	@SequenceTask()	rebuild() { return [ 'clean', 'build' ]; }
	
	@Task()	watch() { gulp.watch(config.src, ['compile']); }
	@Task() default() { return [ 'build' ]; }
}

