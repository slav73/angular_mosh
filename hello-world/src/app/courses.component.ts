import { Component } from "@angular/core";
//import { CoursesService } from "./courses.service";

@Component({
  selector: "courses",
  template: `
    <h2>{{ "Titile: " + title }}</h2>

    {{ course.title }} <br />
    {{ course.students }} <br />
    {{ course.rating | number: false }} <br />
    {{ course.price | currency: "RUB":"symbol-narrow" }} <br />
    {{ course.releaseDate }} <br />
  `
})
export class CoursesComponent {
  title = "List of courses";

  course = {
    title: "The Complete Angular Course",
    rating: 4.653,
    students: 30123,
    price: 190.95,
    releaseDate: new Date(2016, 3, 1)
  };

  //   constructor(service: CoursesService) {
  //     this.courses = service.getCourses();
  //   }
}
