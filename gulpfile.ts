import * as gulp from 'gulp';
import { Gulpclass, Task, SequenceTask } from 'gulpclass';
import * as del from 'del';
import * as ts from 'gulp-typescript'


@Gulpclass()
export class Gulpfile {

	
	constructor(){

	}
	

    @Task()
    clean(cb: Function) {
        return del(['./dist/**'], cb);
    }
 
    @Task()
    copyFiles() {
        return gulp.src(['./README.md'])
            .pipe(gulp.dest('./dist'));
    }
 
    @Task('copy-source-files') // you can specify custom task name if you need 
    copySourceFiles() {
        return gulp.src(['./src/**.js'])
            .pipe(gulp.dest('./dist/src'));
    }
	
	@Task()
	compile() {
		let tsProject : ts.Project = ts.createProject("./tsconfig.json");

		// return gulp
		// 	.src('src/**/*.ts')
        // 	.pipe(ts(tsProject}))
        // 	.pipe(gulp.dest('.tmp'));

		return tsProject.src()
			.pipe(ts(tsProject));
	}

    @SequenceTask() // this special annotation using "run-sequence" module to run returned tasks in sequence 
    build() {
        return ['compile'];
    }
 
    @Task()
    default() { // because this task has "default" name it will be run as default gulp task 
        return ['build'];
    }

}

