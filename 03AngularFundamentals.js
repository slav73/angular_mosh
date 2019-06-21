// 2 - Building Blocks of Angular Apps

COMPONENT encapsulates Data, HTML-template and Logic or a View

Every application has a 'root' or 'App' component.

Another concept is 'MODULE' - is a group or container of related components.

// 3 - Creating Components

THere are three steps to follow if you want to use a component

- Create a component
- Register it in a module
- Add an element in an HTML markup


hello-world $ng serve

In 'src/app' we add a component to display a list of courses:

$touch src/app/courses.component.ts

export class CoursesComponent {}

If we want multiple words in the name, we separate them by a dash: 'course-form.component.ts'

In this component file we first need to import 'decorator' - other way Angular don't understand
this is a component:

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

=====
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
=====

Let's focus on the first property, 'declarations'. 
It contains all the registered modules
By default, after creating a project, it has only one component, 
'AppComponent':

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
declarations: [
  AppComponent, 
  CoursesComponent
],
====

And we need to import this component:

import { CoursesComponent } from "./courses.component";

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

Data binding - we bind the view to a field of this component

In double curly braces we can put not only vars, but any piece of JS code
template: "<h2>{{ 'Title: ' + title}}</h2>"

We can call functions inside templates as well:
template: "<h2>{{ getTitle() }}</h2>"

getTitle() {
  return this.title;
}

THis special syntax here {{ getTitle() }} is called "string interpolation".

// 6 - Directives

Lets display the list of courses
courses = ["course1", "course2", "course3"];

Using backticks ('gravises'), we can break our template message into multiple lines.

"Directives" can be used to manipulate the DOM - add, or remove, or change existing DOM-element.

The syntax is like this: <li *ngFor="let course of courses":> {{ course }}</li>

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

Why it's not a good idea to describe a logic of connecting an HTTP-server in a component?

1. It's hard to test - when we run unit tests, we'll need to create a fake server
2. Data received from a server could be needed somewhere else - why fetch them more than once?
3. And the main reason - component should be responsible only for view implementation

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

First we need a constructor where we create an instanse of 
a 'courses' service and get access to our courses:

=====
constructor() {
  let service = new CoursesService;
  this.courses = service.getCourses();

}
=====

Now we can see the list of courses on our page

But still there are problems with this implementation:

- by using this 'new' operator here we tightly coupled the 'courses' component
with the 'courses' service.  This is exactly like a problem we got earlier - 
if we implemented the logic for consuming an HTTP service inside this component,
we wouldn't be able to unit test this class! 

Now we put this logic in a different class ('CoursesService'), but because we
directly created an instance of this class here - we're still tightly coupled
with that implementation.

- the other issue here is that if in the future we decided to add a parameter
to a constructor of the 'CoursesService', we need to go here and anywhere 
in our app where we used the 'CoursesService' and add it manually
Every time we change the constructor of our Service, we end up with multiple
changes in our code. 

All this is very fragile.

What should we do?

Instead of recreating an instance of 'CoursesService', we ask Angular to do
that for us.

We delete the 'new' operator and add a parameter to arguments of our constructor:

======
constructor(service: CoursesService) {
  this.courses = service.getCourses();
}
=====

When Angular is going to create an instance of our component, it looks at this
constructor, it sees that this constructor has a dependency.
This dependency is of type 'CoursesService'.
So first it creates an instance of 'CoursesService' and then passes it
to this constructor

Now with this implementation if we change the constructor of 'CoursesService'
and add a new parameter - we don't have to modify a hundred places in our code
to reflect the change. Angular will automatically instantiate 
a new object 'CoursesService'!

The second benefit of this implementation is when we're going to unit test
this 'Courses' component, instead of supplying the actual 'CoursesService'
to this constructor, we can create a fake implementation of this service -
that doesn't use HTTP-service on the back-end. 

In other words - we have decoupled the 'Courses' component from 
the 'CoursesService'

So here is the lesson:
When we use the 'new' operator like this 'new CoursesService()'
inside a class, you tightly couple this class to that implementation -
you cannot change this at run-time. 
But when you add the dependency 'constructor(service: CoursesService)' -
you have decoupled this class from that dependency

But we're not done yet.

We need to instruct Angular to create an instance of 'CoursesService'
and pass it to our 'Courses' component. 

This concept is called 'dependency injection' - so we need to instruct
Anguar to inject dependencies of 'Courses' component inside its
constructor.

A 25-dollar term for a 5-cent concept:
The 'dependency injection' means that we injecting, or providing
dependencies of our class into its constructor

Angular has a dependency injection framework built into it.

So when it's going to create an instance of a component, 
it can inject the dependencies.

But in order for that to work, we need to register these dependencies
somewhere in our module.

In our main module 'App.module.ts', inside @NgModule decorator
within the 'providers' array we need to register all the dependencies
the components of this project are dependent upon

=====
@NgModule({
  declarations: [AppComponent, CoursesComponent, CourseComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [CoursesService],
  bootstrap: [AppComponent]
})
======

When we register a dependency as a provider in a module, Angular will
create a single instance of that class for that entire module. 
So imagine in this module we have a hundred components, and fifty
of them do need 'CoursesService'.

In the memory we have the only instance of 'CoursesService' and 
Angular will pass this instance to all components. 
This is what we call the 'singleton pattern' - the single instance
of an object exists in memory.

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

Along with the main heading - include the subheader which includes the number of authors

And below that should be a list of authors using ul and li

So use Angilar CLI, generate a component and a service, wright all the necessary code
and render a view like this

// 11 - Solution

$ng g c authors

********
CMD + P : authors.component.ts
********

$ng g s authors

But I created component 'authors' manually in the root folder:

$touch authors.component.ts

'authors.service.ts':

======
export class AuthorsService {
  getAuthors() {
    return ["author1", "author2", "author3"];
  }
}
=====

'authors.component.ts':

======
import { Component } from "@angular/core";
import { AuthorsService } from "./authors.service";

@Component({
  selector: "authors",
  template: `
    <h2>{{ "Authors: " + title }}</h2>
    <ul>
      <li *ngFor="let author of authors">{{ author }}</li>
    </ul>
  `
})
export class AuthorsComponent {
  title = "List of Authors";
  authors;

  constructor(authors: AuthorsService) {
    this.authors = authors.getAuthors();
  }
}
========

Template:

=====
@Component({
  selector: "authors",
  template: `
    <h2>{{ authors.length + " Authors:" }}</h2>
    <ul>
      <li *ngFor="let author of authors">{{ author }}</li>
    </ul>
  `
})
====
