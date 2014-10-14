## Simple.Timer

A jQuery plugin that creates a countdown timer.


## Usage

Set the desired duration using either `data-seconds-left` or `data-minutes-left` data attributes.

```HTML
<div class='timer' data-minutes-left=3></div>
<div class='timer' data-seconds-left=180></div>
```

Then start the timer with:

```javascript
$('.timer').startTimer();
```

## Options

For more options, checkout [http://csouza.me/jQuery-Simple-Timer/](http://csouza.me/jQuery-Simple-Timer/)

## Install

This plugin can be installed manually from github or via Bower.

### Manual

Clone the repository and reference the *jquery.simple.timer.js* file from your html:

```HTML
<script src="jquery.js"></script>
<script src="jquery.simple.timer.js"></script>
```

### Bower

In order to install it using Bower, make sure you have node, npm and bower installed:

```
$ npm install -g bower
```

Use the `bower` command to fetch the plugin:

```
$ bower install jquery-simple-timer
```

The plugin will be installed under *bower_components/jquery-simple-timer/jquery.simple.timer.js* unless you have a *.bowerrc* stating otherwise.


## Tests

Open [tests/index.html](https://rawgit.com/caike/jQuery-Simple-Timer/master/tests/index.html)

## Contributors

* [Carlos Souza](https://github.com/caike)
* [Rafael Oshiro](https://github.com/roshiro)

