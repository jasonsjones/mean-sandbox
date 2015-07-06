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

Eventually (hopefully soon) this project will be hosted at a DTDB (domain to be
determined).

### Features

* **User registration and authentication** module
    * utilizes passport (and passport-local) for user authentication
    * salts and hashes password to store in users db
    * implements data caching to return the list of users (visible to admins only)
      to avoid hitting the back-end unnecessarily
    * *TODO*: implement Oauth registration/login with github, or other online
      sites/services

* Implements the 'canonical' **TODO application**
    * able to complete a 'todo' item without deleting
    * keeps track of the number of 'todos' remaining
    * simple interface to add a new 'todo'
    * *TODO* (a little meta...): implement data caching for the
      todo list

* Implements **ATM cash tracker**
    * tracks amount spent and amount remaining for atm withdrawals
    * provides a detailed view to add new purchases
    * implements custom directives

---------------

### DEVELOPMENT DISCLAIMER
Since this project is intended to be a 'sandbox' and is under
constant development, there is no guarantee that user accounts and/or data will persist
from day-to-day.