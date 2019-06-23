// 01 - Intro

In this section:

- Implement forms with different kinds of input fields
- Display validation errors
-  disable the submit button

// 2 - Building a Basic Bootstrap Form

$ng g c contact-form

<form>
label+input[type='text'].form-control
</form>

Finally we get the form like this:

=====
<form>
  <div class="form-group">
    <label for="firstName"></label>
    <input id="firstName" type="text" class="form-control" />
  </div>
</form>
=====

We added 'id' and 'for' 'userName': 'label' shouldbe
tied with input field for better usability:
when user clicks on the label, the corresponding 
input field will be under focus 

And we have to wrap this in div with class 'form-group' -
it's the requirement of Angular

The next div we generate in one dzen coding:

div.form-group>label[for='comment']+textarea[id='comment'].form-control 

After TAB and deleting useless 'name' attribute:

====  
<div class="form-group">
<label for="comment"></label
><textarea
  id="comment"
  cols="30"
  rows="10"
  class="form-control"
></textarea>
</div>
=====

Now we need a button:

button.btn.btn-primary

<button class="btn btn-primary">Submit</button>

Each of the label fields needs a value

After adding app-contact-form to app.html we got a form with two fields and a 'Submit' button.

====
<form>
  <div class="form-group">
    <label for="userName">First Name</label>
    <input id="userName" type="text" class="form-control" />
  </div>
  <div class="form-group">
    <label for="comment">Comment</label
    ><textarea
      
      id="comment"
      cols="30"
      rows="10"
      class="form-control"
    ></textarea>
  </div>
  <button class="btn btn-primary">Submit</button>
</form>
====

// 3 - Types of Forms

So we've built the form and now we want to add validation to it.

In Angular we have a class named 'FormControl' - for each input field in our form we need to create
an instance of the 'control' class. And with this class we can check the value stored in this input field,
we can see if the input field was touched, untouched, if it's dirty - which means that it's
value was changed, or pristine - which means it's value was not changed (pristine = нетронутый),
whether it's valid or not, and if not - what the validation errors.

For each input field of the form we need a 'control' object.

Similar to control class we got 'FormGroup' - which represents a group of controls in the form.

Each form is essentially a control group, cause it contains at least one of controls.

In one form you can have multiple control groups - for example group for shipping address,
and another for the billing address.

All controls we saw earlier in the 'FormControl' are also available in the 'FormGroup' as well:
- value
- touched
- untouched
- dirty
- pristine
- valid
- errors

So we can ask a form grout if it's valid or not.

Checking the 'FormGroup' is easier than listing through all the form controls.

THere are two ways to create these control objects.

One way - is by applying directives in our template. And Angular will create these controls for us
implicitly under the hood. THis way is called 'template driven forms'.

Another way - is explicitly create these control objects. We call forms that are built this way -
'reactive' forms. (Previously they were called 'model-driven forms').

What is the difference? 

When we create the control explicitly = we have more control over 'validation logic'. 
So if you build complex forms and need more control - use this way. And anothe benefir -
you can use the validation logic to test these forms.

Otherwise, if you build simple forms that need only basic validation - use template driven forms.
They are easier to create and require less code.

// 4 - ngModel

With a template-driven approach you only need to set 'ngModel' and 'name' attributes to
an input field:

====
<input ngModel name='firstName' id="firstName" type="text" class="form-control" />
====

To see what's going on under the hood you need to set a (change) event and bind it to
a 'log()' method. For this we create a variable #firstName, apply it to 'ngModel' and
pass it to a log() method. Thus we'll see what's happens to the ngModel.

=====
<input
      ngModel
      name="firstName"
      #firstName="ngModel"
      (change)="log(firstName)"
      id="firstName"
      type="text"
      class="form-control"
    />
=====

Now let's implement this log method:

=====
export class ContactFormComponent {
log(x) {
  console.log(x);
}

}
=====

Now when we type something in the 'firstName' field, in the console appears 
an 'ngModel' object with a bunch of properties (valid, invalid, value, dirty, pristine etc)

=====
<textarea
      id="comment"
      ngModel
      name="comment"
      cols="30"
      rows="10"
      class="form-control"
    ></textarea>
=====

// 5 - Adding Validation

Now we add 'required' to a 'firstName' field:

====
<input
      ngModel
      required
      name="firstName"
      #firstName="ngModel"
      (change)="log(firstName)"
      id="firstName"
      type="text"
      class="form-control"
    />
=====

and then add a div under that field to show alert message if the firstName field is invalid:

=====
<div class="alert alert-danger" *ngIf="!firstName.valid">
      First Name is required
    </div>
=====

Now this alert is showed when the form is opened, and then disappears when user types something
in the field. If the user clears the field, the message showed up again.

But we want to show the alert when the user makes something wrong, i.e. focuses in the field,
but doesn't type anything.

To do this we simply add 'firstName.touched' condition:

=====
<div class="alert alert-danger" *ngIf="firstName.touched && !firstName.valid">
First Name is required
</div>
====

// 6 - Specific Validation Errors

In Angular we have some built-in validation errors based on HTML5 validation attributes.

required
minlength="3"
maxlength="10"
pattern="banana" (some regular expression here)

We don't want to show all the validation errors in one div. So we create sub-divs for every 
validation error:

=====
<div class="form-group">
<label for="firstName">First Name</label>
<input
  ngModel
  required
  minlength='5'
  pattern="banana"
  name="firstName"
  #firstName="ngModel"
  (change)="log(firstName)"
  id="firstName"
  type="text"
  class="form-control"
/>
<div
  class="alert alert-danger"
  *ngIf="firstName.touched && !firstName.valid"
>
  <div *ngIf="firstName.errors.required">First Name is required</div>
  <div *ngIf="firstName.errors.minlength">
    First Name should be minimum {{ firstName.errors.minlength.requiredLength }} characters long
  </div>
  <div *ngIf="firstName.errors.pattern">
    First Name doesn't match the pattern
  </div>
</div>
</div>
=====

// 7 - Styling Invalid Input Fields

As a best practice we should highlight the errored input field.

We have to add to our styles.css file a new rule with classes that Angular adds dynamically to invalid fields:

=====
.form-control.ng-touched.ng-invalid {
    border: 2px solid red;
  }
=====

// 8 - Cleaner Templates

Formatting code

// 9 - ngForm

For every form Angular creates an 'ngForm', even if it does not declared explicitly.

=====
<form #f="ngForm" (ngSubmit)="submit(f)">
=====

=====
submit(f) {
    console.log(f);
  }
====

Now if we fill the form, 'ngForm' object will appear in the console. Over there we'll see a bunch
of familiar properties, along with a 'form' property of type 'FormGroup'.

It also contains an object 'value' with values of the form fields.

// 10 - ngModelGroup

Just like we have 'ngModel' directive, we have 'ngModelGroup' directive.

To group our form with ngModelGroup we add a new <div ngModelGroup="contact">
and move into it all the fields we think belong to that group.

In the value object the 'contact' obj will appear, that contains data from the corresponding fields.

We can declare a variable and assign to it this model group - thus we can access this group object, to check
if the entire group is valid or not - for example.

// 11 - Control Classes and Directives

In Angular we have two classes to keep track of the state of input fields and their validity. 

One is 'FormControl', that represents only one field.

And the other is 'FormGroup', which represents a group of input fields.

Now if we apply 'ngModel' to an input field, Angular automatically creates a 'FormControl' object
and associates that with the input field. 

A 'FormGroup' class is used to represent an entire form and, optionally, groups inside that form.
We have a directive 'ngForm' that is automatically applied to all form elements. Angular creates 
a 'FormGroup' object and associates it with your form. With this object we can track the state
changes of the form and its validity. 

Now if you have a complex form with multiple subgroups, we can optionally apply ngModel directive
to a subgroup - 'ngModelGroup'. And this directive, similar to the 'ngForm' directive, will also create 
a 'FormGroup' object for that group.

But what is the difference between 'ngForm' and 'ngModelGroup'?

The difference is that 'ngForm' directive exposes an output property that's called 'ngSubmit'. 
We use this to handle the 'submit' events of forms. 

'ngModelGroup' doesn't have that output property - it doesn't make sense to submit a part of a form.

// 12 - Disabling the Submit Button

Ideally you want to disable the 'Submit' button until all the fields are filled properly.

Earlier we declared '#f="ngForm"'. So we simply bind the 'disabled' property of the 'Submit' button
to a state of 'f' variable:

=====
<button class="btn btn-primary" [disabled]="!f.valid">Submit</button>
=====

// 13 - Working with Check Boxes

div.checkbox>label>input[type='checkbox'] TAB
==
<div class="checkbox"><label for=""><input type="checkbox"></label></div>

Here we don't need the 'for' attribute. 

=====
<div class="checkbox">
    <label><input type="checkbox" ngModel name="isSubscribed" />Subscribe to a mailing list</label>
  </div>
=====

Right after this 'div' we're gonna add a paragraph and use interpolation to render 'f.value'. 
We have a pipe named 'json' and it will format that object in JSON:

====
<p>{{ f.value | json }}</p>
====

You can use this tool to diagnose what's inside your form object. It will display the current contents
and state of the form fields:

{ "contact": { "firstName": "ba" }, "comment": "cds", "isSubscribed": false }

// 14 - Working with Drop-down Lists

div.form-group>label[for="contact-method"]+select[id="contactMethod"].form-control
TAB
<div class="form-group">
    <label for="contactMethod"></label
    ><select ngModel name="contactMethod" id="contactMethod" class="form-control"></select>
  </div>

After ajusting:

====
<div class="form-group">
    <label for="contactMethod">Contact Method</label
    ><select name="" id="contactMethod" class="form-control"></select>
  </div>
====

Now we need to populate this drop-down list with <option value=""></option>

In real life we don't hardcode these options, but rather get them from the server and populate
this drop-down list dynamically.

For now let's imagine we already have this object with values in our component. Say, they are
stored in 'contactMethods' array in 'contact-form.ts' component:

====
contactMethods = [{ id: 1, name: "Email" }, { id: 2, name: "Phone" }];
=====

Back to our html:

=====
<div class="form-group">
    <label for="contactMethod">Contact Method</label>
    <select
      ngModel
      name="contactMethod"
      id="contactMethod"
      class="form-control"
    >
      <option *ngFor="let method of contactMethods" [value]="method.id">{{
        method.name
      }}</option>
    </select>
  </div>
=====

In many real-world applications we want the drop-down field to be blank - to let user manually
choose the option.

In many apps we want to send only 'id' to the server, but sometimes we need to send an object with both properties.
The point is - by default 'value' is a string and we cannot send an object through it.

To do this, instead of binding [value]="method.id", we use binding to 'ngValue':

[ngValue]="method"

This is an object and it carries all the properties of this field:

"contactMethod": { "id": 2, "name": "Phone" } 

If we want to allow the user to choose multiple options, we supply the field with 'multiple' attribute:

=====
<select
ngModel
multiple
name="contactMethod"
id="contactMethod"
class="form-control"
>
<option *ngFor="let method of contactMethods" [value]="method.id">{{
  method.name
}}</option>
</select>
=====

Now our 'contactMethod' contains an array of integers:

"contactMethod": [ 1, 2 ] 

// 15 - Working with Radio Buttons

We start with a dic with a class 'radio' (div.radio). Inside that div we need a label (div.radio>label)
and inside that label we need an input of type 'radio' (div.radio>label>input[type='radio']). As long as
radio buttons allow only one selection, we need to set another attribute with default selection [name='contactMethod']
(div.radio>label>input[type='radio'][name='contactMethod']). 
The actual mark-up:

<div class="radio"><label for=""><input type="radio" name="contactMethod"></label></div>

Then we can hardcode name of the button and its value:

<div class="radio"><label for=""><input type="radio" name="contactMethod" value='1'>Email</label></div>

Now duplicate this:

<div class="radio"><label for=""><input type="radio" name="contactMethod" value='2'>Phone</label></div>

And we have two radio buttons.

If we add 'ngModel' property to both of them, we could see the value of selected button in our consoled 'f.value'.

Now to display radio buttons based on the info received from our server, we need to delete the second button
and provide the repeating of code for each button:

=====
<div *ngFor="let method of contactMethods" class="radio">
    <label 
      ><input ngModel type="radio" name="contactMethod" [value]="method.id" />{{
        method.name
      }}</label
    >
  </div>
=====

// 17 - Exercise - Course Form

$ng g c new-course-form

In 'new-course-form' create a 'form' element. Over there we need three input fields:
'Course Title' - div.form-group>label[for='name']+input[type='text'][id='name'].form-control

=====
<form>
  <div class="form-group">
    <label for="name">Course Name</label
    ><input type="text" id="name" class="form-control" />
  </div>
</form>
=====

So far so good.

Second field will be a drop-down list:

div.form-group>label[for='category']+select[id='catefory'].form-control
TAB
====
  <div class="form-group">
    <label for="category">Category</label
    ><select name="" id="catefory" class="form-control"></select>
  </div>
=====

To populate this drop-down list we need to create a field 'categories':

====
categories = [
    { id: "1", name: "Development" },
    { id: "2", name: "Art" },
    { id: "3", name: "Languages" }
  ];
=====

Now we add options to our drop-down list with *ngFor="let c of categories" to run through options
and a blank option ahead of this list - to start selection with.

=====
<div class="form-group">
    <label for="category">Category</label
    ><select name="" id="catefory" class="form-control">
      <option value=""></option>
      <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>
    </select>
  </div>
=====

Then create a check-box:

div.checkbox>label[for='moneyBackGuarantee']>input[type='checkbox'][id='moneyBackGuarantee']
TAB
<div class="checkbox">
<label for="moneyBackGuarantee"
  ><input type="checkbox" id="moneyBackGuarantee" />30-day money-back
  guarantee</label
>
</div>
=====

Next add a button:

button.btn.btn-primary
TAB
<button class="btn btn-primary">Create</button>
=====

So we got a layout working properly.

Now let's convert this to Angular form.


