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

The plugin creates `<div>` elements with the following CSS classes by default:

  * `jst-hours`
  * `jst-minutes`
  * `jst-seconds`
  * `jst-clearDiv`
  * `jst-timeout` _(added only when the timer is finished)_

Here's an example of the HTML of a finished timer:

```HTML
<div class="timer jst-timeout" data-seconds-left="3">
  <div class="jst-hours">00:</div>
  <div class="jst-minutes">00:</div>
  <div class="jst-seconds">00</div>
  <div class="jst-clearDiv"></div>
</div>
```

The default CSS classes can be used to style the timer or we can specify [custom classes](https://github.com/caike/jQuery-Simple-Timer/blob/master/tests/tests.js#L342-L348) 
via the `classNames` option. Like this:

```javascript
$('.timer').startTimer({
  classNames: {
    hours: 'myClass-hours',
    minutes: 'myClass-minutes',
    seconds: 'myClass-seconds',
    clearDiv: 'myClass-clearDiv',
    timeout: 'myClass-timeout'
  }
});
```

## Options

For more options, checkout [http://csouza.me/jQuery-Simple-Timer/](http://csouza.me/jQuery-Simple-Timer/) and [some more examples.](https://rawgit.com/caike/jQuery-Simple-Timer/master/examples/index.html)

## Install

This plugin can be installed manually from github or via npm.

### Manual

Clone the repository and reference the *jquery.simple.timer.js* file from your html:

```HTML
<script src="jquery.js"></script>
<script src="jquery.simple.timer.js"></script>
```

### npm

To install from npm, run:

```
npm install jquery-simple-timer --save
```

jQuery is **NOT** installed automatically. We need to install jQuery (`npm install jquery --save`) and then pass it as an argument to the return value of the `require()` statement. Here's an example:

```javascript
// file: client.js
"use strict";

let $ = require("jquery");
require("jquery-simple-timer")($); // passing jQuery as argument

$(function(){
  $('.timer').startTimer();
});
```

## Tests

Open [tests/index.html](https://rawgit.com/caike/jQuery-Simple-Timer/master/tests/index.html)

## Contributors

* [Carlos Souza](https://github.com/caike)
* [Rafael Oshiro](https://github.com/roshiro)
* [ASCIIcat](https://github.com/ASCIIcat)

