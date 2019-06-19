// 2 - Building Blocks of Angular Apps

COMPONENT encapsulates Data, HTML-template and Logic

Every application has a 'root' or 'App' component.

Another concept is 'MODULE' - is a group or container of related modules.

// 3 - Creating Components

THere are three steps to follow if you want to use a component

- Create a component
- Register it in a module
- Add an element in an HTML markup


hello-world $ng serve

In 'src/app' we add a component to display a list of courses:

$touch src/app/courses.component.ts

If we want multiple words in the name, we separate them by a dash: 'course-form.component.ts'

In this component file we first need to import 'decorator':

====
import { Component } from '@angular/core';
====

***********
Auto-Import PLUGIN - by 'steoates'
***********

To apply this decorator to a class, we use the following syntax:

======
@Component({
    selector: 'courses',
    template: '<h2>Courses</h2>'
})
export class CoursesComponent{}
=====

The next step - is to register this component in a module

In the start we got only one module = 'app.module.ts' This class is decorated with another
decorator - '@NgModule'. With this one we convert the plain TS-class into a module in Angular point of view.

Let's focus on the first property:

====
@NgModule({
    declarations: [
      AppComponent
    ],
=====

Here we add all the components that are parts of this module.

By default, when we generate an application, it has one component called 'AppComponent'.

Let's add just another component:

====
declarations: [AppComponent, CoursesComponent],
====

Now the third step:

"selector: 'courses'" means that anywhere Angular meets element with this selector, it will render
the template for this selector inside that element.

Like example, we go to 'app.component.html' - over there is the homepage for our server.

Replace the html with

=====
<h1>ANGULAR</h1>
<courses></courses>
=====

Thus the contents will appear on home page.

In 'index.html' there is '<app-root></app-root>', that wraps up all the components.

// 4 -  Creating Components Using Angular CLI

$ng g c course 

creates four files in the '/src/app/course' directory: '.css', '.html', '.spec.ts', '.ts'

It will automatically add the needed dependencies

In 'course.component.ts' it automatically imports an 'OnInit' - we'll talk about it later.

// 5 - Templates

In Angular, to render dynamically some data, we use double curly braces:

=====
import { Component } from "@angular/core";

@Component({
  selector: "courses",
  template: "<h2>{{ `"Titile: " + title + getTitle()` }}</h2>"
})
export class CoursesComponent {
  title = "List of Courses";

  getTitle() {
    return this.title;
  }
}
=====

We can show as single variables, and strings or functions as well. THis is called "string interpolation".

// 6 - Directives

Using backticks ('gravises'), we can break our template message into multiple lines.

"Directives" can be used to manipulate the DOM - add, or remove, or change existing DOM-element.

The syntax is like this: *ngFor="let course of courses":

=====
@Component({
    selector: "courses",
    template: `
      <h2>{{ "Titile: " + title }}</h2>
      <ul>
        <li *ngFor="let course of courses">
          {{ course }}
        </li>
      </ul>
    `
  })
  export class CoursesComponent {
    title = "List of Courses";
  
    courses = ["course1", "course2", "course3"];
  }
=====

// 7 - Services

To make HTTP-requests reusable in multiple components, we use 'services' in Angular.

Create a file 'courses.service.ts':

=====
export class CoursesService {
    getCourses() {
      return ["course1", "course2", "course3"];
    }
  }
=====

// 8 - Dependency Injection

сперва делаем конструктор:

=====
constructor(service: CoursesService) {
  this.courses = service.getCourses();
}
=====

A concept of "Dependency Injection" lies in that we create a single object and then inject
it into all the pieces of our code, where this object is needed. This single object is called
'singleton'.

// 9 - Generating Services Using Angular CLI

********
CTRL + BackTick launches the terminal window
********

$ng g s email

This command generates new service 'email' - creates two files

CREATE src/app/email.service.spec.ts (328 bytes)
CREATE src/app/email.service.ts (134 bytes)

email.service.ts - the 'service' file itself, and 'email.ervice.spec.ts' - the boilerplate 
for tests

******
Понятие boilerplate code или boilerplate относится к секциям кода, 
которые должны быть написаны во многих местах с минимальными изменениями
******

In the 'email.service.ts' file we find:

======
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
}
======

What is this new 'Injectable' and why do we need it here?

Because if we use in its conctructor some other services (for instance: 'constructor(logService: LogService)') -
Angular will know that this service is 'injectable'. Why we didn't use it while creating a component?
Because it's already included there.

// 10 Exercise - Authors

// 11 - Solution

$ng g c authors

CMD + P : authors.component.ts

$ng g s authors

'authors.service.ts':

======
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  return ['author1', 'author2', 'author3'];
}
=====

'authors.component.ts':

======


'src/app/authors/authors.component.html':

=====
<h1>{{ authors.length }} Authors:</h1>

<ul>
  <li *ngFor="let author of authors">
    {{ author }}
  </li>
</ul>
=====

