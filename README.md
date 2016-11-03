# regex-foreach

Loop over simple regex matches.

## Example

``` javascript
var regexForEach = require('regex-foreach');

regexForEach('hello', 'hello there, hey hello!', function (match, index) {
    console.log(match, index);
});

// Outputs:
// hello 0
// hello 17


regexForEach(/e. /g, 'hello there, hey hello!', function (match, index) {
    console.log(match, index);
});

// Outputs:
// e,  10
// ey  14


regexForEach(/e. /, 'hello there, hey hello!', function (match, index) {
    console.log(match, index);
});

// Outputs:
// e,  10


regexForEach(/(l),(d)/g, 'l l,d l l,d l', function (match, index, raw) {
    console.log(raw);
});

// Outputs:
// [ 'l,d', 'l', 'd', index: 2, input: 'l l,d l l,d l' ]
// [ 'l,d', 'l', 'd', index: 8, input: 'l l,d l l,d l' ]

```
