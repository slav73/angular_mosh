// 1 - Intro

In this section:

- Display data
- Apply classes/styles dynamically
- Format data using pipes
- Handle events

// 2 - Property Binding

Earlier we looked at 'interpolation' - double curly braces to display 
our code

<img src="{{ imgUrl }}" />

But this interpolation - is just a syntactical sugar

Behind the scene Angular translates these interpolations into what we call

Property Binding

With property binding we bind a DOM-element ('src') to a field or a property
in our component

Syntax for property binding

<img [src]="imgUrl" />

Note that this is a one-way binding - from Component to DOM, 
ie when the 'src' value changes,
Angular will update it's displayed value in the DOM
But when the 'imgUrl' will be changed in the DOM, Angular won't be
able to change the 'src' value

There is a two-way binding, but that's the topic for future lection

In decorator:

====
<img [src]="imageUrl" />
====

In class:

=====
imageUrl = "http://lorempixel.com/400/200";
=====

String interpolation VS property binding

It's preferrable to use string interpolation when we deal with text 
(strings, paragraphs, divs, headings ets)

<h2>{{ title }}</h2>
is shorter than
<h2 [textContent]="title"></h2>

In other cases the property binding is shorter:

<img [src]="imageUrl" />
<img src="{{ imageUrl }}" />

// 3 - Attribute Binding

If we try to bind, say a td property of a table:

<table>
  <tr>
    <td [colspan]="colSpan"></td>
  </tr>
</table>    

and in the component we set it to 2:

colSpan = 2;

We'll get an error:

====
Can't bind to 'colspan' since it isn't a known property of 'td'. ("
    <table>
      <tr>
        <td [colspan]="colSpan"></td>
      </tr>
    </table>
=====

What's going on here?

First we need to understand the difference between the DOM  and HTML

DOM is a model that represents a structure of a document. It's 
essentially a tree in a memory

HTML, on the other hand, is a language that we use to represent DOM
in text

So when your browser parses an HTML-document, it creates a tree
of objects in memory - that we refer to as a DOM

We can always create this tree of objects programmatically,
using vanilla JS - so we don't necessarily need HTML

But using HTML is far simpler

In most cases HTML tags have their same attributes in the DOM-tree.
But some don't - and one of them is 'colspan' of a 'table' element.

Also we have properties in the DOM, that don't have representation in HTML -
[textContent], shown earlier, is one of these examples

So if we want to bind this 'colspan' attribute, we need a slightly 
different syntax
In this case we need to tell Angular that this is an attribute:

=====
<table>
    <tr>
        <td [attr.colspan]="colspan"></td>
    </tr>
</table>

// 4 - Adding bootstrap

$npm i bootstrap --save

3.3.4 - 'major.minor.patch'

in 'styles.css':

====
@import "~bootstrap/dist/css/bootstrap.css";

body { padding: 20px; }
====

Now if we add to our template:

=====
<button class="btn btn-primary">Save</button>
=====

The blue button appears

// 5 - Class Binding

THere are times when we want to add a class based on some condition

We add class binding as we did for other properties:

=====
<button class="btn btn-primary" [class.active]="isActive">Save</button>
=====

Now if we declare a variable 'isActive' in our class to 'true', this class will appear in our HTML-code:

=====
export class CoursesComponent {
    isActive = true;
}
=====

On the page we'll see:

=====
<button class="btn btn-primary active">Save</button>
=====

But if :

=====
isActive = false;
=====

the button will look like:

=====
<button class="btn btn-primary">Save</button>
=====

Hilarious!

We separated "class="btn btn-primary" [class.active]="isActive""
because we wanted 'btn btn-primary' to be applied to a button in any case,
and 'active' class to be applied based on some condition.

// 6 - Style Binding

This is a variation of a property binding, very similar to a class binding.

======
<button
      class="btn btn-primary"
      [class.active]="isActive"
      [style.backgroundColor]="isActive ? 'blue' : 'green'"
    >
      Save
    </button>
======

// 7 - Event Binding

In Angular we have tools to handle DOM-events - like clicks, mouse moves etc.

======
<button class="btn btn-primary" (click)="onSave()">
======

=====
export class CoursesComponent {
  
    onSave() {
      console.log("Button was clicked");
    }
}
=====

Sometimes we need to get access to an event raised by event handler (in mouse movement
    the event tells us the coordinates of a pointer).

    <button class="btn btn-primary" (click)="onSave($event)">

and

onSave($event) {
    console.log("Button was clicked", $event);
  }

This '$event' is known to Angular as a custom vanilla JS '$event' ('$e' wont work)  

EVENT BUBBLING

If we wrap the button in a div, and assign to this div another 'onclick' event that, say,
will log into console another message 'Div was clicked', we'll see both messages - 
'Button was clicked' first and 'Div was clicked' second. This bubbling could happen 
up to the DOM-tree.

How could we stop this bubbling?

We simply state in the 'button onClick' event:

$event.stopPropagation();

And this trick will stop bubbling

// 8 - Event Filtering

Standard JS-style to filter events looks like this:

Say, we want to handle keyup event in an 'input' field
=====
<input (keyup)="onKeyUp($event)" />
=====
onKeyUp($event) {
    if ($event.keyCode === 13) console.log("ENTER was pressed");
  }
=====

Here '$event.keyCode === 13' represents 'Enter' 

But in Angular we have a better and cleaner way:
We can apply a filter when handling the event

=====
<input (keyup.enter)="onKeyUp()" />
=====
onKeyUp() {
     console.log("ENTER was pressed");
  }
=====
******
But the example above doesn't work without $event - seems that 
things have changed
******

// 9 - Template Variables

How can we get the value typed in the form field?

There're two ways:

1. To pass $event and get the value from there:

<input (keyup.enter)="onKeyUp($event)" />
=====
onKeyUp($event) {
    console.log($event.target.value);
  }
=====

But in Angular we have another way to solve this problem.
We declare a field variable with a pound sign (hash - #email)
and then pass to a method its value:

<input #email (keyup.enter)="onKeyUp(email.value)" />
=====
onKeyUp(email) {
    console.log(email);
  }
=====

// 10 - Two-way Binding

The prevous example is working, but we pass parameters around - this is not good:
in Object-Oriented languages, where we have the concept of objects,
we don't want to pass parametes around - because the object encapsulates 
some data and some behaviour

So if object, or class, has all the data it needs, we don't have to shuffle
parameters around

What we actually may need is two-way binding: if the user puts some email, we got it - and backwards,
this meaning will update automatically in the input field:

======
<input
[value]="email"
(keyup.enter)="email = $event.target.value; onKeyUp()" //actually two statements in a row
/>
======
email = "me@example.com";

onKeyUp() {
  console.log(this.email);
}
======

But another elegant way is a "two-way binding syntax" (aka as 'banana in a box'): [()]

====
<input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />
====

And to function properly, we have to import 'ngModel' block in 'app.module.ts' - because
it doesn't included in Angular default package:

Can't bind to 'ngModel' since it isn't a known property of 'input'. ("

We need FormsModule. In app.module.ts:

import { FormsModule } from "@angular/forms";

and add it to our 'imports' section:

imports: [BrowserModule, FormsModule, AppRoutingModule],

=====

// 11 - Pipes

Pipes in Angular supposed to format data. 

Built-in pipes:

- Uppercase
- Lowercase
- Decimal
- Currency
- Percent

We can  also create custom pipes.

First we create an object:

=====
course = {
    title: "The Complete Angular Course",
    rating: 4.653,
    students: 30123,
    price: 190.95,
    releaseDate: new Date(2016, 3, 1)
  };
=====

And then parse it in the template:

=====
{{ course.title | uppercase }} <br />
{{ course.students }} <br />
{{ course.rating | number }} <br />
{{ course.price | currency }} <br />
{{ course.releaseDate }} <br />
=====

If we want to apply some pipes, we format our rendered field with a pipe-line, like this:

{{ course.title | uppercase }} <br />

We can also flow multiple pipes:

{{ course.title | uppercase | lowercase }} <br />

The key for a Decimal pipe is 'number':

{{ course.students | number}} <br />

We can format output of decimal numbers like this:

=====
{{ course.rating | number: "1.2-2" }} <br />
=====

Here in "1.2-2" first '2' stands for a minimal number of digits after a comma, 

and second '2' is for a maximum numbers.

If we change '2-2' to '1-1', the value will be rounded.

First number ('1' in our example) stands for minimal number of digits before the comma. If we change it to '2',
the result will be exposed like this: '04,65'

=====
{{ course.price | currency:"RUB":true:'3.2-2' }} <br />
=====

By default the currency is 'USD'
true or false is no longer valid in Angular5. Instead use 'code','symbol' - to swoh 'RUB',
or 'symbol-narrow' - to show currency sign (₽190.95 ).
For currency we can apply, along with currency specs, the format of details shown 

======
{{ course.releaseDate | date: "shortDate" }} <br />
======

All the setting can be found on 'angular.io' - search for 'datepipe'

// 12 - Custom Pipes

To create our own pipe 'summary' we need to create a file 'summary.pipe.ts':

======
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "summary"
})
export class SummaryPipe implements PipeTransform {
  transform(value: any, args?: any) {
    if (!value) return null;

    return value.substr(0, 50) + "...";
  }
}
======

THen we add in 'courses.component.ts':
template:
======
{{ text | summary }}
======

and class:
=====
text = `First number ('1' in our example) stands for minimal number of digits before the comma. If we change it to '2',
the result will be exposed like this: '04,65'
`;
=====

All we need to do further - is to add into app.module.ts import of this pipe:

=====
import { SummaryPipe } from "./summary.pipe";
=====
and add it to 'imports' array

If we want to supply an argument to a pipe:

=====
{{ text | summary:10 }}
=====

So our summary.pipe.ts transforms to:

======
transform(value: any, limit?: number) {
    if (!value) return null;
    let actualLimit = limit ? limit : 50;
    return value.substr(0, actualLimit) + "...";
  }
======

// 14 - Exxercise - Favorite Component

$ng g c favorite

in 'favorite.component.html':

=====
<span class="glyphicon glyphicon-star"></span>
=====

Glyphicon doesn't soupported in Ang2. So I had to add

$npm install --save font-awesome angular-font-awesome

and in my 'app.html':

====
<link
  data-require="bootstrap-css@3.3.6"
  data-semver="3.3.6"
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.css"
/>
=====

In our class (favorite.component.ts) we declare a var for glyph:

isFavorite = false

or

isFavorite: boolean;

Which way to choose - doesn't matter.

And we define a new method to toggle the selection of a star:

=====
onClick() {
  this.isFavorite = !this.isFavorite;
}
=====

In template we should provide the possibility to toggle 'selected-unselected' states of the star.

======
<span class="glyphicon"
[class.glyphicon-star]="isFavorite"
[class.glyphicon-star-empty]="!isFavorite"
(click)="onClick()"
></span>
======

// 16 - Exercise - Title Case

First we build two-way binfing to show what we type:

=====
<input type="text" [(ngModel)]="title" />
<br />
{{ title }}
=====

=====
export class FavoriteComponent implements OnInit {
  ngOnInit() {}

  title: "string";
}
=====

$ng g p title-case

Then we write this logic:

=====
transform(value: string): any {
    if (!value) return null;

    let prepositions = ["of", "the"];

    let words = value.split(" ");
    let word: string;
    for (let i = 0; i < words.length; i++) {
      if (i > 0 && prepositions.includes(words[i].toLowerCase())) {
        words[i] = words[i].toLowerCase();
      } else {
        words[i] =
          words[i].substr(0, 1).toUpperCase() +
          words[i].substr(1).toLowerCase();
      }
    }
    return words.join(" ");
  }
  =====

 We can refactor this code, moving logic of preposition finding and words-to-upper-case to
 private methods respectively:
 
 =====
 transform(value: string): any {
  if (!value) return null;

  let words = value.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (i > 0 && this.isPreposition(word)) {
      words[i] = word.toLowerCase();
    } else {
      words[i] = this.toTitleCase(word);
    }
  }
  return words.join(" ");
}

private toTitleCase(word: string): string {
  return (word =
    word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase());
}

private isPreposition(word: string): boolean {
  let prepositions = ["of", "the"];

  return prepositions.includes(word.toLowerCase());
}
=====

We also declared a new var 'word' and assigned to it 'words[i]' - to clean up the code a bit more and not to
noise our code with extra square brackets.