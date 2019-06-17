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

Then we can simplify the declaration:

=====

let drawPoint = (point: Point) => {
    /////
}
======

When using interfaces, always use Capital letter - Pascal naming convention

// 9 -  Classes

In OOP we have the concept of 'cohesion' - which means that things that are related should be the parts
of one unit. Here comes the concept of a 'class' a structure that unites highly related objects.

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

But if we want to implement the function, we need to use 'class' instead of 'interface':

=====
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

In TS we have the concept of 'property'. Some people use it interchangeably with fields,
without making any difference. But they are not the same.

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

// 11 - Constructors

constructor(x: number, y?: number) {
    this.x = x;
    this.y = y;
  }

  If the argument is not required, then use the construction 'y?: number'

 // 12 - Access Modifiers
 
 In TS we have three types of Access modifiers:

 - public
 - private
 - protected

 By default all members are 'public'

 But if we want to make, say, 'x' unchangeable, then

 'private x: number;'

 // 13 - Access Modifiers in Constructor Parameters

 We can rid of declaring vars in constructor, and then redundantly name them in 'this.x = x'
 by simply declaring them in constructor arguments:

 constructor (private x?: number, private y?: number){}

// 14 - Properties

To be able to read the data we need to declare a method 'get()' in the constructor. And we can do it 
like this:

===
get X() {
    return this.x;
  }
=====

Now we can apply to X as a field:

let x = point.X;

Also we can set this 'x':

===
set X(value) {
    if (value < 0) {
      throw new Error("Value cannot be less than 0");
    }

    this.x = value;
  }
=====

To reset it:

=====
point.X = 10;
=====

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

Export class Point to a separate file and add "export class Point {"

And in 'main.js':

import { Point } from './point';


