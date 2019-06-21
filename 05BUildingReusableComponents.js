// 1 - Intro

In this section:

- Pass data to your component
- Raise custom events
- Apply styles
- Shadow DOM
- View encapsulation

// 2 - Component API

We used Property binding to bind a DOM-object property with the field or propertirs of our Angular component:

<img [src]="imageUrl" />

Another way to think of this: we use a component to create data and supply it to the DOM object,
to supply static data to DOM-element. Square brackets used to specify an 'input field' of the DOM-object.
We use this to supply data to that object, to supply some state.

Similarly we used "event binding" to supply events raised in the DOM-object:

<button (click)="onClick()"></button>

In this case when clicking a button, "click" event is arised, and it triggers execution of "onClick()" method in Angular 
component.

Переменные, находящиеся в классе, называются "полями" (fields).

// 3 - Input Properties

Say, we have an object in app.component.ts:

=====
post = {
    title: "Anglar Title",
    isFavorite: true
  };
=======  

And we need to bind it with 'favorite' component ('app.component.html'):

======
<favorite [isFavorite]="post.isFavorite" ></favorite>
======

In component we could mark the field as a property to use in property binding expressions  by two ways.

1 approach

Import 'Input' lib:

=====
import { Component, OnInit, Input } from "@angular/core";
=====

Then we can use it this way:

====
export class FavoriteComponent implements OnInit {
    @Input() isFavorite: boolean;
====

So '@Input' is another decorator in Angular to mark up fields and properties as INPUT properties.

Now this field is exposed to the outside and we can bind it with something else

2 approach to mark this field as an 'input' property

We can declare 'inputs' as another decorator:

======
@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
    styleUrls: ["./favorite.component.css"],
    inputs: ["isFavorite"]
  })
======

But the problem with this approach is if we in the future rename the valiable in the class core,
the code won't work.

Lets return to the first approach:

@Input() isFavorite: boolean;

// 4 - Aliasing Input Properties

Let's imagine our var has a name 'is-favorite' (not allowed in JS and TS, btw):

<favorite [is-favorite]="post.isFavorite"></favorite>

Thus we can use the following trick to assign an alias to this var:

@Input('is-favorite') isFavorite: boolean;

// 5 - Output Properties

Say we want to be notified when the user clicks on the 'favorite ' component.

=====
<app-favorite
  [is-favorite]="post.isFavorite"
  (change)="onFavoriteChanged()"
></app-favorite>
=====
in app.component.ts:
=====
export class AppComponent {
    post = {
      title: "Anglar Title",
      isFavorite: true
    };
  
    onFavoriteChanged() {
      console.log("Favorite changed");
    }
  }
=====

Then in 'favorite.component.ts' import 'Output' from '@Angular/core' and initialize the new field
with exactly the same name as the name of the event ('change'). It's decorated with '@Output' and
instantiates a new instance of a class 'EventEmitter()':

=====
@Output() change = new EventEmitter();
=====

We also need to add EventEmitter() to 'import' block @angular/core

Then - after we toggle the "selected" field - we want to raise an event. It will 'publish', or notify
others that something has happened.

=====
onClick() {
    this.isFavorite = !this.isFavorite;
    this.change.emit();
  }
=====

// 6 - Passing Event Data

Чтобы принять событие, инициированное при клике на компоненте, нужно:

1. В файле 'favorite.component.ts' прописать отсылку данных события:

=====
this.change.emit(this.isSelected);
=====

2. Затем эти данные нужно принять -  в файле 'app.component.html', в котором мы и отображаем компонент 'favorite',
указываем 

====
<app-favorite
  [isFavorite]="post.isFavorite"
  (change)="onFavoriteChanged($event)"
></app-favorite>
=====

Здесь под знаком доллара ($event) мы передаем не событие в стандартном понимании JS, а каку-то неведому ангулярную 
зверушку. На которую потом можно посмотреть в 'app.component.ts':
UPD: Эта неведома '$event' зверушка представляет собой встроенное в Ангуляр событие - что передадим, то и получим.
А в обычном JS это '$event' обозначает объект DOM-дерева.

====
onFavoriteChanged(isFavorite) {
    console.log("Favorite changed: ", isFavorite);
  }
====

Можно передавать объекты:

=====
onClick() {
    this.isSelected = !this.isSelected;
    this.change.emit({ newValue: this.isSelected });
  }
=====

Теперь в 
====
<app-favorite
  [isFavorite]="post.isFavorite"
  (change)="onFavoriteChanged($event)"
></app-favorite>
=====

в '$event' передается объект. Который можно принять в 'app.component.ts':

====
onFavoriteChanged(eventArgs) {
    console.log("Favorite changed: ", eventArgs);
  }
====

// 7 - Aliasing Output Properties

=====
@Output("change") click = new EventEmitter();
=====

If we want to change (WHY??!!) the name of 'change' emitter, say, to 'click' - 
we simply put an old name into brackets as an alias: @Output("change")

// 8 - Templates

One way to use a template is to specify its URL in 'templateUrl':

===
@Component({
    selector: "app-favorite",
    templateUrl: "./favorite.component.html",
    styleUrls: ["./favorite.component.css"]
  })
===  

Or just simply type it inline:

===
@Component({
    selector: "app-favorite",
    template: "",
    styleUrls: ["./favorite.component.css"]
  })
=== 

// 9 - Styles

There are three ways to apply styles:

1. use

styleUrls: ["./favorite.component.css"]

in component meta-data
Here we have an array with one or more CSS files.

2. Using a 'style' property:

  styles: [
      `
      ...
      `
  ]

  Angular doesn't complain if you use both of these, but the active will be the one that comes last.

  3. And we can write them in our HTML-document, using <style></style> tag

// 10 - View Encapsulation

Styles used in 'styleUrls: ["./favorite.component.css"]' will never leak up to other  components.
This happens thanks to 'encapsulation'.

And how does it work?

Shadow DOM - allows us to apply scoped styles to elements without bleeding out to the outer world.

THis feature is not supported in older browsers.

In most cases, default settings of Agular will do

// 11 - ngContent

Imagine you want to build a bootstrap panel component.

$ng g c panel

Then we change  the selector name to:

===
selector: 'bootstrap-panel',
====

In 'panel.component.html' we print

div.panel.panel-default

and after pressing 'TAB' we get:

<div class="panel panel-default"></div>

And if we type this:

===
div.panel.panel-default>div.panel-heading+div.panel-body
===

After TABbing we get:

====
<div class="panel panel-default">
  <div class="panel-heading"></div>
  <div class="panel-body"></div>
</div>
====

If we simply add some text to these two divs (panel-heading and panel-body) - we'll get a beautiful mark-up

But if we want to add some content over there dynamically?

We could define property bindings in 'app.component.ts':

===
<bootstrap-panel [body]="body"></bootstrap-panel>
====

But this approach is a little weird.

We could use 'ngContent' element instead.

First we provide two injection points:

====
<div class="panel panel-default">
  <div class="panel-heading">
  <ng-content></ng-content>
  </div>
  <div class="panel-body">
  <ng-content></ng-content>
  </div>
</div>
====

'<ng-content></ng-content>' - is a custom element defined in Angular

We need to somehow recognize these ng-content elements. For this we use 'select' and a class, 
id or an element:

=====
<ng-content select=".heading"></ng-content>
=====

Now in 'app.component.html' we add two divs:

div.heading+div.body

And we get

====
<bootstrap-panel>
  <div class="heading">Heading</div>
  <div class="body">
    <h2>Dody</h2>
    <p>Some content here...</p>
  </div>
</bootstrap-panel>
=====

And you don't need a selector if you have only one ng-content

// 12 - ngContainer

If you want to render something without putting it into a 'div' or other element,
use 'ng-container'. 

Instead of 

===
  <div class="heading">Heading</div>
====

in 'app.component.html', use simply

===
<ng-container class="heading">Heading</ng-container>
=====

// 14 - Exercise - Like Component

$ng g c like

in 'like.component.html':

=====
<span
  class="glyphicon glyphicon-heart"
  [class.highlighted]="isActive"
  (click)="onClick()"
></span>

<span>{{ likesCount }}</span>
=====

Then in 'like.component.css'  we need to apply a couple of classes for hearts:

=====
.glyphicon {
    color: #ccc;
    cursor: pointer;
  }
  
  .highlighted {
    color: deeppink;
  }
=====

In 'like.component.ts' :

=====
export class LikeComponent {
    @Input("likesCount") likesCount: number;
    @Input("isActive") isActive: boolean;
  
    onClick() {
      this.likesCount += this.isActive ? -1 : 1;
      this.isActive = !this.isActive;
    }
  }
=====

Then we go to 'app.component.ts' - and create a 'tweet' object:

=====
export class AppComponent {
    tweet = {
      body: "...",
      likesCount: 10,
      isLiked: true
    };
  }
=====

Finally, we go to 'app.html' and add to it our 'like' component:

====
<like [likesCount]="tweet.likesCount" [isActive]="tweet.isLiked"></like>
====

