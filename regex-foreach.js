module.exports = function (regex, value, fn) {
    if (typeof regex === 'string') regex = new RegExp(regex, 'g');
    var match;
    var greedy = regex.flags.indexOf('g') >= 0;
    if(greedy) {
        while (match = regex.exec(value)) {
            fn(match[0], match.index);
        }
    } else {
        if(match = regex.exec(value)){
            fn(match[0], match.index);
        }
    }
};
