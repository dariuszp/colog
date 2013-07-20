'use strict';

var colog = require('../lib/colog'),
    util = require('util');

colog.logo();


colog.format('\n\n<bgGreen>- BASIC USAGE\n-----------------------------------------</bgGreen>\n');

colog.log('colog.log("message");');

colog.info('colog.info("message");');
colog.success('colog.success("message");');
colog.error('colog.error("message");');
colog.warning('colog.warning("message");');
colog.question('colog.question("message");');
colog.answer('colog.answer("message");');

colog.log('');

colog.headerInfo('colog.headerInfo("message");');
colog.headerSuccess('colog.headerSuccess("message");');
colog.headerError('colog.headerError("message");');
colog.headerWarning('colog.headerWarning("message");');
colog.headerQuestion('colog.headerQuestion("message");');
colog.headerAnswer('colog.headerAnswer("message");');


colog.format('\n\n<bgGreen>- COLORS AND BACKGROUND\n-----------------------------------------</bgGreen>\n');

colog.log(colog.black('colog.log(colog.black("message"));'));
colog.log(colog.red('colog.log(colog.red("message"));'));
colog.log(colog.green('colog.log(colog.green("message"));'));
colog.log(colog.yellow('colog.log(colog.yellow("message"));'));
colog.log(colog.blue('colog.log(colog.blue("message"));'));
colog.log(colog.magenta('colog.log(colog.magenta("message"));'));
colog.log(colog.cyan('colog.log(colog.cyan("message"));'));
colog.log(colog.white('colog.log(colog.white("message"));'));

colog.format('\n<u><b>* ATTENTION:</b> <yellow>you can also use color prefix like <b>colog.colorRed("message")</b> for each color</yellow></u>');

colog.log('');

colog.log(colog.bgBlack('colog.log(colog.bgBlack("message"));'));
colog.log(colog.bgRed('colog.log(colog.bgRed("message"));'));
colog.log(colog.bgGreen('colog.log(colog.bgGreen("message"));'));
colog.log(colog.bgYellow('colog.log(colog.bgYellow("message"));'));
colog.log(colog.bgBlue('colog.log(colog.bgBlue("message"));'));
colog.log(colog.bgMagenta('colog.log(colog.bgMagenta("message"));'));
colog.log(colog.bgCyan('colog.log(colog.bgCyan("message"));'));
colog.log(colog.bgWhite('colog.log(colog.bgWhite("message"));'));

colog.format('\n<u><b>* ATTENTION:</b> <yellow>you can also use background prefix istead of bg like <b>colog.backgroundRed("message")</b> for each color</yellow></u>');


colog.format('\n\n<bgGreen>- TEXT EFFECTS\n-----------------------------------------</bgGreen>\n');
colog.log(colog.b('colog.log(colog.b("bold"));'));
colog.log(colog.u('colog.log(colog.u("underline"));'));
colog.log(colog.s('colog.log(colog.s("strike"));'));
colog.log(colog.i('colog.log(colog.i("inverse"));'));

colog.format('\n<u><b>* ATTENTION:</b> <yellow>you can also use full name of effect like <b>colog.bold()</b>, <b>colog.underline()</b>, <b>colog.strike()</b>, <b>colog.inverse()</b></yellow></u>');


colog.format('\n\n<bgGreen>- APPLYING MULTIPLE EFFECTS\n-----------------------------------------</bgGreen>\n');

colog.log(colog.green(colog.bgWhite('colog.log(colog.green(colog.bgWhite("message")));')));
colog.log(colog.apply('colog.log(colog.apply("message", [ "white", "bgRed" ]));', [ 'white', 'bgRed' ]));
colog.log(colog.bgYellow('colog.format("<b>Bold</b> <red>red</red> <b><green>bold and green</green></b>");') + ' to get ' + colog.format('"<b>Bold</b> <red>red</red> <b><green>bold and green</green></b>"', false));

colog.format(util.format('\n<u><b>* ATTENTION:</b> All available effects: <yellow>%s</yellow></u>', colog.getAllEffects().join(', ')));


colog.format('\n\n<bgGreen>- DUMPING VARIABLE\n-----------------------------------------</bgGreen>\n');

colog.info('Let say we have variable like this:');
var variable = {
    'this': 'THIS',
    'is': 'IS',
    'sparta': 'SPARTA!'
};
colog.log(colog.apply("var variable = {\n    this: 'THIS',\n    is: 'IS',\n    sparta: 'SPARTA!'\n};", [ 'yellow' ]));

colog.info('\nYou can dump it with multiple ways:\n');

colog.headerError("colog.log(variable);");
colog.log(variable);
colog.log('');

colog.headerError("colog.dump(variable);");
colog.dump(variable);
colog.log('');

colog.headerError("colog.dump(variable, [ 'bgWhite', 'green' ]);");
colog.dump(variable, [ 'bgWhite', 'green' ]);
colog.log('');

colog.format('\n<u><b>* ATTENTION:</b> <yellow>Dump ignore white spaces in strings like \\n. Also dump turn functions into string and print them.</yellow></u>');

colog.format('\n\n<bgGreen>- PROGRESS BAR\n-----------------------------------------</bgGreen>\n');

colog.info('To create progress bar with 20 bars simply use:');
colog.headerError('colog.progress(20);');
colog.info('This will create progress bar like this:\n');

colog.progress(20);

colog.info('\nIf you want to create progress bar with let say 5 bars filled, do it like this:');
colog.headerError('colog.progress(20, 5);');
colog.log('');

colog.progress(20, 5);

colog.info('\nIt is easy to loose track of last value of progress bar in complex program\nso just execute this to increase bar:');
colog.headerError('colog.progress()');
colog.log('');

colog.progress();

colog.info('\nSometimes we want to reconfigure our progress bar. We can do that:');

colog.headerError("colog.configureProgress('-', 'X', '<', '>', false, 'PROGRESS: ', [ 'red' ]);");
colog.log('');

colog.configureProgress('-', 'X', '<', '>', false, 'PROGRESS:', [ 'red' ]);
colog.progress();

colog.info(colog.yellow('\nWe just used "-" as empty part of bar, "X" to show full part.\nWe added < and > at both side of bar.\nWe decided to not show (7 of 20) at the end.\nWe added "PROGRESS:" prefix AND red color'));

colog.log('');

colog.headerSuccess('\n  DONE \n  This is all you can get right now with colog.\n  Good luck\n  Półtorak Dariusz <poltorak.dariusz@gmail.com>\n');
//var i = false;
//colog.progress(20);
//i = setInterval(function () {
//    var t = colog.progress();
//    if (t[0] === t[1]) {
//        clearInterval(i);
//        colog.success('THAT IS ALL. HAVE A NICE DAY!');
//    }
//}, 200)