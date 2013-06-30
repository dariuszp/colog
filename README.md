#colog
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
npde myApplication.js
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