# MEAN Sandbox

### A playground app to explore the workings of the MEAN stack.

* [Mongodb](https://www.mongodb.org)
* [Express](http://expressjs.com)
* [Angularjs](https://angularjs.org)
* [Nodejs](https://nodejs.org)

## Description

This project is a place to integrate many of the projects that I've come across
in my journey to learn the MEAN stack.  This project consists of some core
functionality for user registration and authentication, as well as a few apps
to exercise the full MEAN stack implementing a RESTful back-end server.

### Features

* User registration and authentication module
    * utilizes passport for user authentication
    * salts and hashes password to store in users db
    * implements data caching to return the list of users
      to avoid hitting the back-end unnecessarily
    * *TODO*: implement Oauth registration/login with github, or other online
      sites/services

* Implements the 'canonical' Todo application
    * able to complete a 'todo' item without deleting
    * keeps track of the number of 'todos' remaining
    * simple interface to add a new 'todo'
    * *TODO* (a little meta...): implement data caching for the
      the todo list

* Implements ATM cash tracker
    * tracks amount spent and amount remaining for atm withdrawals
    * provides a detailed view to add new purchases
    * implements custom directives