// 01 - Intro

Directives:

- ngIf
- ngFor
- ngSwitchCase
- ngClass
- ngStyle
- Building custom directives

// 2 - ngIf

Sometimes we want to show some contents based on some condition.

We use directives to modify the DOM:

- STRUCTURAL directives modify the structure of the DOM, adding or removing elements
- ATTRIBUTE directives modify the attributes of DOM elements

Say, we have an array in 'app.ts':

=====
export class AppComponent {
    courses = [1, 2];
  }
=====

and we want to display some block in 'app.html' depending on how many courses we have,
in Angular2 we write:

=====
<div *ngIf="courses.length > 0">
  List of Courses
</div>
<div *ngIf="courses.length == 0">
  No courses yet
</div>
=====

Thus in the DOM-tree we'll have only one DOM-element, displayed based on the condition.

In Angular4 we have another directive, that lets us not to repeat 'if' statement twice -
something like 'else'.

To apply this, we first need to replace second 'div' with 'ng-template' and apply to it 
an identifier ('#noCourses'). Then we modify our 'ngIf' statement:

=====
<div *ngIf="courses.length > 0; else noCourses">
  List of Courses
</div>
<ng-template #noCourses>
  No courses yet
</ng-template>
=====

But even a blind can see that this approach is a kind of inconsistent - in first div we
declare both if and else, and the second div is named not a 'div', but 'ng-template' - 
some shitty pattern, yeah?

Luckily there is another approach. We can declare two templates for one div and use them
based on the condition specified in that div. We also have to specify what template to use
when (th constructin of then coursesList; else noCourses)

=====
<div *ngIf="courses.length > 0; then coursesList; else noCourses"></div>
<ng-template #coursesList>
  List of Courses
</ng-template>
<ng-template #noCourses>
  No courses yet
</ng-template>
=====

Much better, ain't it?

// 3 - Hidden Property

Another way to show or hide a part of a page - using 'hidden' attribute.
It exists in DOM object as well as in HTML attributes
====
<div [hidden]="courses.length == 0">
  List of Courses
</div>
<div [hidden]="courses.length > 0">
  No courses yet
</div>
===

But note that both divs are in the DOM-tree, though one of them is hidden. That's the main difference with
using 'ngIf' condition - it removes unused element from the DOM.

Which approach is better, you ask?

If you're working with a large DOM-tree with lots of elements, then it's preferrable to use 'ngIf'. You don't want
to put extra elements into the DOM and waste computer memory and resources. But if you want to change some elements
'on the fly', then you may think about leaving unused elements in the tree to switch to them without reloading
all the DOM.

// 4 - ngSwitchCase

With dzen-coding we can create html-markup:

ul.nav.nav-pills
TAB
<ul class="nav nav-pills"></ul>

Then in UL we print
(li>a)*2

TAB - and voila:


<ul class="nav nav-pills">
  <li><a href=""></a></li>
  <li><a href=""></a></li>
</ul>

The complete mark-up:

====
<ul class="nav nav-pills">
  <li [class.active]="viewMode == 'map'">
    <a (click)="viewMode = 'map'">Map View</a>
  </li>
  <li [class.active]="viewMode == 'list'">
    <a (click)="viewMode = 'list'">List View</a>
  </li>
</ul>

<div [ngSwitch]="viewMode">
  <div *ngSwitchCase="'map'">Map View Content</div>
  <div *ngSwitchCase="'list'">List View Content</div>
  <div *ngSwitchDefault>Otherwise</div>
</div>
=====

And in 'app.ts':

====
export class AppComponent {
    viewMode = "map";
  }
====

***********
Asterisk (*ngSwitchCase) is used when we're supposed to change the DOM-tree - add or remove some elements.
***********

// 5 - ngFor

app.ts:
=====
export class AppComponent {
    courses = [
      { id: 1, name: "course1" },
      { id: 2, name: "course2" },
      { id: 3, name: "course3" }
    ];
  }
=====

app.html:

====
<ul>
<li *ngFor="let course of courses">
  {{ course.name }}
</li>
</ul>
======

This ngFor can bring a lot of possibilities.

Say, we need to display indexes of courses. No problemma:

====
<li *ngFor="let course of courses; index as i">
{{ i }} = {{ course.name }}
====

In fact, there is a list of exported values, and 'index' is only one of them:

index: number: The index of the current item in the iterable.
first: boolean: True when the item is the first item in the iterable.
last: boolean: True when the item is the last item in the iterable.
even: boolean: True when the item has an even index in the iterable.
odd: boolean: True when the item has an odd index in the iterable.

// 6 - ngFor and Change Detection

ngFor can react to changes in the component.

Lets create a button to add a new course:

===
<button (click)="onAdd()">Add</button>
===

And in the 'app.ts' lets define a new method:

====
onAdd() {
    this.courses.push({ id: 4, name: "course4"});
}
====

By clicking a button, we can add a new course.

In Angular after each action (clicking a button is one of them) the 'change detection' is performed -
in our case '*ngFor' for the list of courses. It re-renders the component and re-writes the DOM

Similarly we can add a button near each course to remove it:

====
<ul>
  <li *ngFor="let course of courses; index as i">
    {{ i }} = {{ course.name }}
    <button (click)="onRemove(course)">Remove</button>
  </li>
</ul>
=====

====
onRemove(course) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }
=====

We can even change the contents of the element:

====
<ul>
  <li *ngFor="let course of courses; index as i">
    {{ i }} = {{ course.name }}
    <button (click)="onChange(course)">Change</button>
  </li>
</ul>
=====

====
onChange(course) {
  course.name = "Changed";
}
=====

// 7 - ngFor and TrackBy

Lets simulate getting courses from server:

====
<button (click)="loadCourses()">Load COurses</button>
====

====
courses;

loadCourses() {
  this.courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
  ];
}
=====

Angular by default tracks objects by their identity, which means the reference of that
object in the memory. If you re-download the course, it will have different address in the memory
and Angular will have to re-construct the part of the DOM-tree that contains this object.

We can instruct Angular to track objects not by their IDs (or reference in the memory),  
but with our custom method:

====
<li *ngFor="let course of courses; trackBy: trackCourse">
====

Pay attention that we don't calling this method, we simply add it as a reference.

Back in our app.ts let's implement this method:

====
trackCourse(index, course) {
    return course ? course.id : undefined;
  }
=====

We simply tell Ang to track courses by their course.id - and it will not re-construct the DOM-tree
after once rendering the courses info.

The lesson: if you have a simple list, don't worry about TrackBy feature - Angular copes with lists
well out of the box. But if you have large lists on the page, and you observe performance problems
on a given page - then think about tracking list objects by their actual IDs.

// 8 - The Leading Asterisk

Asterisk in '*ngIf' tells Angular to re-write DOM-element using an ng-template element.
Angular will create a <ng-template></ng-template> construction and put the content inside of it -
based on the condition in 'ngIf' statement.

// 9 - ngClass

Earlier we used this construct:

=====
<span
  class="glyphicon" 
  [class.glyphicon-star]="isSelected"
  [class.glyphicon-star-empty]="!isSelected"
  (click)="onClick()"
></span>
=====

But there is another way to deal with multiple classes. Instead of declaring each class separately,
we can describe them in one array-object:

=====
[ngClass]="{
    'glyphicon-star': isSelected,
    'glyphicon-star-empty': !isSelected
  }"
=====

So this 'ngClass' is an 'Attribute Directive' - we can use it to directly modify
attributes of DOM-lelements.

Also note that we have to place names of attributes in single-quotes - otherwise
it won't work

// 10 - ngStyle

app.ts:

====
canSave = true;
====

And in app.html let's create a button:

=====
<button
  [style.backgroundColor]="canSave ? 'blue' : 'gray'"
  [style.color]="canSave ? 'white' : 'black'"
  [style.fontWeight]="canSave ? 'bold' : 'normal'"
>
  Save
</button>
=====

But this implementation is a little bit noisy. We can do it another way, similar to 'ngClass' binding:

=====
<button
  [ngStyle]="{
    backgroundColor: canSave ? 'blue' : 'gray',
    color: canSave ? 'white' : 'black',
    fontWeight: canSave ? 'bold' : 'normal'
  }"
>
  Save
</button>
=====

// 11 - Safe Traversal Operator

In app.ts create an object:

=====
task = {
    title: "Review Applications",
    assignee: {
      name: 'John Smith'
    }
  }
 =====
 
 In app.html we use interpolation to view 

 ===
 <span>{{ task.assignee.name }}</span>
=====

Sometimes, when you try to get data from the server, it could return null or undefined.
If we change name: null , our app will break 

assignee: null

ERROR TypeError: Cannot read property 'name' of null

To solve this, we can 

<span *ngIf="task.assignee">{{ task.assignee.name }}</span>

OR:

<span >{{ task.assignee?.name }}</span>

Question mark tells Ang not to render 'name' field if it's null or doesn't exist.
This '?' is called 'Safe Traversal Operator'

// 12 - Creating Custom Directives

There are times when you want to control the behavior of DOM-elements (for ex. - to format in US-standard
the phone number user types in the field)

We can create our directive from the scratch or use built-in Angular directive boilerplate, using Angular-CLI:

$ng g d input-format

This will create two files, and one of them is 'input-format.directive.ts'

In our 'app.module.ts' we can see 'InputFormatDirective'

'input-format.directive.ts' is very similar to the 'component.ts':

====
@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  constructor() { }

}
=====

Here we want to handle two DOM-events - 'focus' and 'blur'

First we import 'HostListener':

=====
import { Directive, HostListener } from '@angular/core';
=====
THis HostListener lets us listen to events in DOM-elements

Then we declare two event-handlers, decorating them with 'HostListener' decorator:

=====
export class InputFormatDirective {
  @HostListener("focus") onFocus() {
    console.log("on Focus");
  }

  @HostListener("blur") onBlur() {
    console.log("on Blur");
  }
  constructor() {}
}
=====

Lets create some logic to apply 'to lower case' action when user leaves the input field (we don't need 'onFocus' for that):

In constructor we need to inject an element reference object:

====
constructor(private el:ElementRef) {}
====

This gives us access to DOM-object (ElementRef should also be imported into the file)

As best practice, we must put our constructor before all our methods.

Then in the 'onBlur()' we need to read the value of this input field:

=====
let value: string = this.el.nativeElement.value;
this.el.nativeElement.value = value.toLowerCase();
=====

Now if we want to choose how to format the input string, we need to specify it 
in our app.html:

====
<input type="text" appInputFormat [format]="'uppercase'"/>
====

And  then import 'Input' from @angular/core:

====
import { Directive, HostListener, ElementRef, Input } from "@angular/core";
====

Thus we can add some logic:

=====
export class InputFormatDirective {
  @Input("format") format;

  constructor(private el: ElementRef) {}

  @HostListener("blur") onBlur() {
    let value: string = this.el.nativeElement.value;

    if (this.format == "lowercase")
      this.el.nativeElement.value = value.toLowerCase();
    else this.el.nativeElement.value = value.toUpperCase();
  }
}
=====

That's good. But how can we implement binding directly to 'appInputFormat'?

=====
<input type="text" [appInputFormat]="'uppercase'"/>
=====

Very easy! We simply change the alias from 'format' to 'appInputFormat':

====
@Directive({
  selector: "[appInputFormat]"
})
export class InputFormatDirective {
  @Input("appInputFormat") format;

  constructor(private el: ElementRef) {}

  @HostListener("blur") onBlur() {
    let value: string = this.el.nativeElement.value;

    if (this.format == "lowercase")
      this.el.nativeElement.value = value.toLowerCase();
    else this.el.nativeElement.value = value.toUpperCase();
  }
}
====

And that's the end of this story!

Here is the lesson:
You can use custom directives to have more control over behavior of DOM-elements
We can pass our directives using 'Input' properties, and if you have only one
property, you can use selector of that directive as an alias for that property 
that simplifies the using of that custom directive
Finally, you can use the 'HostListener' decorator to subscribe to events
raised by that host object


// 13 - Exercise - Zippy

Doofer

// 14 - Solution - Zippy

$ng g c zippy

app.html:

====
<app-zippy title="Shipping Details">Shipping Details Content</app-zippy>
====

zippy.ts:

===
export class ZippyComponent  {
  @Input('title') title: string; 

}
===

zippy.html:

div.zippy>div.heading+div.body

then we got a mark-up and add interpolation of 'title' and 'ng-content':

<div class="zippy">
  <div class="heading">
    {{ title }}
  </div>
  <div class="body">
    <ng-content></ng-content>
  </div>
</div>

Now we apply some styles to 'zippy' component:
zippy.css:

=====
.zippy {
  border: 1px solid #ccc;
  border-radius: 2px;
}

.zippy-heading {
  font-weight: bold;
  padding: 20px;
  cursor: pointer;
}

.zippy-body {
  padding: 20px;
}

.expanded {
  background: #f0f0f0;
}
=====

And in zippy.html:

=====
<div class="zippy">
  <div class="zippy-heading" [class.expanded]="isExpanded">
    {{ title }}
  </div>
  <div class="zippy-body">
    <ng-content></ng-content>
  </div>
</div>
=====

In zippy.ts set isExpanded to 'true'

====
export class ZippyComponent {
  @Input("title") title: string;
  isExpanded: boolean = true;
}
=====

now both panels are displayed, title in gray

Next step - to set panels to collapsing behavior:

in zippy.html bind (click) to a method (onClick):

====
(click)="onClick()"
====

and 

=====
<div class="zippy">
  <div class="zippy-heading" [class.expanded]="isExpanded" (click)="onClick()">
    {{ title }}
  </div>
  <div *ngIf="isExpanded" class="zippy-body">
    <ng-content></ng-content>
  </div>
</div>
=====

We surely need to make an onClick() method, simply toggling 'isExpanded':

=====
onClick() {
  this.isExpanded = !this.isExpanded;
}
=====

The better name for 'onClick()' method is 'toggle()'

The last step is to add a glyph icon, right after the {{ title }}:

=====
<div class="zippy-heading" [class.expanded]="isExpanded" (click)="toggle()">
    {{ title }}
    <span
      class="glyphicon"
      [ngClass]="{
        'glyphicon-chevron-up': isExpanded,
        'glyphicon-chevron-down': !isExpanded
      }"
    ></span>
  </div>
=====

And to place this chevron to the right side:

====
.glyphicon {
  float: right;
}
=====

