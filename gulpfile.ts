import * as gulp from 'gulp';
import { Gulpclass, Task } from 'gulpclass';

@Gulpclass()
export class Gulpfile {
	@Task()
	build()	{
		console.log("build start");
	}
}

