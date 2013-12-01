#colog [![Build Status](https://travis-ci.org/dariuszp/colog.png?branch=1.0.0)](https://travis-ci.org/dariuszp/colog)

##v1.0.1

* colog should work also outside tty
* clear line return colog object

##v1.0.2

* Silence mode for colog.

Silence mode
```JavaScript
colog.silent(true); // colog will not print anything to stdout. From this point you should use console.log() or something else.
colog.silent(false); // default mode
```

##v1.0.0

*Changes:*

* tests in progress
* code improvements

*Changes:*

* progress bar rewriten
* mutliple optimalizations
* and tests
* .format() now works like .format() from JavaScript but with colors and stuff so you can use %s and pass parameters

colog.format('My name is %s and I\'m %d', 'Earl', 45);

WARNING: in 0.2.0 progress bar changed, adjust your code if you want to use this version
* colog.progress(5000, 10000); - to init bar with 40 bars and values 5000 / 10000. Default is 0 / 100.
* colog.progress(); - to increase bar by 1;
* colog.progress(5); - to increase bar by 5;

Status method is added. Takes two arguments. Text for left and right side of the console. Can be formatted just like using .format(). Example:

colog.status('Module <b>message</b>', '<b>[OK]</b>');

[OK] will be displayed at the right side of the window.

Next version will have unit tests and travis support.

*run "npm run-script example"* for more info and examples.

##v0.1.7
License file added. Library is under MIT license but no license file was provided with library. Fixing that.

##v0.1.6

*Changes:*

* colog.dump(variable) added
* colog.dump(variable, [ "red", "bgGreen" ] to apply effects to dump
* colog.dump(function () { return 1; }); will display function code as text
* docs added to methods
* format now work with multiline strings

##v0.1.5

*Changes:*

Now progress bar is included
* colog.progress(20) to draw progress bar with twenty bars
* colog.progress(20, 5) to draw progress bar with 5 filled bars and 15 "empty" bars
* colog.progress(20, 5, ['bgGreen']) to draw progress bar with 5 filled bars and 15 "empty" bars and green background
* colog.progress() to increase bar value so if you have 5 out of 20, you will have 6 out of 20
* colog.progress(undefined, undefined, [ 'red' ]) to increase value by 1 and add change text to red
* colog.configureProgress() to change way progress bar is displayed
* colog.nl() or colog.newLine() is added. This print new line in console
* colog.progress() return array with 2 elements, current and max value of progress


##v0.1.4

*Changes:*
Now you can use color names without color prefix. So use
* colog.red() instead of colog.colorRed()
* colog.bgGreen() instead of colog.backgroundGreen();
* colog.b() instead of colog.bold()

Same with format() method:
```Shell
Instead of <colorGreen>This</colorGreen> <bold>is</bold> <backgroundRed>SPARTA!</backgroundRed>
use <green>This</green> <b>is</b> <bgRed>SPARTA!</bgRed>
```


##v0.1.3

Use colors in your node.js console output

###Installation

If you have Node.js and npm (Node Package Manager) installed, simply open console and type

```Shell
npm install colog
```

###Usage

To use colog, add it to your project file

```JavaScript
'use strict';

var colog = require('colog');
```

Then you can start creating colorful output for your console:

```JavaScript
colog.success('Up and running');
```

If you did everything right, after you start your program like this:

```Shell
node myApplication.js
```

You should see green text "Up and running";

For more informations check [Wiki](https://github.com/dariuszp/colog/wiki) page for this project

##Chatsheet

####Predefined options:

```JavaScript
colog.question('How are you ?');
```

*Full list*
* info() - white text
* success() - green text
* warning() - yellow text
* error() - red text
* question() - cyan text
* answer() - magenta text
* headerInfo() - black text, white background
* headerSuccess() - white text, green background
* headerWarning() - black text, yellow background
* headerError() - white text, red background
* headerQuestion() - white text, cyan background
* headerAnswer() - white text, magenta background

####Applying colors, effects or background:

```JavaScript
colog.log(colog.colorGreen('My text'));
colog.log(colog.backgroundGreen('My text'));
```

*Available options:*
* bold()
* underline()
* strike() (draw line on the text)
* inverse() (change background color with text color and vice versa)
* colorBlack()
* colorRed()
* colorGreen()
* colorYellow()
* colorBlue()
* colorMagenta()
* colorCyan()
* colorWhite()
* backgroundBlack()
* backgroundRed()
* backgroundGreen()
* backgroundYellow()
* backgroundBlue()
* backgroundMagenta()
* backgroundCyan()
* backgroundWhite()

####Combining multiple effects:

```JavaScript
colog.log(colog.underscore(colog.colorRed('My text')));
colog.log(colog.apply('My text', ['underscore', 'colorRed']));
colog.log(colog.color('My text', 'red') + colog.color('My text', 'green'));
colog.format('<question>How are you ?</question>');
colog.format('colog.format(<bold><colorRed>This</colorRed></bold> <underline><colorYellow>is</colorYellow></underline> <colorGreen>SPARTA</colorGreen><inverse>!</inverse>);');
colog.log(colog.format('<question>How are you ?</question>', false));
```

*All options that can be used as tags:*
bold, underline, strike, inverse, colorBlack, colorRed, colorGreen, colorYellow, colorBlue, colorMagenta, colorCyan, colorWhite, backgroundBlack, backgroundRed, backgroundGreen, backgroundYellow, backgroundBlue, backgroundMagenta, backgroundCyan, backgroundWhite

##Example output

![Example](https://raw.github.com/dariuszp/colog/master/docs/colog.png)

Author: Półtorak Dariusz <poltorak.dariusz@gmail.com>
License: [MIT](http://opensource.org/licenses/MIT)
