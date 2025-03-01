import Test from 'node:test';

import assert from 'node:assert/strict';

import { getKey } from '../index.js';

Test('property', () => {
	let object = { a: 'x' };

	let result = getKey(object, 'a');

	assert.equal(result, 'x');
});

Test('nested property', () => {
	let object = { a: { b: 'x' } };

	let result = getKey(object, 'a.b');

	assert.equal(result, 'x');
});

Test('deeply nested property', () => {
	let object = { a: { b: { c: 'x' } } };

	let result = getKey(object, 'a.b.c');

	assert.equal(result, 'x');
});

Test('arrays', () => {
	let object = { a: ['x'] };

	let result = getKey(object, 'a[0]');

	assert.equal(result, 'x');
});

Test('arrays index', () => {
	let object = { a: ['x', 'y'] };

	let result = getKey(object, 'a[1]');

	assert.equal(result, 'y');
});

Test('array properties', () => {
	let object = { a: [{ b: 'x' }] };

	let result = getKey(object, 'a[0].b');

	assert.equal(result, 'x');
});

Test('array index properties', () => {
	let object = { a: [{ b: 'x' }, { b: 'y' }] };

	let result = getKey(object, 'a[1].b');

	assert.equal(result, 'y');
});

Test('nested arrays', () => {
	let object = { a: [{ b: { c: [{ d: 'x' }] } }] };

	let result = getKey(object, 'a[0].b.c[0].d');

	assert.equal(result, 'x');
});

Test('invalid properties', () => {
	let object = {};

	let result = getKey(object, 'a');

	assert.equal(result, undefined);
});

Test('invalid deep properties', () => {
	let object = {};

	let result = getKey(object, 'a.b');

	assert.equal(result, undefined);
});
