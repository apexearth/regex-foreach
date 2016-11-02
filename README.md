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
```
