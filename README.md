#colog [![Build Status](https://travis-ci.org/dariuszp/colog.png?branch=1.0.0)](https://travis-ci.org/dariuszp/colog)

###Installation

If you have Node.js and npm (Node Package Manager) installed, simply open console and type

```Shell
npm install colog
```

###Usage

To use colog, add it to your project file

```JavaScript
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

##Cheatsheet

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

*Available effects:*
* bold()
* underline()
* strike() (draw line on the text)
* inverse() (change background color with text color and vice versa)

Also you can use .b(), .u(), .s() and .i() etc.

*Available colors:*
* black()
* red()
* green()
* yellow()
* blue()
* magenta()
* cyan()
* white()

Also you can use .colorBlack() instead of .black()

*Available backgrounds:*
* bgBlack()
* bgRed()
* bgGreen()
* bgYellow()
* bgBlue()
* bgMagenta()
* bgCyan()
* bgWhite()

Also you can use for example backgroundRed() instead of bgRed()

*Others:*

.nl() is alias for .newLine(). You get the point.

####Combining multiple effects:

```JavaScript
colog.log(colog.underscore(colog.colorRed('My text')));
colog.log(colog.apply('My text', ['underscore', 'colorRed']));
colog.log(colog.color('My text', 'red') + colog.color('My text', 'green'));
colog.format('<question>How are you ?</question>');
colog.format('colog.format(<bold><colorRed>This</colorRed></bold> <underline><yellow>is</yellow></underline> <green>SPARTA</green><inverse>!</inverse>);');
colog.log(colog.format('<question>How are you ?</question>', false));
```

*All options that can be used as tags:*
bold, underline, strike, inverse, colorBlack, colorRed, colorGreen, colorYellow, colorBlue, colorMagenta, colorCyan, colorWhite, backgroundBlack, backgroundRed, backgroundGreen, backgroundYellow, backgroundBlue, backgroundMagenta, backgroundCyan, backgroundWhite

*Also:*
now you can use short names like "black", "bgGreen" etc. Same as methods listed above

## Progress bar

To init a progress bar with 1000 steps that is charged 50% (5000 steps) just use:

```JavaScript
colog.progress(5000, 10000);
```

Now you can advance progress bar by .progress() method with one or no arguments:

```JavaScript
colog.progress(); // will add one step to progress bar
colog.progress(5); // will add 5 steps
```

## Formating output

Now .format() method allow You to combine string with arguments just like .format() method from Node.js Util library

```JavaScript
colog.format('My name is %s and I\'m %d', 'Earl', 45);
```

## Status

Sometimes you want some description with status. This will print message on the left side of the screen and status on the right side.
Script will measure size of your terminal and match position of both strings.

```JavaScript
colog.status('Module message', '[OK]');
colog.status('Module <b>message</b>', '<b>[OK]</b>');
```

If script will be unable to check size of TTY, default cols will be used.

## Silent mode

Sometimes you want Your colog to just shut up. You can do that using silent mode:

```JavaScript
colog.silent(true);
colog.silent(false);
```

## Dumping stuff

You can dump variables and functions at any point and apply effects to them.

```JavaScript
colog.dump(variable);
colog.dump(variable, ['red', 'bgGreen']);
```

##Example output

![Example](https://raw.github.com/dariuszp/colog/master/docs/colog.png)

Author: Półtorak Dariusz <poltorak.dariusz@gmail.com>
License: [MIT](http://opensource.org/licenses/MIT)
