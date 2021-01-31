let calc = require('./calculations');
let assert = require('chai').assert;

describe('Test', function() {
    it('Should return the sum of two numbers', () => {
        let result = calc.calculate(2, 14);
        assert.equal(result, 16);
    });
});

describe('Multiplication', function() {
    it('Should return the multiplication of two numbers', () => {
        let result = calc.multiply(11, 8);
        assert.equal(result, 88);
    });
});

describe('Call my name', function() {
    it('Should greet with the name that is parsed to the function', () => {
        let result = calc.callName('Dragul');
        assert.equal(result, 'Hello my name is Dragul');
    })
});

describe('Boolean', function() {
    it('Should expect to be boolean', () => {
        let result = calc.test(false);
        assert.isNumber(result);
    })
});