var expect = require('chai').expect;
var regexForEach = require('./regex-foreach');

describe('regex.js', function () {
    var iterations;
    it('single match using string', function () {
        iterations = 0;
        regexForEach('hello', 'hello there', function (match, index) {
            expect(match).to.equal('hello');
            expect(index).to.equal(0);
            iterations++;
        });
        expect(iterations).to.equal(1);
    });
    it('multiple matches using string', function () {
        iterations = 0;
        regexForEach('hello', 'hello there, hey hello!', function (match, index) {
            if (iterations === 0) {
                expect(match).to.equal('hello');
                expect(index).to.equal(0);
            } else if (iterations === 1) {
                expect(match).to.equal('hello');
                expect(index).to.equal(17);
            }
            iterations++;
        });
        expect(iterations).to.equal(2);
    });
    it('many matches using string', function () {
        iterations = 0;
        regexForEach('l', 'l l l l l', function (match, index) {
            expect(match).to.equal('l');
            expect(index).to.equal(iterations * 2);
            iterations++;
        });
        expect(iterations).to.equal(5);
    });

    it('single match using RegExp, not greedy', function () {
        iterations = 0;
        regexForEach(/hello/, 'hello there', function (match, index) {
            expect(match).to.equal('hello');
            expect(index).to.equal(0);
            iterations++;
        });
        expect(iterations).to.equal(1);
    });
    it('multiple matches using RegExp, not greedy', function () {
        iterations = 0;
        regexForEach(/hello/, 'hello there, hey hello!', function (match, index) {
            if (iterations === 0) {
                expect(match).to.equal('hello');
                expect(index).to.equal(0);
            }
            iterations++;
        });
        expect(iterations).to.equal(1);
    });
    it('multiple matches using RegExp, not greedy', function () {
        iterations = 0;
        regexForEach(/l/, 'l l l l l', function (match, index) {
            expect(match).to.equal('l');
            expect(index).to.equal(iterations * 2);
            iterations++;
        });
        expect(iterations).to.equal(1);
    });

    it('single match using RegExp, greedy', function () {
        iterations = 0;
        regexForEach(/hello/g, 'hello there', function (match, index) {
            expect(match).to.equal('hello');
            expect(index).to.equal(0);
            iterations++;
        });
        expect(iterations).to.equal(1);
    });
    it('multiple matches using RegExp, greedy', function () {
        iterations = 0;
        regexForEach(/hello/g, 'hello there, hey hello!', function (match, index) {
            if (iterations === 0) {
                expect(match).to.equal('hello');
                expect(index).to.equal(0);
            } else if (iterations === 1) {
                expect(match).to.equal('hello');
                expect(index).to.equal(17);
            }
            iterations++;
        });
        expect(iterations).to.equal(2);
    });
    it('multiple matches using RegExp, greedy', function () {
        iterations = 0;
        regexForEach(/l/g, 'l l l l l', function (match, index) {
            expect(match).to.equal('l');
            expect(index).to.equal(iterations * 2);
            iterations++;
        });
        expect(iterations).to.equal(5);
    });
    it('multiple matches, longer string', function () {
        iterations = 0;
        var hits = 0;
        var line = 'There is only ten with many within.\n';
        var string = '';
        for (var i = 0; i < 1000; i++) {
            string += line;
        }
        regexForEach(/e./g, string, function (match, index) {
            if (index === line.length * iterations / 3 + 2) {
                expect(match).to.equal('er');
                expect(index).to.equal(line.length * iterations / 3 + 2);
                hits++;
            } else if (index === line.length * (iterations - 1) / 3 + 4) {
                expect(match).to.equal('e ');
                expect(index).to.equal(line.length * (iterations - 1) / 3 + 4);
                hits++;
            } else if (index === line.length * (iterations - 2) / 3 + 15) {
                expect(match).to.equal('en');
                expect(index).to.equal(line.length * (iterations - 2) / 3 + 15);
                hits++;
            }
            iterations++;
        })
        expect(iterations).to.equal(3000);
        expect(hits++).to.equal(3000);
    })
});
