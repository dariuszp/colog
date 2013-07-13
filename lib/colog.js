'use strict';

var util = require('util');

/**
 * Colorful console logging
 * @returns {Log}
 * @constructor
 */
function Log() {

    /**
     * Always create new object
     */
    if ((this instanceof Log) === false) {
        return new Log();
    }

    /**
     * Self
     * @type {*}
     */
    var self = this;

    /**
     * This is base for all effects. Replace %d [ or use util.format() ] with code number
     * @type {string}
     */
    var base = '\x1B[%dm';

    /**
     * This will reset all numbers
     * @type {number}
     */
    var reset =         0;

    /**
     * Add 60 to color number to bright it out
     * @type {number}
     */
    var colorLightValueChange =    60;

    /**
     * Last command executed
     */
    var lastCommand = 'log';

    /**
     * Last line length
     * @type {number}
     */
    var lastLineLength = 0;

    /**
     * Available colors
     * @type {{black: Array, red: Array, green: Array, yellow: Array, blue: Array, magenta: Array, cyan: Array, white: Array}}
     */
    var color = {
        'black':            [30, 39],
        'red':              [31, 39],
        'green':            [32, 39],
        'yellow':           [33, 39],
        'blue':             [34, 39],
        'magenta':          [35, 39],
        'cyan':             [36, 39],
        'white':            [37, 39]
    };

    /**
     * Available backgrounds
     * @type {{black: Array, red: Array, green: Array, yellow: Array, blue: Array, magenta: Array, cyan: Array, white: Array}}
     */
    var background = {
        'black':        [40, 49],
        'red':          [41, 49],
        'green':        [42, 49],
        'yellow':       [43, 49],
        'blue':         [44, 49],
        'magenta':      [45, 49],
        'cyan':         [46, 49],
        'white':        [47, 49]
    };

    /**
     * Available effects
     * @type {{bold: Array, underline: Array, strike: Array, inverse: Array}}
     */
    var effect = {
        'b':            [1, 22],
        'u':            [4, 24],
        'i':            [7, 27],
        's':            [9, 29],
        'bold':         [1, 22],
        'underline':    [4, 24],
        'inverse':      [7, 27],
        'strike':       [9, 29]
    };

    /**
     * Progress bar values
     * @type {Array}
     */
    var progress = [
        0,
        0,
        []
    ];


    /**
     * Default progress bar values
     * @type {{progress: {zero: string, one: string, left: string, right: string, showPostfix: boolean, prefixText: string}}}
     */
    var defaults = {
        progress: {
            zero: '░',
            one: '▓',
            left: '',
            right: '',
            showPostfix: true,
            prefixText: ''
        }
    };


    /**
     * Configure progress bar
     * @param zero - character for 0 status
     * @param one - character for 1 status
     * @param left - character on the left of the bar
     * @param right - character on the right of the bar
     * @param showPostfix - show postfix after bar [like: (19 of 20)]
     * @param prefixText - show prefix text before bar
     * @returns {*}
     */
    this.configureProgress = function (zero, one, left, right, showPostfix, prefixText, effects) {
        defaults.progress.zero = (zero !== undefined) ? zero : defaults.progress.zero;
        defaults.progress.one = (one !== undefined) ? one : defaults.progress.one;
        defaults.progress.left = (left !== undefined) ? left : defaults.progress.left;
        defaults.progress.right = (right !== undefined) ? right : defaults.progress.right;
        defaults.progress.showPostfix = (showPostfix) ? true : false;
        defaults.progress.prefixText = (prefixText !== undefined) ? prefixText : defaults.progress.prefixText;
        progress[2] = (effects instanceof Array) ? effects : progress[2];

        return this;
    }


    /**
     * Create effect from code. For colors set lightColor true to bright them up
     * @param code
     * @param lightColor
     * @returns {*}
     */
    function use(code, lightColor) {
        return util.format(base, (lightColor === true) ? code + colorLightValueChange : code);
    }


    /**
     * Apply effect on both side of the string
     * @param message
     * @param effect
     * @param lightColor
     * @returns {string}
     */
    function text(message, effect, lightColor) {
        return [
            use(effect[0], lightColor),
            message,
            use(effect[1], lightColor)
        ].join('');
    }


    /**
     * Clear line until last new line white character
     */
    function clearLine() {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }


    /**
     * Return "reset all effects" code
     * @returns {*}
     */
    this.reset = function () {
        return use(reset);
    };


    /**
     * Make given text bold
     * @param message
     * @returns {string}
     */
    this.bold = function (message) {
        return text(message, effect.bold);
    };

    /**
     * Apply underline to text
     * @param message
     * @returns {string}
     */
    this.underline = function (message) {
        return text(message, effect.underline);
    };

    /**
     * Draw line on the text
     * @param message
     * @returns {string}
     */
    this.strike = function (message) {
        return text(message, effect.strike);
    };

    /**
     * Switch foreground and background colors
     * @param message
     * @returns {string}
     */
    this.inverse = function (message) {
        return text(message, effect.inverse);
    };


    /**
     * Short alias for bold
     * @param message
     * @returns {string}
     */
    this.b = function (message) {
        return text(message, effect.bold);
    };

    /**
     * Short alias for underline
     * @param message
     * @returns {string}
     */
    this.u = function (message) {
        return text(message, effect.underline);
    };

    /**
     * Short alias for strike
     * @param message
     * @returns {string}
     */
    this.s = function (message) {
        return text(message, effect.strike);
    };

    /**
     * Short alias for inverse
     * @param message
     * @returns {string}
     */
    this.i = function (message) {
        return text(message, effect.inverse);
    };


    /**
     * Apply color on text by name
     * @param message
     * @param name
     * @param light
     * @returns {string}
     */
    this.color = function (message, name, light) {
        if (color[name] === undefined) {
            var colors = [],
                c;

            for (c in color) {
                if (color.hasOwnProperty(c)) {
                    colors.push(c);
                }
            }
            throw new Error('Undefined color. Use: ' + colors.join(', '));
        }
        return text(message, color[name], light);
    };


    /**
     * Apply black color
     * @param message
     * @param light
     * @returns {string}
     */
    this.black = function (message, light) {
        return text(message, color.black, light);
    };

    /**
     * Apply red color
     * @param message
     * @param light
     * @returns {string}
     */
    this.red = function (message, light) {
        return text(message, color.red, light);
    };

    /**
     * Apply green color
     * @param message
     * @param light
     * @returns {string}
     */
    this.green = function (message, light) {
        return text(message, color.green, light);
    };

    /**
     * Apply yellow color
     * @param message
     * @param light
     * @returns {string}
     */
    this.yellow = function (message, light) {
        return text(message, color.yellow, light);
    };

    /**
     * Apply blue color
     * @param message
     * @param light
     * @returns {string}
     */
    this.blue = function (message, light) {
        return text(message, color.blue, light);
    };

    /**
     * Apply magenta color
     * @param message
     * @param light
     * @returns {string}
     */
    this.magenta = function (message, light) {
        return text(message, color.magenta, light);
    };

    /**
     * Apply cyan color
     * @param message
     * @param light
     * @returns {string}
     */
    this.cyan = function (message, light) {
        return text(message, color.cyan, light);
    };

    /**
     * Apply white color
     * @param message
     * @param light
     * @returns {string}
     */
    this.white = function (message, light) {
        return text(message, color.white, light);
    };

    /**
     * Apply black color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorBlack = function (message, light) {
        return text(message, color.black, light);
    };

    /**
     * Apply red color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorRed = function (message, light) {
        return text(message, color.red, light);
    };

    /**
     * Apply green color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorGreen = function (message, light) {
        return text(message, color.green, light);
    };

    /**
     * Apply yellow color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorYellow = function (message, light) {
        return text(message, color.yellow, light);
    };

    /**
     * Apply blue color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorBlue = function (message, light) {
        return text(message, color.blue, light);
    };

    /**
     * Apply magenta color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorMagenta = function (message, light) {
        return text(message, color.magenta, light);
    };

    /**
     * Apply cyan color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorCyan = function (message, light) {
        return text(message, color.cyan, light);
    };

    /**
     * Apply white color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorWhite = function (message, light) {
        return text(message, color.white, light);
    };


    /**
     * Apply background color by name
     * @param message
     * @param name
     * @param light
     * @returns {string}
     */
    this.background = function (message, name, light) {
        if (background[name] === undefined) {
            var backgrounds = [],
                b;

            for (b in background) {
                if (background.hasOwnProperty(b)) {
                    backgrounds.push(b);
                }
            }
            throw new Error('Undefined color. Use: ' + backgrounds.join(', '));
        }
        return text(message, background[name], light);
    };

    /**
     * Apply black background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundBlack = function (message, light) {
        return text(message, background.black, light);
    };

    /**
     * Apply red background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundRed = function (message, light) {
        return text(message, background.red, light);
    };

    /**
     * Apply green background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundGreen = function (message, light) {
        return text(message, background.green, light);
    };

    /**
     * Apply yellow background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundYellow = function (message, light) {
        return text(message, background.yellow, light);
    };

    /**
     * Apply blue background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundBlue = function (message, light) {
        return text(message, background.blue, light);
    };

    /**
     * Apply magenta background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundMagenta = function (message, light) {
        return text(message, background.magenta, light);
    };

    /**
     * Apply cyan background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundCyan = function (message, light) {
        return text(message, background.cyan, light);
    };

    /**
     * Apply white background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundWhite = function (message, light) {
        return text(message, background.white, light);
    };

    /**
     * Apply black background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgBlack = function (message, light) {
        return text(message, background.black, light);
    };

    /**
     * Apply red background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgRed = function (message, light) {
        return text(message, background.red, light);
    };

    /**
     * Apply green background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgGreen = function (message, light) {
        return text(message, background.green, light);
    };

    /**
     * Apply yellow background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgYellow = function (message, light) {
        return text(message, background.yellow, light);
    };

    /**
     * Apply blue background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgBlue = function (message, light) {
        return text(message, background.blue, light);
    };

    /**
     * Apply magenta background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgMagenta = function (message, light) {
        return text(message, background.magenta, light);
    };

    /**
     * Apply cyan background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgCyan = function (message, light) {
        return text(message, background.cyan, light);
    };

    /**
     * Apply white background
     * @param message
     * @param light
     * @returns {string}
     */
    this.bgWhite = function (message, light) {
        return text(message, background.white, light);
    };


    /**
     * Alias for console.log
     * @param message
     * @param light
     * @returns {string}
     */
    this.log = function (message) {
        if (lastCommand === 'progress') {
            message = '\n' + message;
        }

        lastCommand = 'log';
        lastLineLength = (message instanceof Object && message.length) ? message.length : 0;

        console.log(message);
        return this;
    };

    /**
     * Log with bold white text
     * @param message
     * @returns {string}
     */
    this.info = function (message) {
        return this.log(this.apply(message, ['bold', 'white']));
    };

    /**
     * Log with bold green text
     * @param message
     * @returns {string}
     */
    this.success = function (message) {
        return this.log(this.apply(message, ['bold', 'green']));
    };

    /**
     * Log with bold yellow text
     * @param message
     * @returns {string}
     */
    this.warning = function (message) {
        return this.log(this.apply(message, ['bold', 'yellow']));
    };

    /**
     * Log with bold red text
     * @param message
     * @returns {string}
     */
    this.error = function (message) {
        return this.log(this.apply(message, ['bold', 'red']));
    };

    /**
     * Log with bold cyan text
     * @param message
     * @returns {string}
     */
    this.question = function (message) {
        return this.log(this.apply(message, ['bold', 'cyan']));
    };

    /**
     * Log with bold magenta text
     * @param message
     * @returns {string}
     */
    this.answer = function (message) {
        return this.log(this.apply(message, ['bold', 'magenta']));
    };

    /**
     * Log with bold black text and white background
     * @param message
     * @returns {string}
     */
    this.headerInfo = function (message) {
        return this.log(this.apply(message, ['bold', 'black', 'bgWhite']));
    };

    /**
     * Log with bold white text and green background
     * @param message
     * @returns {string}
     */
    this.headerSuccess = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgGreen']));
    };

    /**
     * Log with bold black text and yellow background
     * @param message
     * @returns {string}
     */
    this.headerWarning = function (message) {
        return this.log(this.apply(message, ['bold', 'black', 'bgYellow']));
    };

    /**
     * Log with bold white text and red background
     * @param message
     * @returns {string}
     */
    this.headerError = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgRed']));
    };

    /**
     * Log with bold white text and cyan background
     * @param message
     * @returns {string}
     */
    this.headerQuestion = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgCyan']));
    };

    /**
     * Log with bold white text and magenta background
     * @param message
     * @returns {string}
     */
    this.headerAnswer = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgMagenta']));
    };

    /**
     * Apply effects to message
     * @param message
     * @param effects
     * @returns {*}
     */
    this.apply = function (message, effects) {
        if ((effects instanceof Array) === false) {
            throw new Error('Effects must be an array');
        }

        var i = 0,
            limit = effects.length;

        for (i = 0; i < limit; i++) {
            if (this.hasOwnProperty(effects[i]) && typeof this[effects[i]] === 'function') {
                message = this[effects[i]](message);
            } else {
                var allEffects = [],
                    e = '';

                for (e in this) {
                    if (this.hasOwnProperty(e) && ((e.indexOf('color') === 0 && e !== 'color') || (e.indexOf('background') === 0 && e !== 'background') || effect[e] !== undefined)) {
                        allEffects.push(e);
                    }
                }
                throw new Error(util.format('Invalid effect "%s", you can use "%s"', effects[i], allEffects.join('", "')));
            }
        }

        return message;
    };

    /**
     * Alias for console.log that allow you to apply effects to dump
     * @param variable
     * @param effects
     * @returns {*}
     */
    this.dump = function (variable, effects) {
        if (!(effects instanceof Array)) {
            effects = [];
        }
        console.log(this.apply(variable, effects));
        return this;
    }

    /**
     * Get list of available effects
     * @returns {Array}
     */
    this.getAllEffects = function () {
        var allEffects = [],
            e = '';

        for (e in this) {
            if (this.hasOwnProperty(e) && ((e.indexOf('color') === 0 && e !== 'color') || ((e.indexOf('background') === 0 || e.indexOf('bg') === 0) && e !== 'background') || effect[e] !== undefined || color[e] !== undefined)) {
                allEffects.push(e);
            }
        }

        return allEffects;
    };

    /**
     * Split text and apply random effects for each character
     * @param text
     * @param amount - amount of effects for character
     * @returns {string}
     */
    this.veryRandomText = function (text, amount) {
        amount = parseInt(amount, 10);
        if (!amount) {
            amount = 1;
        }

        var allEffects = this.getAllEffects();
        var len = text.length,
            i = 0,
            j = 0,
            eLen = allEffects.length,
            newText = '',
            rand = 'bold',
            char = '';

        for (i = 0; i < len; i++) {
            char = text[i];
            for (j = 0; j < amount; j++) {
                rand = Math.floor(Math.random() * (eLen));
                char = this[allEffects[rand]](char);
            }
            newText += char;
        }

        return newText;
    };

    /**
     * This print logo with my name
     * @returns {*}
     */
    this.logo = function () {
        return this.format(util.format('<bgGreen> ╔════════════════════════╗ </bgGreen>\n<bgGreen> ║                        ║ </bgGreen>\n<bgGreen> ║  </bgGreen>                    <bgGreen>  ║ </bgGreen>\n<bgGreen> ║  </bgGreen>  %s  <bgGreen>  ║ </bgGreen>\n<bgGreen> ║  </bgGreen>                    <bgGreen>  ║ </bgGreen>\n<bgGreen> ║                        ║ </bgGreen>\n<bgGreen> ╚════════════════════════╝ </bgGreen>', this.veryRandomText('Półtorak Dariusz', 3)));
    };

    /**
     * Log message with xml tags using effects name. For example <b>text</b>
     * @param message
     * @param log
     * @returns {*}
     */
    this.format = function (message, log) {
        var all = this.getAllEffects(),
            i = 0,
            limit = all.length;
        for (i = 0; i < limit; i++) {
            message = message.replace(new RegExp(util.format('<%s>([\\s\\S]*?)<\/%s>', all[i], all[i]), 'g'), function (match, content) {
                return self.apply(content, [all[i]]);
            });
        }


        if (log === false) {
            return message;
        }
        else {
            return this.log(message);
        }
    };

    /**
     * Generate progress bar. Don't pass arguments to increase progress bar value
     * @param int - each int will add one more progress bar
     */
    this.progress = function (length, current, effects) {
        if (lastCommand === 'progress') {
            clearLine();
        }
        lastCommand = 'progress';

        if (parseInt(length, 10) > 0) {
            current = parseInt(current, 10);
            progress = [current > 0 ? current : 0, parseInt(length, 10), (effects instanceof Array) ? effects : progress[2]];
        }
        else {
            if (progress[0] !== undefined) {
                progress[0]++;
            }
        }

        var str = '\r' + (defaults.progress.prefixText ? defaults.progress.prefixText + ' ' : '') + defaults.progress.left,
            i = progress[0];
        for (i = 0; i < progress[0]; i++) {
            str += defaults.progress.one;
        }
        for (i = progress[0]; i < progress[1]; i++) {
            str += defaults.progress.zero;
        }
        str += defaults.progress.right + ((defaults.progress.showPostfix) ? ' (' + progress[0] + ' of ' + progress[1] + ') ' : '');

        if (effects instanceof Array) {
            progress[2] = effects;
            str = this.apply(str, effects);
        } else if (progress[2].length > 0) {
            str = this.apply(str, progress[2]);
        }
        lastLineLength = str.length;

        process.stdout.write(str);

        return [
            progress[0],
            progress[1]
        ];
    }

    /**
     * Print new line
     * @returns {*}
     */
    this.nl = function () {
        console.log('');
        return this;
    }

    /**
     * Alias for nl
     * @type {*}
     */
    this.newLine = this.nl;
}

module.exports = new Log();