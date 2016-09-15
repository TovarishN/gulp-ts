import * as gulp from 'gulp';
import { Gulpclass, Task, SequenceTask } from 'gulpclass';
import * as del from 'del';
import * as gts from 'gulp-typescript';

declare module "gulp-typescript" {
	interface CompileStream extends NodeJS.ReadWriteStream { } // Either gulp or gulp-typescript has some odd typings which don't reflect reality, making this required
}

@Gulpclass()
export class Gulpfile {

	@Task()
	clean(cb: Function) {
		return del([ './dist/**' ], cb);
	}

	@Task()
	copyFiles() {
		return gulp.src([ './README.md' ])
			.pipe(gulp.dest('./dist'));
	}

	@Task()
	compile() {
		let proj = gts.createProject('./tsconfig.json')
		return gulp
			.src('src/**/*.{ts,tsx}')
			.pipe(gts(proj))
			.pipe(gulp.dest('.tmp'));
	}

	@SequenceTask()
	// this special annotation using "run-sequence" module to run returned tasks in sequence
	build() { return [ 'compile' ]; }

	@Task()
	// because this task has "default" name it will be run as default gulp task
	default() { return [ 'build' ]; }
}

