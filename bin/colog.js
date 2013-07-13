'use strict';

var colog = require('../lib/colog');

colog.logo();


colog.format('\n\n<bgGreen>- BASIC USAGE\n-----------------------------------------</bgGreen>\n');

colog.info('colog.info("message")');
colog.success('colog.success("message")');
colog.error('colog.error("message")');
colog.warning('colog.warning("message")');
colog.question('colog.question("message")');
colog.answer('colog.answer("message")');

colog.log('');

colog.headerInfo('colog.headerInfo("message")');
colog.headerSuccess('colog.headerSuccess("message")');
colog.headerError('colog.headerError("message")');
colog.headerWarning('colog.headerWarning("message")');
colog.headerQuestion('colog.headerQuestion("message")');
colog.headerAnswer('colog.headerAnswer("message")');


colog.format('\n\n<bgGreen>- COLORS AND BACKGROUND\n-----------------------------------------</bgGreen>\n');

colog.log(colog.black('colog.log(colog.black("message"))'));
colog.log(colog.red('colog.log(colog.red("message"))'));
colog.log(colog.green('colog.log(colog.green("message"))'));
colog.log(colog.yellow('colog.log(colog.yellow("message"))'));
colog.log(colog.blue('colog.log(colog.blue("message"))'));
colog.log(colog.magenta('colog.log(colog.magenta("message"))'));
colog.log(colog.cyan('colog.log(colog.cyan("message"))'));
colog.log(colog.white('colog.log(colog.white("message"))'));

colog.format('\n<u><b>* ATTENTION:</b> <yellow>you can also use color prefix like <b>colog.colorRed("message")</b> for each color</yellow></u>');

colog.log('');

colog.log(colog.bgBlack('colog.log(colog.bgBlack("message"))'));
colog.log(colog.bgRed('colog.log(colog.bgRed("message"))'));
colog.log(colog.bgGreen('colog.log(colog.bgGreen("message"))'));
colog.log(colog.bgYellow('colog.log(colog.bgYellow("message"))'));
colog.log(colog.bgBlue('colog.log(colog.bgBlue("message"))'));
colog.log(colog.bgMagenta('colog.log(colog.bgMagenta("message"))'));
colog.log(colog.bgCyan('colog.log(colog.bgCyan("message"))'));
colog.log(colog.bgWhite('colog.log(colog.bgWhite("message"))'));

colog.format('\n<u><b>* ATTENTION:</b> <yellow>you can also use background prefix istead of bg like <b>colog.backgroundRed("message")</b> for each color</yellow></u>');

colog.log('');
//var i = false;
//colog.progress(20);
//i = setInterval(function () {
//    var t = colog.progress();
//    if (t[0] === t[1]) {
//        clearInterval(i);
//        colog.success('THAT IS ALL. HAVE A NICE DAY!');
//    }
//}, 200)