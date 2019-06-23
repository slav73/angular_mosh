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

In this case when clicking a button, "click" event is arised, and it triggers execution of "onClick()" 
method in Angular component.

Ideally, we want to set initial state of our component - using some object
that we have in the host component 

For example, here in the App component we get the 'POST' obj from the server.

=====
export class AppComponent {
  post = {
    title: "Title",
    isFavorite: true
  };
}
=====

In the template of App component we want to display this post and, if it's set
to 'favorite', we want to render the 'favorite' icon as a fool star.

Now we can't use our 'favorite' property in the <favorite></favorite>,
nor can we set up some events based on user actions - though we got
'isFavorite' and it's visible to all

We have to make some input and output working when dealing with our 'favorite'
component. These inputs and outputs make what we call 'Component API'

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

Import a decorator 'Input' lib:

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

But the problem with this approach is if we in the future rename the variable in the class core,
the code won't work.

Lets return to the first approach:

@Input() isFavorite: boolean;

// 4 - Aliasing Input Properties

Let's imagine our var has a name 'is-favorite' (not allowed in JS and TS, btw):

<favorite [is-favorite]="post.isFavorite"></favorite>

Thus we can use the following trick to assign an alias to this var:

@Input('is-favorite') isFavorite: boolean;

Using of alias has another benefit: it keeps the component API stable

*******
By pressing "fn + F2" we select all the occurences of the selected text on the page
*******

Let's imagine we renamed our var to 'isSelected' - and our APP will be broken

But if we apply the alias - everything will be OK
Though our star won't switch it's status - because we need to change 
the var names in our favorite.html also

The lesson:
If your're building reusable components, give your input properties
alias and keep the contracts of your components stable

// 5 - Output Properties

Say we want to be notified when the user clicks on the 'favorite ' component.

First we create a custom event 'change':
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

We also need to add EventEmitter() to 'import' block @angular/core:
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";


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

Эти данные будут доступны для всех подписчиков данного события. В нашем случае -
это основная компонента App

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

Мы можем проверять типы передаваемых данных
onFavoriteChanged(eventArgs: { newValue: boolean}) {

Что-то слишком многословно

В перспективе можно описать интерфейс для передаваемых данных.
В файле app.ts:

interface FavoriteChangedEventArgs {
  newValue: boolean
}
and 

onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {

Если мы планируем стать знаменитыми и распространять наш код,
лучше вынести объявление интерфейса в его родную гавань -
favorite.ts:

export interface FavoriteChangedEventArgs {
  newValue: boolean
}

И заимпортить его где нада - в App.ts

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

Or just simply type it inline in backticks (to inject some JS code)
or in single quotes:

===
@Component({
    selector: "app-favorite",
    template: `
      <h2>Some stuff and {{ variables }} here
    `,
    styleUrls: ["./favorite.component.css"]
  })
=== 

We can't mix these two approaches

What's better? It depends

If a component is small and simple - the inline seems to be a better
solution.
But when your template is more than, say, 5 lines of code - 
you'd rather put it to a separate file

And just another tip
When compiling, our template files go to the 'main.js' bundle
We can see it in our Chrome Network tab

// 9 - Styles

There are three ways to apply styles:

1. use 'styleUrls' in the component meta-data:

styleUrls: ["./favorite.component.css"]

in component meta-data
Here we have an array with one or more CSS files.
You can have a master template and additional skins 
to apply atop of it

2. Using a 'style' property. We can use backticks to
break the code for multiple lines:

  styles: [
      `
      ...
      `
  ]

  Angular doesn't complain if you use both of these, but the active will be the one that comes last.

  3. And we can write them in our HTML-document, using <style></style> tag

As said earlier, Angular will override the styles and picks up those that came last.
And it won't allow to leak styles outside the scope of the component.

// 10 - View Encapsulation

Styles used in 'styleUrls: ["./favorite.component.css"]' will never leak up to other  components.
This happens thanks to 'encapsulation'.

And how does it work?

Shadow DOM - allows us to apply scoped styles to elements without bleeding out to the outer world.

THis feature is not supported in older browsers.

Let's have a look at good old JS code:

var el = document.querySelector('favorite');

el.innerHTML = `
  <style><h1> { color: 'red' }</h1></style>
  <h1>Hello</h1>
`;

THis way, the style settings will be applied anywhere in the document

We can override it by adding a line:

var el = document.querySelector('favorite');
var root = el.createShadowRoot();
root.innerHTML = `
  <style><h1> { color: 'red' }</h1></style>
  <h1>Hello</h1>
`;

Now style settings won't leak outside the shadow root 'root'

In Angular we have a concept of 'view encapculation'

If we import 'ViewEncapsulation' module from @angular/core,
and add 'encapsulation' as component metadata:

@Component({
  selector: "favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})

Angular will suggest a set of options:

- 'Emulated' - emulates shadow DOM, to work in older browsers
- 'Native' - as is in the given browser
- 'None' - without shadow DOM
- and the recent one 'ShadowDom'

In most cases, default settings of Agular will do

// 11 - ngContent

Imagine you want to build a bootstrap panel component.

$ng g c panel

Then we change  the selector name to:

===
selector: 'bootstrap-panel',
====
in order to not conflict with other names of components

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

If we simply add some text to these two divs (panel-heading and panel-body) - 
we'll get a beautiful mark-up if we render this 'panel' component in
our App.html:

<bootstrap-panel></bootstrap-panel>

But if we want to add some content over there dynamically?

We could define property bindings in 'app.component.html':

===
<bootstrap-panel [body]="body"></bootstrap-panel>
====

But this approach is a little weird.

We could use 'ngContent' element instead.

First we provide two injection points (panel template):

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

and

=====
<ng-content select=".body"></ng-content>
=====

So if the consumer of this 'panel' component has an element that matches
this selector - which means an element with a 'heading' class, that element
is going to be placed right here - instead of 'ng-content'

In other words, ng-content will be replaced with that element.

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

In 'panel.html':

=====
<div class="panel panel-default">
  <div class="panel-heading">
    <ng-content select=".heading"></ng-content>
  </div>

  <div>
    <div class="panel-body">
      <ng-content select=".body"></ng-content>
    </div>
  </div>
</div>
=====

And you don't need a selector if you have only one ng-content

// 12 - ngContainer

The previous example works beautifully, but what if we don't want
to display extra 'div' while replacing the actual contents with 'ng-content'?
(By default, Angular looks for element specified in 'ng-content' by its
class, id or other element). What if we simply want to dislay raw text
and nothing more?

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

// 13 - Exercise - LikeComponent

Implement a 'Like' button shaped 'heart'
If you click on it, the counter increases by 1 and the heart goes pink
If you click it again, heart turns grey and counter switches to 0 again
If you hover a mouse over 'Like' icon, mouse pointer switches to a hand

The default color of the heart is grey - 'color: #ccc'
For active mode use 'color: deeppink'
Cursor attribute uses 'cursor: pointer'

The reusable 'Like' component will have two input properties -
totalNumberOfLikes and a boolean property telling if the user
liked it or not

In App we have an object with three properties:

tweet = {
  body: 'Here is the body of a tweet',
  isLiked: false,
  likesCount: 0
}

In 'app.html' we have this 'like' component:

<like
 [likesCount]="tweet.likesCount"
 [isActive]="tweet.isLiked"></like>

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

