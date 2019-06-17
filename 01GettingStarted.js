// 1 Introduction

Aim of the Course
{
  Aim of the Course - to learn Angular - from basics to advanced topics
and build a real-life app using Angular, Firebase and Bootstrap
}

Description of the App we build during this course
{
  Organic shop with products, shopping cart, adding/deleting products
  Authorization and authentication with possibility of CRUD editing products,
  sending orders and managing them
}
// 2  - What is Angular
{
Angular is a framework for building client applications in HTML, CSS, and JavaScript/TypeScript

TypeScript is more common in Angular community

Angular itself was written in TypeScript

Why do we need Angular?
  
    As our Web-app gets more complex, it's beginnig more hard to maintain
  Angular helps us with a structuring
  Vanilla JS apps are hard to test
  Also Angular gives us a lot of utilities to use in different apps,
  especially when dealing with user navigation or browser history
  

Angular makes easy a task of structuring your app and testing it.
}
// 3 - Architecture of Angular Apps

Front-End and Back-End

Front-End:
User Interface (UI) uses HTML, CSS, TypeScript and Angular

Responsible for HTML templates and Presentation Logic

Back-end:
Data and Processing

Responsible for Data processing and business logic

We don't store data in Angular

API - Application Programming Interface

HTTP Services/APIs to connect Front-end and Back-end

// 4 - Setting Up the Development Environment

******
Setting up GIT

$mkdir mosh
$cd mosh
$git init
$git remote add origin https://github.com/slav73/angular_mosh.git
$git push -u origin master
*******

$node --version

The minimal node version for Angular is 6.9

We need Angular CLI (Command Line Interface):

$npm install -g @angular/cli

Then 'ng --version' shows the current version of angular on your comp

// 05 - Your First Angular App

**************
!!$ng new project-name creates a new Angular project
**************

In CodeEditor 'Shift+CMD+P' opens up a command palette. Over there type 'code' and in the drop-down menu
choose 'Install 'code' command in PATH'. It will install the 'code'

When in current project directory we type in the command line '$code .' - this directory is added as a working dir

To load our app to the server:

$ ng serve

It will raise a server on port 4200:

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


// 6 - Structure of Angular Project

In AP we have 

e2e folder - stands for end-to-end - here we write end-to-end tests for our app
node_modules
in 'src' folder we have an 'app' folder with

app.module.ts and app.component.ts

Every app has at least one module and one component.

In 'assets' folder we store all the static files

"environments" - here we store different configuration settings for our environments:
environment.prod.ts - production env
environment.ts - dev env.

The other files - favicon, index.html are self-explanatory.

The 'main.ts' file is a starting point for our application.

'polyfills.ts' file imports some files that are required to run Angular.

styles.css - for CSS

test.ts - for tests

karma.config.js

outside the src folder we have 

angular-cli.json - config for or CLI

.editorconfig - config settings for our programmers team

.gitignore

package.json


// 7 - Webpack

Let's change file 'src/app/app.component.ts':

Changing block

===
export class AppComponent {
  title = "Angular application";
}
===

Changes the title of our page - automatically, after compiling with Webpack in Mosh case, but in modern
version of Angular it called 'wdm' - Window Deployment Manager.

This feature is called 'Hot Module Replacement'

// 8 - Angular Version History

AngularJS - 2010 - a JS Framework for building client apps
Angular2 - 2016 - was overwritten at TypeScript

Angular2 is a completely different framework.
ANgular3 was completely missed
Angular4 - is a major upgrade of A2

Now they decided to drop the version number

// Course Structure

Three parts: Essentials, Advanced Topics and Final Project

Essentials:
- Fundamentals of TS and OOP
- Angular Fundamentals
- Displaying Data and Handling Events
- Components
- Directives
- Template-Driven Forms
- Reactive Forms
- Consuming HTTP Services
- Routing and Navigation
- Authentication and Authorization
- Deployment
- Building real-time, serverless apps with Firebase

Advanced Topics:

- Animations
- Angular Material
- Redux
- Unit Testing
- Integration Testing

Final Project = building a real-life app


