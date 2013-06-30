'use strict';

var util = require('util');

function Log() {

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


    function use(code, lightColor) {
        return util.format(base, (lightColor === true) ? code + colorLightValueChange : code);
    }


    function text(message, effect, lightColor) {
        return [
            use(effect[0], lightColor),
            message,
            use(effect[1], lightColor)
        ].join('');
    }


    this.reset = function () {
        return use(reset);
    };


    this.bold = function (message) {
        return text(message, effect.bold);
    };
    this.underline = function (message) {
        return text(message, effect.underline);
    };
    this.strike = function (message) {
        return text(message, effect.strike);
    };
    this.inverse = function (message) {
        return text(message, effect.inverse);
    };


    this.b = function (message) {
        return text(message, effect.bold);
    };
    this.u = function (message) {
        return text(message, effect.underline);
    };
    this.s = function (message) {
        return text(message, effect.strike);
    };
    this.i = function (message) {
        return text(message, effect.inverse);
    };


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


    this.black = function (message, light) {
        return text(message, color.black, light);
    };
    this.red = function (message, light) {
        return text(message, color.red, light);
    };
    this.green = function (message, light) {
        return text(message, color.green, light);
    };
    this.yellow = function (message, light) {
        return text(message, color.yellow, light);
    };
    this.blue = function (message, light) {
        return text(message, color.blue, light);
    };
    this.magenta = function (message, light) {
        return text(message, color.magenta, light);
    };
    this.cyan = function (message, light) {
        return text(message, color.cyan, light);
    };
    this.white = function (message, light) {
        return text(message, color.white, light);
    };
    

    this.colorBlack = function (message, light) {
        return text(message, color.black, light);
    };
    this.colorRed = function (message, light) {
        return text(message, color.red, light);
    };
    this.colorGreen = function (message, light) {
        return text(message, color.green, light);
    };
    this.colorYellow = function (message, light) {
        return text(message, color.yellow, light);
    };
    this.colorBlue = function (message, light) {
        return text(message, color.blue, light);
    };
    this.colorMagenta = function (message, light) {
        return text(message, color.magenta, light);
    };
    this.colorCyan = function (message, light) {
        return text(message, color.cyan, light);
    };
    this.colorWhite = function (message, light) {
        return text(message, color.white, light);
    };


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

    this.backgroundBlack = function (message, light) {
        return text(message, background.black, light);
    };

    this.backgroundRed = function (message, light) {
        return text(message, background.red, light);
    };

    this.backgroundGreen = function (message, light) {
        return text(message, background.green, light);
    };

    this.backgroundYellow = function (message, light) {
        return text(message, background.yellow, light);
    };

    this.backgroundBlue = function (message, light) {
        return text(message, background.blue, light);
    };

    this.backgroundMagenta = function (message, light) {
        return text(message, background.magenta, light);
    };

    this.backgroundCyan = function (message, light) {
        return text(message, background.cyan, light);
    };

    this.backgroundWhite = function (message, light) {
        return text(message, background.white, light);
    };


    this.bgBlack = function (message, light) {
        return text(message, background.black, light);
    };

    this.bgRed = function (message, light) {
        return text(message, background.red, light);
    };

    this.bgGreen = function (message, light) {
        return text(message, background.green, light);
    };

    this.bgYellow = function (message, light) {
        return text(message, background.yellow, light);
    };

    this.bgBlue = function (message, light) {
        return text(message, background.blue, light);
    };

    this.bgMagenta = function (message, light) {
        return text(message, background.magenta, light);
    };

    this.bgCyan = function (message, light) {
        return text(message, background.cyan, light);
    };

    this.bgWhite = function (message, light) {
        return text(message, background.white, light);
    };


    this.log = function (message) {
        if ((typeof message === 'string') === false) {
            message = '';
        }
        console.log(message);
        return this;
    };

    this.info = function (message) {
        return this.log(this.apply(message, ['bold', 'white']));
    };

    this.success = function (message) {
        return this.log(this.apply(message, ['bold', 'green']));
    };

    this.warning = function (message) {
        return this.log(this.apply(message, ['bold', 'yellow']));
    };

    this.error = function (message) {
        return this.log(this.apply(message, ['bold', 'red']));
    };

    this.question = function (message) {
        return this.log(this.apply(message, ['bold', 'cyan']));
    };

    this.answer = function (message) {
        return this.log(this.apply(message, ['bold', 'magenta']));
    };

    this.headerInfo = function (message) {
        return this.log(this.apply(message, ['bold', 'black', 'bgWhite']));
    };

    this.headerSuccess = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgGreen']));
    };

    this.headerWarning = function (message) {
        return this.log(this.apply(message, ['bold', 'black', 'bgYellow']));
    };

    this.headerError = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgRed']));
    };

    this.headerQuestion = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgCyan']));
    };

    this.headerAnswer = function (message) {
        return this.log(this.apply(message, ['bold', 'white', 'bgMagenta']));
    };

    this.apply = function(message, effects) {
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

    this.logo = function () {
        this.log(util.format('%s', this.bgGreen('|----------------------------|')));
        this.log(util.format('%s', this.bgGreen('|                            |')));
        this.log(util.format('%s %s %s', this.bgGreen('|     '), '                ', this.backgroundGreen('     |')));
        this.log(util.format('%s %s %s', this.bgGreen('|     '), this.veryRandomText('Półtorak Dariusz', 3), this.bgGreen('     |')));
        this.log(util.format('%s %s %s', this.bgGreen('|     '), '                ', this.backgroundGreen('     |')));
        this.log(util.format('%s', this.bgGreen('|                            |')));
        this.log(util.format('%s', this.bgGreen('|----------------------------|')));
    };

    this.format = function (message, log) {
        var all = this.getAllEffects(),
            i = 0,
            limit = all.length;
        for (i = 0; i < limit; i++) {
            message = message.replace(new RegExp(util.format('<%s>(.+?)<\/%s>', all[i], all[i]), 'g'), function (match, content) {
                return self.apply(content, [all[i]]);
            });
        }


        if (log === false) {
            return message;
        }
        else {
            this.log(message);
        }
    };
}

module.exports = new Log();