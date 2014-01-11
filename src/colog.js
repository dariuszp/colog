'use strict';

var util = require('util'),
    colog;

/**
 * Colorful console logging
 * @returns {Log}
 * @constructor
 */
function Colog() {

    /**
     * Always create new object
     */
    if ((this instanceof Colog) === false) {
        return new Colog();
    }

    /**
     * Self
     * @type Colog
     */
    var self                        = this;

    /**
     * This is base for all effects. Replace %d [ or use util.format() ] with code number
     * @type {string}
     */
    var base                        = '\x1B[%dm';

    /**
     * This will reset all effects
     * @type {number}
     */
    var reset                       = 0;

    /**
     * Add 60 to color number to bright it out
     * @type {number}
     */
    var colorLightValueChange       = 60;

    /**
     * Last command executed
     */
    var lastCommand                 = 'log';

    /**
     * Last line printed in console
     * @type {number}
     */
    var lastLineLength              = 0;

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
        100
    ];

    /**
     * Default progress bar values
     * @type {{progress: {zero: string, one: string, left: string, right: string, showPostfix: boolean, prefixText: string}}}
     */
    var defaults = {
        progress: {
            zero: '░',
            one: '▓',
            length: 40,
            sufix: ' ~ %d%% (%s / %s)',
            effects: ['colorYellow'],
            description: ''
        }
    };

    var beSilent = false;

    var consoleWidth    = 100;
    if (process.stdout.isTTY) {
        consoleWidth = process.stdout.getWindowSize()[0];
        process.stdout.on('resize', function () {
            consoleWidth = process.stdout.getWindowSize()[0];
        });
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
            String(message),
            use(effect[1], lightColor)
        ].join('');
    }


    /**
     * Clear line until last new line white character
     */
    function clearLine() {
        if (process.stdout.clearLine) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
        } else {
            var str = '\r',
                i = 0;
            for (i = 0; i < lastLineLength; i++) {
                str += ' ';
            }
            process.stdout.write(str);
        }
        lastLineLength = 0;

        return self;
    }


    this.silent = function (isSilent) {
        beSilent = (isSilent) ? true : false;
    }


    this.getWidth = function () {
        return consoleWidth;
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
    this.configureProgress = function (zero, one, length, effects) {
        length = Math.abs(parseInt(length, 10));

        defaults.progress.zero = (zero !== undefined) ? zero : defaults.progress.zero;
        defaults.progress.one = (one !== undefined) ? one : defaults.progress.one;
        defaults.progress.length = (length > 0) ? length : defaults.progress.length;
        defaults.progress.effects = (effects instanceof Array) ? effects : defaults.progress.effects;

        return this;
    };


    this.setProgressDescription = function (text) {
        text = String(text);
        defaults.progress.description = text;

        return this;
    };


    /**
     * Generate progress bar. Don't pass arguments to increase progress bar value
     * @param int - each int will add one more progress bar
     */
    this.progress = function (minOrChange, max, effects, returnString) {
        if (beSilent) {
            return this;
        }
        if (lastCommand === 'progress') {
            clearLine();
        }

        var i = 0,
            prc = 0,
            fullBarsToDraw = 0,
            emptyBarsToDraw = 0,
            totalBars = defaults.progress.length;

        // Prepare values
        minOrChange = Math.abs(parseInt(minOrChange, 10));
        max = Math.abs(parseInt(max, 10));
        if (isNaN(minOrChange)) {
            minOrChange = 0;
        }
        if (isNaN(max)) {
            max = 0;
        }

        if (max > 0) {
            // create new progress bar
            progress[0] = minOrChange;
            progress[1] = max;
        } else {
            if (minOrChange === 0) {
                minOrChange = 1;
            }
            // add to current progress bar
            progress[0] += minOrChange;
        }

        minOrChange     = progress[0];
        max             = progress[1];
        if (minOrChange > max) {
            minOrChange = max;
        }

        if (max === 0) {
            prc = 100;
        } else {
            prc = Math.floor((minOrChange / max) * 100);
        }
        fullBarsToDraw = Math.floor((prc / 100) * totalBars);
        emptyBarsToDraw = totalBars - fullBarsToDraw;

        var str = '\r';

        if (returnString !== true) {
            clearLine();
        }

        for (i = 0; i < fullBarsToDraw; i++) {
            str = str + defaults.progress.one;
        }
        for (i = 0; i < emptyBarsToDraw; i++) {
            str = str + defaults.progress.zero;
        }
        str = str + this.getFormat(defaults.progress.sufix, prc, minOrChange, max);

        if (effects instanceof Array) {
            str = this.apply(str, effects);
        } else {
            str = this.apply(str, defaults.progress.effects);
        }

        if (defaults.progress.description.length) {
            str = str + ' ' + this.getFormat(defaults.progress.description);
        }

        //str = str.substr(0, consoleWidth);

        if (returnString === true) {
            lastCommand = 'progress';
            return str;
        }

        this.write(str);
        lastCommand = 'progress';

        return this;
    };


    /**
     * Return "reset all effects" code
     * @returns {*}
     */
    this.reset = function () {
        return use(reset);
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
     * Make given text bold
     * @param message
     * @returns {string}
     */
    this.bold = function (message) {
        return this.b(message);
    };


    /**
     * Apply underline to text
     * @param message
     * @returns {string}
     */
    this.underline = function (message) {
        return this.u(message);
    };


    /**
     * Draw line on the text
     * @param message
     * @returns {string}
     */
    this.strike = function (message) {
        return this.s(message);
    };


    /**
     * Switch foreground and background colors
     * @param message
     * @returns {string}
     */
    this.inverse = function (message) {
        return this.i(message);
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
        return this.black(message, light);
    };


    /**
     * Apply red color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorRed = function (message, light) {
        return this.red(message, light);
    };


    /**
     * Apply green color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorGreen = function (message, light) {
        return this.green(message, light);
    };


    /**
     * Apply yellow color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorYellow = function (message, light) {
        return this.yellow(message, light);
    };


    /**
     * Apply blue color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorBlue = function (message, light) {
        return this.blue(message, light);
    };


    /**
     * Apply magenta color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorMagenta = function (message, light) {
        return this.magenta(message, light);
    };


    /**
     * Apply cyan color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorCyan = function (message, light) {
        return this.cyan(message, light);
    };


    /**
     * Apply white color
     * @param message
     * @param light
     * @returns {string}
     */
    this.colorWhite = function (message, light) {
        return this.white(message, light);
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
     * Apply black background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundBlack = function (message, light) {
        return this.bgBlack(message, light);
    };


    /**
     * Apply red background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundRed = function (message, light) {
        return this.bgRed(message, light);
    };


    /**
     * Apply green background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundGreen = function (message, light) {
        return this.bgGreen(message, light);
    };


    /**
     * Apply yellow background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundYellow = function (message, light) {
        return this.bgYellow(message, light);
    };


    /**
     * Apply blue background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundBlue = function (message, light) {
        return this.bgBlue(message, light);
    };


    /**
     * Apply magenta background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundMagenta = function (message, light) {
        return this.bgMagenta(message, light);
    };


    /**
     * Apply cyan background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundCyan = function (message, light) {
        return this.bgCyan(message, light);
    };


    /**
     * Apply white background
     * @param message
     * @param light
     * @returns {string}
     */
    this.backgroundWhite = function (message, light) {
        return this.bgWhite(message, light);
    };


    /**
     * Alias for console.log
     * @param message
     * @param light
     * @returns {string}
     */
    this.log = function (message) {
        if (beSilent) {
            return this;
        }
        if (lastCommand === 'progress' || lastCommand === 'write') {
            this.write('\n');
        }
        lastCommand = 'log';
        console.log(message);
        message += '';
        lastLineLength = message.length;

        return this;
    };


    /**
     * Write to stdout
     * @param message
     * @param light
     * @returns {string}
     */
    this.write = function (message) {
        if (beSilent) {
            return this;
        }
        lastCommand = 'write';
        process.stdout.write(message);

        message = String(message);
        if (lastCommand === 'write') {
            lastLineLength += message.length;
        } else {
            lastLineLength = message.length;
        }

        return this;
    };


    /**
     * Log with bold white text
     * @param message
     * @returns {string}
     */
    this.info = function (message, returnString) {
        var str = this.apply(message, ['bold', 'white']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold green text
     * @param message
     * @returns {string}
     */
    this.success = function (message, returnString) {
        var str = this.apply(message, ['bold', 'green']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold yellow text
     * @param message
     * @returns {string}
     */
    this.warning = function (message, returnString) {
        var str = this.apply(message, ['bold', 'yellow']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold red text
     * @param message
     * @returns {string}
     */
    this.error = function (message, returnString) {
        var str = this.apply(message, ['bold', 'red']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold cyan text
     * @param message
     * @returns {string}
     */
    this.question = function (message, returnString) {
        var str = this.apply(message, ['bold', 'cyan']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold magenta text
     * @param message
     * @returns {string}
     */
    this.answer = function (message, returnString) {
        var str = this.apply(message, ['bold', 'magenta']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold black text and white background
     * @param message
     * @returns {string}
     */
    this.headerInfo = function (message, returnString) {
        var str = this.apply(message, ['bold', 'black', 'bgWhite']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold white text and green background
     * @param message
     * @returns {string}
     */
    this.headerSuccess = function (message, returnString) {
        var str = this.apply(message, ['bold', 'white', 'bgGreen']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold black text and yellow background
     * @param message
     * @returns {string}
     */
    this.headerWarning = function (message, returnString) {
        var str = this.apply(message, ['bold', 'black', 'bgYellow']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold white text and red background
     * @param message
     * @returns {string}
     */
    this.headerError = function (message, returnString) {
        var str = this.apply(message, ['bold', 'white', 'bgRed']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold white text and cyan background
     * @param message
     * @returns {string}
     */
    this.headerQuestion = function (message, returnString) {
        var str = this.apply(message, ['bold', 'white', 'bgCyan']);
        return returnString === true ? str : this.log(str);
    };


    /**
     * Log with bold white text and magenta background
     * @param message
     * @returns {string}
     */
    this.headerAnswer = function (message, returnString) {
        var str = this.apply(message, ['bold', 'white', 'bgMagenta']);
        return returnString === true ? str : this.log(str);
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
        if (!effects.length) {
            return message;
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
        if (beSilent) {
            return this;
        }
        if (!(effects instanceof Array)) {
            effects = [];
        }

        effects = this.apply('\n', effects);
        effects = effects.split('\n');
        this.write(effects[0]);
        this.write(util.inspect((typeof variable === 'function') ? variable.toString() : variable));
        this.write(effects[1] + '\n');

        return this;
    };


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
     * Log message with xml tags using effects name. For example <b>text</b>
     * @param message
     * @param log
     * @returns {*}
     */
    this.format = function () {
        if (beSilent) {
            return this;
        }
        this.log(this.getFormat.apply(this.getFormat, arguments));
        return this;
    };


    /**
     * Log message with xml tags using effects name. For example <b>text</b>
     * @param message
     * @param log
     * @returns {*}
     */
    this.getFormat = function () {
        var message = arguments.length > 0 ? arguments[0] : '';
        message = util.format.apply(util.format, arguments);
        var all = self.getAllEffects(),
            i = 0,
            limit = all.length,
            applyCallback = function (match, content) {
                return self.apply(content, [all[i]]);
            };
        for (i = 0; i < limit; i++) {
            message = message.replace(new RegExp(util.format('<%s>([\\s\\S]*?)<\/%s>', all[i], all[i]), 'g'), applyCallback);
        }

        return message;
    };


    this.stripFormat = function () {
        var message = arguments.length > 0 ? arguments[0] : '';
        message = util.format.apply(util.format, arguments);

        var all = this.getAllEffects(),
            i = 0,
            limit = all.length,
            applyCallback = function (match, content) {
                return content;
            };
        for (i = 0; i < limit; i++) {
            message = message.replace(new RegExp(util.format('<%s>([\\s\\S]*?)<\/%s>', all[i], all[i]), 'g'), applyCallback);
        }

        return message;
    };


    /**
     * Print new line
     * @returns {*}
     */
    this.nl = function () {
        this.write('\n');
        return this;
    };


    /**
     * Alias for nl
     * @type {*}
     */
    this.newLine = this.nl;


    this.status = function (text, status, textEffects, statusEffects, returnString) {
        if (beSilent) {
            return this;
        }
        if (text instanceof Object) {
            text = text.toString();
        }
        if (status instanceof Object) {
            status = status.toString();
        }

        var textLen = this.stripFormat(text).length,
            statusLen = this.stripFormat(status).length,
            emptyLength = consoleWidth - (textLen + statusLen),
            emptyString = '',
            i = 0,
            str = '';

        text = this.getFormat(text);
        status = this.getFormat(status);
        if (textEffects instanceof Array) {
            text = this.apply(text, textEffects);
        }
        if (statusEffects instanceof Array) {
            status = this.apply(status, statusEffects);
        }

        if (emptyLength < 2) {
            emptyLength = 2;
        }
        emptyLength -= 1;

        for (i = 0; i < emptyLength; i++) {
            emptyString = emptyString + ' ';
        }

        str = text + emptyString + status;

        if (returnString === true) {
            return str;
        }
        this.log(str);
        return this;
    };
}

if (!colog) {
    colog = new Colog();
}

module.exports = colog;