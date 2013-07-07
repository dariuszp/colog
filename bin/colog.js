'use strict';

var colog = require('../lib/colog');

colog.logo();
colog.success('Changes in 1.4');
colog.format('Instead of <colorGreen>T<underline>hi</underline>s</colorGreen> <strike><bold>is</bold></strike> <backgroundRed>SPARTA<inverse>!</inverse></backgroundRed>');
colog.format('use <green>T<u>hi</u>s</green> <s><b>is</b></s> <bgRed>SPARTA<i>!</i></bgRed>');
colog.log(colog.red('This is red using colog.red() insead of colog.colorRed()'));
colog.log(colog.bgGreen('This green background is made by colog.bgGreen() instead of colog.backgroundGreen()'));
colog.log('And you can use <b></b> instead of <bold></bold> with format function');
colog.info('Other changes are in wiki');
colog.log('');
colog.error('OTHER FEATURES:');
colog.log('');
colog.info('Info');
colog.success('Success');
colog.warning('Warning');
colog.error('Error');
colog.question('Question?');
colog.answer('Answer!');
colog.log('');
colog.headerInfo('Info');
colog.headerSuccess('Success');
colog.headerWarning('Warning');
colog.headerError('Error');
colog.headerQuestion('Question?');
colog.headerAnswer('Answer!');
colog.log('');
colog.log(colog.backgroundWhite(colog.colorCyan('You can use:')));
colog.log(colog.getAllEffects().join(', '));
colog.log('');
colog.log(colog.color('Like this: ', 'red') + colog.background('colog.background("message", yellow);', 'yellow'));
colog.log(colog.color('or like this: ', 'cyan') + colog.backgroundYellow('colog.backgroundYellow("message");'));
colog.log(colog.color('or even like this: ', 'cyan') + colog.apply('colog.apply("message", ["backgroundYellow"]);', ['backgroundYellow']));
colog.log('');
colog.log(colog.backgroundWhite(colog.colorCyan('You can also combine effects:')));
colog.log(colog.color('Like this: ', 'cyan') + colog.colorRed(colog.backgroundYellow('colog.colorRed(colog.backgroundYellow("message"));')));
colog.log(colog.color('or like this: ', 'cyan') + colog.apply('colog.apply("message", ["colorRed", "backgroundYellow"]);', ['colorRed', 'backgroundYellow']));
colog.log('');
colog.log(colog.backgroundWhite(colog.colorCyan('And you can have multi color/effect string:')));
colog.log(colog.colorCyan("colog.log(colog.bold(colog.colorRed('This')) + ' ' + colog.apply('is', ['underline', 'colorYellow']) + ' ' + colog.colorGreen('SPARTA') + colog.inverse('!'));"));
colog.info('That will show:\n---------------------------');
colog.log(colog.bold(colog.colorRed('This')) + ' ' + colog.apply('is', ['underline', 'colorYellow']) + ' ' + colog.colorGreen('SPARTA') + colog.inverse('!'));
colog.log('');
colog.error('Cool right ?');
colog.info('So use this: "' + colog.getAllEffects().join('", "') + '"' + colog.colorGreen(' like this:'));
colog.headerInfo('<bold><colorRed>This</colorRed></bold> <underline><colorYellow>is</colorYellow></underline> <colorGreen>SPARTA</colorGreen> <inverse>!</inverse>');
colog.info('So you can get this:');
colog.format('colog.format(<bold><colorRed>This</colorRed></bold> <underline><colorYellow>is</colorYellow></underline> <colorGreen>SPARTA</colorGreen><inverse>!</inverse>);');
colog.log('but that one is slower because of multiple use of regexp');
colog.log('');
colog.log('Progress bar');
colog.log('');

colog.configureProgress('-', 'X', undefined, undefined, true, 'PROGRESS: ', [ 'bgGreen' ]);

var i = false;
colog.progress(20);
i = setInterval(function () {
    var t = colog.progress();
    if (t[0] === t[1]) {
        clearInterval(i);
        colog.success('THAT IS ALL. HAVE A NICE DAY!');
    }
}, 200)