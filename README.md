# MEAN Sandbox

### A playground app to explore the workings of the MEAN stack.

* [MongoDb](https://www.mongodb.org)
* [Express](http://expressjs.com)
* [AngularJS](https://angularjs.org)
* [Node.js](https://nodejs.org)

## Description

This project is a place to integrate many of the projects that I've come across
in my journey to learn the MEAN stack.  This project consists of some core
functionality for user registration and authentication, as well as a few
(useful to me) apps to exercise the full MEAN stack.

Eventually, this project will be hosted at http://meansandbox.com, so feel free to
check it out -- feedback welcome.

### Influencers

This project was heavily influenced by the great work and accessible teachings of
[John Papa](https://github.com/johnpapa) ([@John_Papa](https://twitter.com/John_Papa)) and
[Joe Eames](https://github.com/joeeames) ([@josepheames](https://twitter.com/josepheames)).

The skeleton of the application came together while
working through Joe Eames' [Pluralsight](https://www.pluralsight.com) course,
*Building AngularJS and Node.js App with the MEAN Stack*.  The skeleton was modeled
after the code in that course.

The robust gulp workflows and tasks contained here was adapted for this project while
working through John Papa's [Pluralsight](https://www.pluralsight.com) course,
*JavaScript Build Automation with Gulp.js*.

And of course, much of the code style and structure was taken from John Papa's extremely
popular Angular Style Guide and subsequent Pluralsight course on the the topic, *AngularJS
Patterns: Clean Code*.

### Project Features

* **User registration and authentication** module
    * utilizes passport (and passport-local) for user authentication
    * salts and hashes password to store in users db
    * implements data caching to return the list of users (visible to admins only)
      to avoid hitting the back-end unnecessarily
    * implements Oauth registration/login with twitter

* Implements the 'canonical' **TODO application**
    * able to complete a 'todo' item without deleting
    * keeps track of the number of 'todos' remaining
    * simple interface to add a new 'todo'
    * implements data caching for the todo list for improved performance

* Implements **ATM cash tracker**
    * tracks amount spent and amount remaining for atm withdrawals
    * provides a detailed view to add new purchases
    * implements custom directives

---------------

### DEVELOPMENT DISCLAIMER
Since this project is intended to be a 'sandbox' and is under
constant development, there is no guarantee that user accounts and/or data will persist
from day-to-day.
