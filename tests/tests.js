'use strict';

var colog = require(__dirname + '/../src/colog.js');

exports.colorsAndAliases = function(test){
    test.strictEqual(colog.black('text'),        '\x1B[30mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'black'),        '\x1B[30mtext\x1B[39m');
    test.strictEqual(colog.colorBlack('text'),   '\x1B[30mtext\x1B[39m');
    test.strictEqual(colog.black('text', true),        '\x1B[90mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'black', true),        '\x1B[90mtext\x1B[99m');
    test.strictEqual(colog.colorBlack('text', true),   '\x1B[90mtext\x1B[99m');

    test.strictEqual(colog.red('text'),        '\x1B[31mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'red'),        '\x1B[31mtext\x1B[39m');
    test.strictEqual(colog.colorRed('text'),   '\x1B[31mtext\x1B[39m');
    test.strictEqual(colog.red('text', true),        '\x1B[91mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'red', true),        '\x1B[91mtext\x1B[99m');
    test.strictEqual(colog.colorRed('text', true),   '\x1B[91mtext\x1B[99m');

    test.strictEqual(colog.green('text'),        '\x1B[32mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'green'),        '\x1B[32mtext\x1B[39m');
    test.strictEqual(colog.colorGreen('text'),   '\x1B[32mtext\x1B[39m');
    test.strictEqual(colog.green('text', true),        '\x1B[92mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'green', true),        '\x1B[92mtext\x1B[99m');
    test.strictEqual(colog.colorGreen('text', true),   '\x1B[92mtext\x1B[99m');

    test.strictEqual(colog.yellow('text'),        '\x1B[33mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'yellow'),        '\x1B[33mtext\x1B[39m');
    test.strictEqual(colog.colorYellow('text'),   '\x1B[33mtext\x1B[39m');
    test.strictEqual(colog.yellow('text', true),        '\x1B[93mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'yellow', true),        '\x1B[93mtext\x1B[99m');
    test.strictEqual(colog.colorYellow('text', true),   '\x1B[93mtext\x1B[99m');

    test.strictEqual(colog.blue('text'),        '\x1B[34mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'blue'),        '\x1B[34mtext\x1B[39m');
    test.strictEqual(colog.colorBlue('text'),   '\x1B[34mtext\x1B[39m');
    test.strictEqual(colog.blue('text', true),        '\x1B[94mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'blue', true),        '\x1B[94mtext\x1B[99m');
    test.strictEqual(colog.colorBlue('text', true),   '\x1B[94mtext\x1B[99m');

    test.strictEqual(colog.magenta('text'),        '\x1B[35mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'magenta'),        '\x1B[35mtext\x1B[39m');
    test.strictEqual(colog.colorMagenta('text'),   '\x1B[35mtext\x1B[39m');
    test.strictEqual(colog.magenta('text', true),        '\x1B[95mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'magenta', true),        '\x1B[95mtext\x1B[99m');
    test.strictEqual(colog.colorMagenta('text', true),   '\x1B[95mtext\x1B[99m');

    test.strictEqual(colog.cyan('text'),        '\x1B[36mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'cyan'),        '\x1B[36mtext\x1B[39m');
    test.strictEqual(colog.colorCyan('text'),   '\x1B[36mtext\x1B[39m');
    test.strictEqual(colog.cyan('text', true),        '\x1B[96mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'cyan', true),        '\x1B[96mtext\x1B[99m');
    test.strictEqual(colog.colorCyan('text', true),   '\x1B[96mtext\x1B[99m');

    test.strictEqual(colog.white('text'),        '\x1B[37mtext\x1B[39m');
    test.strictEqual(colog.color('text', 'white'),        '\x1B[37mtext\x1B[39m');
    test.strictEqual(colog.colorWhite('text'),   '\x1B[37mtext\x1B[39m');
    test.strictEqual(colog.white('text', true),        '\x1B[97mtext\x1B[99m');
    test.strictEqual(colog.color('text', 'white', true),        '\x1B[97mtext\x1B[99m');
    test.strictEqual(colog.colorWhite('text', true),   '\x1B[97mtext\x1B[99m');

    test.done();
};


exports.backgroundsAndAliases = function(test){
    test.strictEqual(colog.bgBlack('text'),        '\x1B[40mtext\x1B[49m');
    test.strictEqual(colog.backgroundBlack('text'),   '\x1B[40mtext\x1B[49m');
    test.strictEqual(colog.bgBlack('text', true),        '\x1B[100mtext\x1B[109m');
    test.strictEqual(colog.backgroundBlack('text', true),   '\x1B[100mtext\x1B[109m');

    test.strictEqual(colog.bgRed('text'),        '\x1B[41mtext\x1B[49m');
    test.strictEqual(colog.backgroundRed('text'),   '\x1B[41mtext\x1B[49m');
    test.strictEqual(colog.bgRed('text', true),        '\x1B[101mtext\x1B[109m');
    test.strictEqual(colog.backgroundRed('text', true),   '\x1B[101mtext\x1B[109m');

    test.strictEqual(colog.bgGreen('text'),        '\x1B[42mtext\x1B[49m');
    test.strictEqual(colog.backgroundGreen('text'),   '\x1B[42mtext\x1B[49m');
    test.strictEqual(colog.background('text', 'green'),   '\x1B[42mtext\x1B[49m');
    test.strictEqual(colog.bgGreen('text', true),        '\x1B[102mtext\x1B[109m');
    test.strictEqual(colog.backgroundGreen('text', true),   '\x1B[102mtext\x1B[109m');

    test.strictEqual(colog.bgYellow('text'),        '\x1B[43mtext\x1B[49m');
    test.strictEqual(colog.backgroundYellow('text'),   '\x1B[43mtext\x1B[49m');
    test.strictEqual(colog.bgYellow('text', true),        '\x1B[103mtext\x1B[109m');
    test.strictEqual(colog.backgroundYellow('text', true),   '\x1B[103mtext\x1B[109m');

    test.strictEqual(colog.bgBlue('text'),        '\x1B[44mtext\x1B[49m');
    test.strictEqual(colog.backgroundBlue('text'),   '\x1B[44mtext\x1B[49m');
    test.strictEqual(colog.bgBlue('text', true),        '\x1B[104mtext\x1B[109m');
    test.strictEqual(colog.backgroundBlue('text', true),   '\x1B[104mtext\x1B[109m');


    test.strictEqual(colog.bgMagenta('text'),        '\x1B[45mtext\x1B[49m');
    test.strictEqual(colog.backgroundMagenta('text'),   '\x1B[45mtext\x1B[49m');
    test.strictEqual(colog.bgMagenta('text', true),        '\x1B[105mtext\x1B[109m');
    test.strictEqual(colog.backgroundMagenta('text', true),   '\x1B[105mtext\x1B[109m');

    test.strictEqual(colog.bgCyan('text'),        '\x1B[46mtext\x1B[49m');
    test.strictEqual(colog.backgroundCyan('text'),   '\x1B[46mtext\x1B[49m');
    test.strictEqual(colog.bgCyan('text', true),        '\x1B[106mtext\x1B[109m');
    test.strictEqual(colog.backgroundCyan('text', true),   '\x1B[106mtext\x1B[109m');

    test.strictEqual(colog.bgWhite('text'),        '\x1B[47mtext\x1B[49m');
    test.strictEqual(colog.backgroundWhite('text'),   '\x1B[47mtext\x1B[49m');
    test.strictEqual(colog.bgWhite('text', true),        '\x1B[107mtext\x1B[109m');
    test.strictEqual(colog.backgroundWhite('text', true),   '\x1B[107mtext\x1B[109m');

    test.done();
};


exports.textEffects = function(test){
    test.strictEqual(colog.b('text'),        '\x1B[1mtext\x1B[22m');
    test.strictEqual(colog.bold('text'),        '\x1B[1mtext\x1B[22m');

    test.strictEqual(colog.u('text'),        '\x1B[4mtext\x1B[24m');
    test.strictEqual(colog.underline('text'),        '\x1B[4mtext\x1B[24m');

    test.strictEqual(colog.i('text'),        '\x1B[7mtext\x1B[27m');
    test.strictEqual(colog.inverse('text'),        '\x1B[7mtext\x1B[27m');

    test.strictEqual(colog.s('text'),        '\x1B[9mtext\x1B[29m');
    test.strictEqual(colog.strike('text'),        '\x1B[9mtext\x1B[29m');

    test.done();
};


exports.progress = function (test) {
    var str = '';

    str = colog.progress(0, 10, [], true);
    test.strictEqual(str, '\r░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ~ 0% (0 / 10)');

    str = colog.progress(1, 10, [], true);
    test.strictEqual(str, '\r▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ~ 10% (1 / 10)');

    colog.configureProgress('░', '▓', 10, []);
    str = colog.progress(1, 10, [], true);
    test.strictEqual(str, '\r▓░░░░░░░░░ ~ 10% (1 / 10)');

    colog.setProgressDescription('Module1')
    str = colog.progress(2, 10, [], true);
    test.strictEqual(str, '\r▓▓░░░░░░░░ ~ 20% (2 / 10) Module1');

    test.done();
};

exports.format = function (test) {
    var str = colog.getFormat('<black>text</black>');
    test.strictEqual(str, '\x1B[30mtext\x1B[39m');

    str = colog.getFormat('<b><black>text</black></b>');
    test.strictEqual(str, '\x1B[1m\x1B[30mtext\x1B[39m\x1B[22m');

    str = colog.getFormat('</b></black>text<black></b>');
    test.strictEqual(str, '</b></black>text<black></b>');

    str = colog.stripFormat('<b><black>text</black></b>');
    test.strictEqual(str, 'text');

    test.done();
}