'use strict';

var colog = require('../src/colog'),
    util = require('util');

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
colog.log(colog.bgYellow('colog.format("<b>Bold</b> <red>red</red> <b><green>bold and green</green></b>");') + ' to get ' + colog.getFormat('"<b>Bold</b> <red>red</red> <b><green>bold and green</green></b>"'));

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
colog.format('\n<u><b>* ATTENTION:</b> <yellow>Since version 2.x colog break backward compatibility. Progress bar has been rewritten!</yellow></u>');

colog.info('To create progress bar with 20 bars simply use:');
colog.headerError('colog.progress(0, 20);');
colog.info('This will create progress bar like this:\n');

colog.progress(0, 20);

colog.info('\nIf you want to create progress bar with let say 5 bars filled, do it like this:');
colog.headerError('colog.progress(5, 20);');
colog.log('');

colog.progress(5, 20);

colog.info('\nIt is easy to loose track of last value of progress bar in complex program\nso just execute this to increase bar:');
colog.headerError('colog.progress()');
colog.log('');

colog.progress();

colog.info('\nAnd if you did something complex that is worth 5 steps you can catch up this way:');
colog.headerError('colog.progress(5)');
colog.log('');

colog.progress(5);

colog.info('\nSometimes we want to reconfigure our progress bar. We can do that:');

colog.headerError("colog.configureProgress('-', 'X', 10, [ 'red' ]);");
colog.log('');

colog.configureProgress('-', 'X', 10, [ 'red' ]);
colog.progress();

colog.info(colog.yellow('\nWe just used "-" as empty part of bar, "X" to show full part.\nWe shortened progress bar to 10 bars and applied red color.'));

colog.nl();

colog.format('\n\n<bgGreen>- FORMAT\n-----------------------------------------</bgGreen>\n');

colog.info('Colog .format() function that allow to apply multiple effects using XML tags now works like utils.format. So you can do this:');
colog.headerError('colog.format("My name is <yellow>%s</yellow>, I\'m <red>%d</red> years old", "Dariusz", 26);');
colog.format("My name is <yellow>%s</yellow>, I\'m <red>%d</red> years old", "Dariusz", 26);
colog.nl();

colog.format('\n\n<bgGreen>- STATUS\n-----------------------------------------</bgGreen>\n');
colog.info('Also colog now is in possesion of .status() method that allow to display status on the right side of the console. You can use it like this:');
colog.headerError("colog.status('Module messages', 'OK', [], ['green']);");
colog.status('Module messages', 'OK', [], ['green']);
colog.nl();

colog.headerError("colog.status('Module messages', 'ERROR', ['yellow'], ['red']);");
colog.status('Module messages', 'ERROR', ['yellow'], ['red']);
colog.nl();

colog.info('Also you can use complex format:');
colog.headerError('colog.status("<b>Module</b> <yellow>messages</yellow> status:", "<b>[<green>OK</green>]</b>");');
colog.status("<b>Module</b> <yellow>messages</yellow> status:", "<b>[<green>OK</green>]</b>");
colog.nl();
colog.headerError('colog.status("<b>Module</b> <yellow>messages</yellow> status:", "<b>[<red>ERROR</red>]</b>");');
colog.status("<b>Module</b> <yellow>messages</yellow> status:", "<b>[<red>ERROR</red>]</b>");
colog.nl();

colog.headerSuccess('\n  DONE \n  This is all you can get right now with colog.\n  Good luck\n  Półtorak Dariusz <poltorak.dariusz@gmail.com>\n');