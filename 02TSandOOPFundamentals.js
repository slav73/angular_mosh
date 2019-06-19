// 1 - Introduction

- Type Annotations
- Arrow Functions
- Interfaces
- Classes
- Constructors
- Access Modifiers
- Properties
- Modules

// 2 - What is TypeScript?

TS - a superset of JS

Any valid JS is also valid in TS 

TS has some features that are not available in JS.

- Strong (or static) typing
- Object-Oriented features: Classes, interfaces, constructors, modifiers
- Catching errors (but not all of them) at a compile-time, not at a run-time  
- Great tooling (Intellisense)

Browsers basically don't understand TS, so we need to TRANSPILE TS-code into JS-code.

// 3 - Your first TS Program

$sudo npm install -g typescript

'tsc' stands for Type-Script Compiler:

$tsc --version

$mkdir ts-hello
$cd ts-hello
$code main.ts

Для устранения консольных ошибок пришлось прибегнуть к такому:

$tsc main.ts --lib es2015 && node main.js

All the JS code is also a valid TS code:

=====
function log(message) {
    console.log(message);
  }
  
  let message = "Hello World";
  
  log(message);
  =====

  Then we need to transpile this code into JS:

$tsc main.ts

This will create a file 'main.js'

Further on, we can execute it in 'node':

$node main.js
Hello World

// 4 - Declaring Variables

TS transpiler converts code to a JS, compatible with older browsers - AKA JS5 version.

So if we use 'let' in declaring variables, it will transpile it to 'var' anyways. 

$tsc main.ts | node main.js 

Even if the scope of declared variables is invalid in ES6, tsc will transpile the code
with compile errors into a valid JS code!

The lesson is: always declare the variable with the let keyword, and don't forget 
to look for compilation errors!

// 5 - Types

In TS we can't re-define variables:

===
let count = 5;
count = 'a';
====
This will show an error - but code still could be compiled into JS - and it could be executed!

In TS we can get 'type annotations'

If we don't know in advance the type of the variable, the TS will apply to it 'any' type, and
possible type-bardak could happen. To avoid it, declare this way:

=====
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3];
let f: any[] = [1, true, 'a', false];
=====

And a special type is 'enum' - to work with a group of related constants:

=====
enum Color {Red = 0, Green = 1, Red = 2};
let bgColor = Color.Green;
=====

Numbers in 'enum' array, if missed, are applied automatically, starting from 0. But the good practice
is to set them manually to avoid discrepancies later on.

// 6 - Type Assertions

We need to explicitly tell TS the type of the var. This is called 'type assertion'

There're two ways to make type assertions:

1. <string>message 
====
let message;
message = "abc";

let startWithC = (<string>message).endsWith("c");

// 2. 'as string'
let alternativeWay = (message as string).endsWith("b");
====

This simply lets the 'Intellisence' show up the menu of options (???!!!)

// 7 - Arrow Functions

In C# we call it 'lambda expression':

let doLog = (message) => console.log(message);

// 8 - Interfaces 

How we can use custom types in TS?
It's not a great practice to pass too many parameters to a func
Better create an obj with those params and pass that obj to a func

Imagine we want to draw a point. If we pass 

drawPoint({
    x: 1,
    y: 2
})

to 
let drawPoint(point) = {
  //...
}
function - when we try to pass instead of numbers some string:
drawPoint({
  name: 'Mosh'
});
there won't be a compilation error

Inline annotation:

===
let drawPoint = (point: { x: number, y: number}) => {
    /////
}

drawPoint({
    x: 1,
    y: 2
})
=====

But better approach is to use interface

On the top we define interface:

=====
interface Point {
    x: number,
    y: number
}
=====
This interface will define the shape of an object

Then we can simplify the declaration:

=====

let drawPoint = (point: Point) => {
    /////
}
======

When using interfaces, always use Capital letter - Pascal naming convention

// 9 -  Classes

In OOP we have the concept of 'cohesion' - which means that things that are related should be the parts
of one unit. Here comes the concept of a 'class' - a structure that unites highly related objects.

Class - groups variables (properties) and functions (methods) that are highly related

Interfaces - ONLY for declaration, not for implementation. We can't calculate a distance between two
points inside an interface.

But what we can do - is to add into interface a 'function declaration':

=====
interface Point {
    x: number,
    y: number,
    draw: () => void
}
=====

And pay attention, that we don't pass to draw any arguments - 'x' and 'y' are accessible by default
as a part of a Point interface.
Implementation of a 'draw' function is supposed to be somewhere else

But if we want to implement the function, we need to use 'class' instead of 'interface':

=====
class Point {
    x: number;
    y: number;

    drawPoint() {
        /////
    }

    getDistance(another: Point) {
        ///////
    } 
}
=====

So we have all the info inside one unit = class. In OOP we refer to x and y as 'FIELDS',
and to functions as 'METHODS'.

// 10 - Objects

Lets declare a variable of type Point:

let point: Point;
point.draw();

In TS we have the concept of 'property'. Some people use it interchangeably with fields,
without making any difference. But they are not the same.

When defining an object of custom type - we need to allocate memory to it
let point: Point = new Point();

=====
class Point {
  x: number;
  y: number;

  draw() {
    console.log("X: " + this.x + ", Y: " + this.y);
  }

}

let point = new Point();
point.x = 1;
point.y = 2;
point.draw();
=====

'Point' here is a class, and 'point' an instance of a class.
'Human' is a class, but 'John', 'Mary' or 'Pete' - are objects of a class

// 11 - Constructors

The previous code a little bit verbose - we got three lines to define 
a 'point' object. And what if the class has more properties?

Constructor - is basically a method that we call when creating an instance
of a class
====
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log("X: " + this.x + ", Y: " + this.y);
  }
}

let point = new Point(5, 3);
point.draw();
=====

In TS, unlike th C#, we can't have multiple constructors

  If the argument is not required, then use the construction 'y?: number'
If the argument is optional, all other args on the right side of it should be optional too
constructor(x?: number, y?: number) {


 // 12 - Access Modifiers
 
What if we don't want to change 'x' and 'y' values?

Access Modifier - is a keyword that we can apply to a member of a class to control
its access from the outside

 In TS we have three types of Access modifiers:

 - public: Class members marked public can be 
    accessed from the internal class methods as well as from the external scripts. 
    This is a default access.

- private: The private class members can be accessed from within the class only.

 - protected: Class members marked as protected 
    can be accessed either from the internal class methods or from its descendants.

 By default all members are 'public'

 But if we want to make, say, 'x' unchangeable, then

 'private x: number;'

 // 13 - Access Modifiers in Constructor Parameters

 class Point {
  private x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }

The code above is a bit redundant.
In TS we have a fantastic feature:
we can delete

private x: number;
y: number;

and prefix those fields in the constructor:

constructor(private x?: number, public y?: number) {
  this.x = x;
  this.y = y;
}

 We can rid of declaring vars in constructor, and then redundantly name them in 'this.x = x'
 by simply declaring them in constructor arguments:

 constructor (private x?: number, public y?: number){}
 
 And mention that this way we need to explicitly declare the 'public' fields, along with other
 types of AM

// 14 - Properties

To be able to read the data we need to declare a method 'get()' in the constructor. And we can do it 
like this:

===
getX() {
    return this.x;
  }
=====

Now we can apply to X as a field:

let x = point.getX();


Another case. Say, we want to let user change the coordnates in a provided range

We can set this 'x':

===
setX(value) {
    if (value < 0) {
      throw new Error("Value cannot be less than 0");
    }

    this.x = value;
  }
=====

To reset it:

=====
point.setX(10);
=====

Definition of properties: property looks like a field outside a class,
but really it's a method inside a class

// 'getter' property
get X() {
  return this.x;
}

// 'setter' property
set X(value) {
  if (value < 0) {
    throw new Error("Value cannot be less than 0");
  }

  this.x = value;
}

We can use these properties like fields, though they are really methods.

Reading properties:

let x = point.X;
point.X = 10;

They are no longer methods nor fields - they are properties

If we want to keep the field private and not accessible from the outside,
we simply not define the setter property - the field won't be accessible 
from outside the scope of a class.

To keep up with camel-notation, this is a common convention to start 'underlined' fields with 'underline':
'_x'. This way we can start the properties with usual lower letter: 'x'

=====
  class Point {
      constructor(private _x?: number, private _y?: number) {}
    
      draw() {
        console.log("X: " + this._x + ", Y: " + this._y);
      }
    
      get x() {
        return this._x;
      }
    
      set x(value) {
        if (value < 0) {
          throw new Error("Value cannot be less than 0");
        }
    
        this._x = value;
      }
    }
    
    let point = new Point(1);
    let x = point.x;
    point.x = 10;
    
    point.draw();
  =====

  So here is the lesson: a property (get x) looks like a field from the outside (point.x), but internally
  it's really a method in the class. It's either a getter or a setter, or a combination of both.

// 15 - Modules

Let's simpify the program:

class Point {
  constructor(private _x?: number, private _y?: number) {}

  draw() {
    console.log("X: " + this._x + ", Y: " + this._y);
  }
}

let point = new Point(1, 2);
point.draw();

Let's move this code to a separate file point.ts

In TS we think of each file as a 'module'
In order to use the 'point.ts' file outside, we need to export it:

export class Point {
  constructor(private _x?: number, private _y?: number) {}

  draw() {
    console.log("X: " + this._x + ", Y: " + this._y);
  }
}

Now it's visible to other files

And in 'main.js':

import { Point } from './point';

// 16- Exercise
Imagine you're working at Facebook and your job is to implement the "Like" functionality.

When a user clicks the "Like" button below a post, the button is highlighted 
(to indicate that it is selected) and the number of likes is increased.

You're going to implement this feature in Angular and for that 
you'll need to create a component. This component is a TypeScript class 
that encapsulates the data for rendering the like button 
(eg: the number of likes, and whether the button is in the on/off state). 
It also responds to user actions. So, when the user clicks the "Like" button, 
the number of likes should be increased and the button should be 
in the "selected/on" state. If the user clicks the button again, 
the number of likes should be decreased and the button should be 
in the "unselected" state.

Spec

For the purpose of this exercise, forget about the HTML. 
Your focus should be purely on defining a TypeScript class 
with the right members (fields, properties, methods, constructor).

Allow the consumer of this class to pass the initial number of likes 
when creating an instance of this class.

Define this class in a separate module and use it in the main module. 
Simulate the scenario where the user clicks the like component. 
Display the total number of likes and whether the button is 
in the selected or unselected state on the console.

// 17 -  Solution

The solution is simple - 

file like.component.ts: 

======
export class LikeComponent {
  constructor(private _likesCount: number, private _isSelected: boolean) {}

  onClick() {
    this._likesCount += this._isSelected ? -1 : +1;
    this._isSelected = !this._isSelected;
  }

  get likesCount() {
    return this._likesCount;
  }

  get isSelected() {
    return this._isSelected;
  }
}
======

file main.ts:

=====
import { LikeComponent } from "./like.component";

let component = new LikeComponent(10, true);
component.onClick();
console.log(
  `likesCount: ${component.likesCount}, isSelected: ${component.isSelected}`
);
======

But I can't run this exercise

Problems with compilation

Fiirst, compiler couldn't find some 'source-map' module

Installed this:

@types/source-map@0.5.2
(https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23649)

It worked - but still couldn't run the final build

MBP-admin:hello-world admin$ node main.js
/Users/admin/angular/mosh/hello-world/main.js:1
import { LikeComponent } from "./like.component";
       ^

SyntaxError: Unexpected token {

  What the heck? Everything is clear and simple!!