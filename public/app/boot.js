// Demo code, delete before proceeding
var foo = require('./helpers/foo'),
    bar = require('./helpers/bar');

console.log(foo, bar);

document.getElementById('output').innerHTML = foo.init() + bar;