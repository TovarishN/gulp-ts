import * as gulp from 'gulp'; 								// npm i @types/gulp --save-dev
import { Gulpclass, Task, SequenceTask } from 'gulpclass'; 	// npm i gulpclass --save-dev
import * as del from 'del'; 								// npm i @types/del --save-dev
import * as gts from 'gulp-typescript';						// npm i gulp-typescript --save-dev

@Gulpclass()
export class Gulpfile {

	@Task()
	clean(cb: Function) {
		return del([ './.tmp/**' ], cb);
	}

	@Task()
	copyFiles() {
		return gulp.src([ './README.md' ])
			.pipe(gulp.dest('./dist'));
	}

	@Task()
	compile() {
		//let proj = gts.createProject('./tsconfig.json')
		return gulp
			.src('src/**/*.{ts,tsx}')
			.pipe(gts( { jsx:"react" } ))
			.pipe(gulp.dest('.tmp'));
	}

	@SequenceTask()
	// this special annotation using "run-sequence" module to run returned tasks in sequence
	build() { return [ 'compile' ]; }

	@Task()
	// because this task has "default" name it will be run as default gulp task
	default() { return [ 'build' ]; }
}

