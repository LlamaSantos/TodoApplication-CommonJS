##Setup
* Firstly install node.js 0.8.*
* Install Hogan.js and browserify globally

    ```console
    npm install -g hogan.js
    npm install -g browserify
    ```

* (Optional) Install WebStorm for debugging.
* Clone this repo
* Get all necessary modules
    * From the root of the repository:

    ```console
    npm install --prod
    ```

* To Run, use the following:

    ```console
    node app.js
    ```

##Compile Application
The project runs 100% in the browser from the file ./public/browser.js.  In order to compile this we use browserify v2
to compile everything.  The following script is used to seed browser.js from browserify.  Note browserify must be
install globally as indicated in the setup, also this is run from the root of the project.  If run elsewhere adjust the
pathing on the command.

```console
browserify -e ./features/app.startup.js --dg > ./public/browser.js
```

##Templates
Install globally hogan.js to get the hulk command line tool, you can do that by running the following command

```console
npm install -g hogan.js
```

Once this is installed run the following command to generate the latest templates and place them into the templates.js script

```console
hulk ./templates/* > ./public/js/templates.js
```

Again, this is scoped to the root of the project so adjust paths to whatever directory you are in.

##Anatomy of the Project
###Intro
This entire project is a JavaScript interpretation of Uncle Bobs epic talk entitled "Architecture the lost years".
That can be found here:
    http://www.youtube.com/watch?v=WpkDN78P884

The things I tried to focus on from Uncle Bob's talk in this example is how to we separate UI from backend code, without
the use of an explicit boundary.  JavaScript has no real inheritance pattern which means enforcing these boundaries
becomes problematic.  Certainly I could create some boundary object and use prototypal inheritance, but why?  JavaScript
is a functional language, rooted in LISP, and provides prototypes instead of a strong class like inheritance structure.
Frameworks like Backbone seek to structure an MVC application through the use of inheritance, and do a great job given
the structural problems that JavaScript presents.

Backbone along with its contemporaries Angular, Knockout, Ember, et al each seek to provide a method of development "similar"
to that of a method found in one's "other" language.  Others are the server side equivalents one is used to working with.  Java,
Ruby, C#, Python, and others have all influenced JavaScript libraries and its evident in the aforementioned frameworks.
Each represents a well known pattern or concept and seeks to build a strong case for itself.

What this project presents is a native JavaScript implementation of the principles Uncle Bob presented.  The primary focus
is creating boundaries and injecting presentation code down into a controller to operate.  Other side effects when viewing
this code you will see is a strong emphasis on immutability of data moving between tiers and being stored in a central store
that is injected down into the system as a dependency.  Also DOM manipulation is isoldated and kept to only the presentation tier.
All other data manipulations must be DOMless.  This gives a massive performance boost in the UI in being able to wholely replace
any section of DOM due to the heavy performance implications of a singular DOM interaction.

###Why
I wanted to see a native JavaScript implementation, based on JavaScript principles rather than an interpretation based in
a wholey Object Oriented Language like Java or C#.  This project makes use of events and callbacks which JavaScript is very
adept at using, and seeks to do so through a global application bus.  The bus is the <i>Boundary<i> that Uncle Bob talks about.

###Boundary
Since UI and Controller must be separated and configured to not know exactly about one another, the bus boundary creates that
eligantly.  JavaScript lacks a strong type system, and what little there is can be easily manipulated and fooled thus making it
unreliable.  The bus however works based on a protocol, a tuple of event name and arguments.  This can be easily defined
and tapped into making a strong separation between the two aforementioned tiers.  The result of this is a lose coupling
that we can readily take advantage of in separating the tiers.  Since UI code is expensive to test relative to unit, integration,
system, isolation, etc tests make available through test automation frameworks, we make no attempt to test that segment.  If a UI
interaction is wrong we can rectify that, however business rules in a browser based application need rigorously more testing.

The boudnary affords us the ability to test business code by emiting data such as the UI would do over a bus and giving
us the results.  The tests are done in a BDD manner in the test directory, and this concept of mocking and emitting over the
bus mocked data can be plainly seen.

###Operations
...

###Feedback
...

###License
(The MIT License)

Copyright (c) 2012 James R. White

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.