# [MEAN Sandbox](https://meansandbox.com)

#### A playground to explore the workings of the MEAN stack.

## Description

The MEAN stack consists of the following technologies:

* [MongoDb](https://www.mongodb.org)
* [Express](http://expressjs.com)
* [AngularJS](https://angularjs.org)
* [Node.js](https://nodejs.org)

This project has become a place to integrate many of the projects that I've come
across during my journey to learn the MEAN stack.  The app consists of some core
functionality for user registration and authentication, as well as a few
(useful to me) apps to exercise the full MEAN stack.

A demo of this app is hosted at https://meansandbox.com.  Feel free to
check it out -- feedback always welcome.

### Influencers

This project was heavily influenced by the great work and accessible teachings of
[John Papa](https://github.com/johnpapa) ([@John_Papa](https://twitter.com/John_Papa)) and
[Joe Eames](https://github.com/joeeames) ([@josepheames](https://twitter.com/josepheames)).

The skeleton of the application came together while
working through Joe Eames' Pluralsight course,
[Building AngularJS and Node.js App with the MEAN Stack][ps-meancourse].
The skeleton was modeled after the code in that course.

The robust gulp workflows and tasks contained here was adapted for this project while
working through John Papa's Pluralsight course,
[JavaScript Build Automation with Gulp.js][ps-gulpcourse].

And of course, much of the code style and structure was taken from John Papa's
extremely popular [Angular Style Guide][ng-styleguide] and subsequent Pluralsight
course on the the topic, [AngularJS Patterns: Clean Code][ps-ngpatterns].

### Overview of Project Features

* **User registration and authentication** module
    * utilizes passport (and passport-local) for user authentication
    * salts and hashes password to store in users db
    * implements data caching to return the list of users (visible to admins only)
      to avoid hitting the back-end unnecessarily
    * implements Oauth registration/login with twitter

* Implements the 'canonical' **TODO application**
    * able to complete a 'todo' item without deleting
    * keeps track of the number of 'todos' remaining (not completed)
    * simple interface to add a new 'todo'
    * implements data caching for the todo list for improved performance

* Implements **ATM cash tracker**
    * tracks amount spent and amount remaining for atm withdrawals
    * provides a detailed view to add new purchases
    * implements AngularJS custom directives

### Known Issues

1.  Current weather information does not load.

    On 28 DEC 2015, the app was configured to utilize a TLS connection
    (via https://) thanks to the awesome folks at
    [letsencrypt](https://letsencrypt.org).  As a result, the call to the third
    party weather API no longer works since it is only available via a non
    secure connection (http://).

    *Update:*  I realized the issue stemmed from the fact that the app was
    making the call to the openweathermap API from the _client_--not a good
    design decision.  To resolve the issue, need to move the openweathermap API
    call to the server and expose a RESTful endpoint on the server that will
    return the results of the query back to the client.

    *Resolved:* 10 Jan 16.

---------------

### DEVELOPMENT DISCLAIMER
Since this project is intended to be a 'sandbox' and is under
constant development, there is no guarantee that user accounts and/or data will persist
from day-to-day.

[ng-styleguide]: https://github.com/johnpapa/angular-styleguide
[ps-gulpcourse]: https://app.pluralsight.com/library/courses/javascript-build-automation-gulpjs
[ps-meancourse]: https://app.pluralsight.com/library/courses/building-angularjs-nodejs-apps-mean
[ps-ngpatterns]: https://app.pluralsight.com/library/courses/angularjs-patterns-clean-code
