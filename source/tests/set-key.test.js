import Test from 'node:test';

import assert from 'node:assert/strict';

import { setKey } from '../index.js';

Test('array index property', () => {
	let object = {};
	let result = setKey(object, 'a[0].b', 'x');

	assert.deepEqual(object, { a: [{ b: 'x' }] });
});
