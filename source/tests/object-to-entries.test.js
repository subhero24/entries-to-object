import Test from 'node:test';

import assert from 'node:assert/strict';

import { objectToEntries } from '../index.js';

Test('property', () => {
	let object = { a: 'x' };

	let entries = objectToEntries(object);

	assert.deepEqual(entries, [['a', 'x']]);
});

Test('properties', () => {
	let object = { a: 'x', b: 'y' };

	let entries = objectToEntries(object);

	assert.deepEqual(entries, [
		['a', 'x'],
		['b', 'y'],
	]);
});

Test('nested properties', () => {
	let object = { a: { b: 'x' } };

	let entries = objectToEntries(object);

	assert.deepEqual(entries, [['a.b', 'x']]);
});

Test('deeply nested properties', () => {
	let object = { a: { b: { c: 'x' } } };

	let entries = objectToEntries(object);

	assert.deepEqual(entries, [['a.b.c', 'x']]);
});

Test('arrays', () => {
	let object = { a: ['x'] };

	let entries = objectToEntries(object);

	assert.deepEqual(entries, [['a[0]', 'x']]);
});
