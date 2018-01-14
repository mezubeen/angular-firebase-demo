import { Component, OnDestroy } from '@angular/core';
import {AngularFireDatabase,AngularFireList  } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
//  implements OnDestroy
 {
   //$ defines an observable
// annotating with AngularFireList type so intellisense will work
courses$;
  courses1$: AngularFireList<any[]>;
  course$;
  author$;

  // or

  // courses: any[];
  // subscription: Subscription;


  // add private keyword to access db in below methods
  constructor(private db: AngularFireDatabase){



    this.courses$ = db.list("/courses").valueChanges();

    // or


  // this.subscription =  db.list('/courses').valueChanges()
  //     .subscribe(courses => {
  //       this.courses = courses;
  //       console.log(this.courses);
  //     })

    // READING A SINGLE OBJECT
    this.course$ = db.object("/courses/1").valueChanges();

    this.author$ = db.object("/authors/1").valueChanges();
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }



    add(course: HTMLInputElement){
          // assigning courses to the db object globally so we can push data in it from add() method
    this.courses1$ = this.db.list("/courses");

      //pushing the data in the all courses object
      this.courses1$.push(course.value);
      course.value = '';

      //or pass an complex object

      // this.courses1$.push({
      //   name: course.value,
      //   price: 150,
      //   isLive: true,
      //   sections: [
      //     { title1: 'ggd'},
      //     { title2: 'ggh'},
      //     { title3: 'ggf'},
      //   ]
      // });
      // course.value = '';
    }

    update(course){

      this.db.object("/courses/" +course.$key)
        .set({
          title: 'new title',
          isLive: true
        });

    }

}
