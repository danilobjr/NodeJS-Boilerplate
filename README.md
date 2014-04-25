NodeJS Boilerplate
==================

NodeJS Boilerplate is a starting point architecture for Node.js web apps.

*Live Demo*: [TODO](#)

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)

<a name='features'></a>Features
-------------------------------

- <b>Web Framework</b>
	- <a href="http://expressjs.com/" target="_blank">Express.js</a>: a web application framework for node
- <b>Database</b>
	- <a href="http://www.mongodb.org/" target="_blank">MongoDB</a> with <a href="http://mongoosejs.com/" target="_blank">Mongoose</a>: an elegant mongodb object modeling for node.js
- <b>Testing</b>
	- <a href="http://visionmedia.github.io/mocha/" target="_blank">Mocha</a>: a feature-rich javascript test framework running on node.js and the browser (BDD and TDD style testing)
	- <a href="https://github.com/visionmedia/should.js" target="_blank">Should.js</a>: BDD style assertions for node.js -- test framework agnostic
- <b>Client-Side Dependencies Management</b>
	- <a href="http://bower.io/" target="_blank">Bower</a>: a package manager for the web
- <b>Task Runner</b>
	- <a href="http://gruntjs.com/" target="_blank">Grunt</a>: a javascript task runner
- <b>Admin Template</b>
	- <a href="http://www.almsaeedstudio.com/preview" target="_blank">AdminLTE</a>: a free Premium Admin Control Panel Responsive Theme that is based on <a href="http://getbootstrap.com/" target="_blank">Bootstrap 3.x</a> with tons of elements
- <b>UI</b>
	- <a href="http://getbootstrap.com/" target="_blank">Bootstrap 3</a>: The most popular front-end framework for developing responsive, mobile first projects on the web
	- <a href="http://fortawesome.github.io/Font-Awesome/" target="_blank">Font Awesome</a>: The iconic font designed for Bootstrap that gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS
	- <a href="http://ionicons.com/" target="_blank">IonIcons</a>
- <b>MVC</b> Project Structure
- <b>Local Authentication</b> with <a href="http://passportjs.org/" target="_blank">Passport.js</a>
- <b>Awesome Notifications</b> with <a href="http://sciactive.com/pnotify/" target="_blank">PNotify</a>
- <b>Account Management</b>
    - <a href="https://gravatar.com" target="_blank">Gravatar</a>
    - Profile Details
    - Change Password
    - Delete Account

<a name='prerequisites'></a>Prerequisites
-----------------------------------------

1. <a href="http://nodejs.org/" target="_blank">Node.js</a>
2. <a href="http://www.mongodb.org/" target="_blank">MongoDB</a>
	- [How to install](http://docs.mongodb.org/manual/installation/) on Linux, Mac and Windows.

<a name="#getting-started"></a>Getting Started
----------------------------------------------

<p>1. Install globally grunt-cli, mocha and bower.</p>

```sh
npm install -g grunt-cli mocha bower
```

<p>2. Clone this repository.</p>

```sh
# fetch only the latest commits
git clone --depth=0 git@github.com:danilojrr/NodeJS-Boilerplate.git my-app-name

# enter the directory
cd my-app-name
```

<p>3. Install NPM dependencies.</p>

```sh
npm install
```

<p>4. Done! Use the following grunt tasks</p>

Launch the express server in development mode. This will run jshint, livereload and watch.

```sh
grunt server
```

Run jshint and unit tests (Mocha).

```sh
grunt test
```

Generate a **build** folder that can easily be deployed. This will run jshint, unit tests, jshint, concatenate and minify scripts/css, compress images and finally copy all files to a tidy build folder.

```sh
grunt build
```

Project Structure
-----------------

TODO

Npm Packages
------------

TODO

Useful Tools
------------

TODO

Recommended Design
------------------

TODO

Recommended Node.js Libraries
-----------------------------

TODO

Recommended Client-Side Libraries
---------------------------------

TODO

License
-------

The MIT License (MIT)

Copyright (c) 2014 Danilo Jr.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
