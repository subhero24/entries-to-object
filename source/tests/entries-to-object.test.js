import Test from 'node:test';

import assert from 'node:assert/strict';
import entriesToObject from '../index.js';

Test('property', () => {
	let data = [['a', 'x']];

	let result = entriesToObject(data);

	assert.equal(result.a, 'x');
});

Test('properties', () => {
	let data = [
		['a', 'x'],
		['b', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a, 'x');
	assert.equal(result.b, 'y');
});

Test('nested properties', () => {
	let data = [
		['a.b', 'x'],
		['a.c', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.b, 'x');
	assert.equal(result.a.c, 'y');
});

Test('deeply nested properties', () => {
	let data = [
		['a.b.c', 'x'],
		['a.d.e', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.b.c, 'x');
	assert.equal(result.a.d.e, 'y');
});

Test('arrays', () => {
	let data = [
		['a[]', 'x'],
		['a[]', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0], 'x');
	assert.equal(result.a[1], 'y');
});

Test('array properties', () => {
	let data = [
		['a[].b', 'x'],
		['a[].c', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 1);
	assert.equal(result.a[0].b, 'x');
	assert.equal(result.a[0].c, 'y');
});

Test('array duplicate properties', () => {
	let data = [
		['a[].b', 'x'],
		['a[].b', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0].b, 'x');
	assert.equal(result.a[1].b, 'y');
});

Test('array deep duplicate properties', () => {
	let data = [
		['a[].b.c.d', 'x'],
		['a[].b.c.d', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0].b.c.d, 'x');
	assert.equal(result.a[1].b.c.d, 'y');
});

Test('array deep properties', () => {
	let data = [
		['a[].b.c.d', 'x'],
		['a[].b.c.e', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 1);
	assert.equal(result.a[0].b.c.d, 'x');
	assert.equal(result.a[0].b.c.e, 'y');
});

Test('nested array duplicate properties', () => {
	let data = [
		['a[].b.c[].d', 'x'],
		['a[].b.c[].d', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 1);
	assert.equal(result.a[0].b.c.length, 2);
	assert.equal(result.a[0].b.c[0].d, 'x');
	assert.equal(result.a[0].b.c[1].d, 'y');
});

Test('nested array properties', () => {
	let data = [
		['a[].b.c[].d', 'x'],
		['a[].b.c[].e', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 1);
	assert.equal(result.a[0].b.c.length, 1);
	assert.equal(result.a[0].b.c[0].d, 'x');
	assert.equal(result.a[0].b.c[0].e, 'y');
});

Test('invalid properties', () => {
	let data = [
		['a', 'x'],
		['a.b', 'y'],
	];

	assert.throws(() => {
		entriesToObject(data);
	});
});

Test('array different shape', () => {
	let data = [
		['a[]', 'x'],
		['a[].b', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0], 'x');
	assert.equal(result.a[1].b, 'y');
});

Test('nested array indexing', () => {
	let data = [
		['a[].b.c[0].d', 'x'],
		['a[].b.c[0].d', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0].b.c[0].d, 'x');
	assert.equal(result.a[1].b.c[0].d, 'y');
});

Test('array indexing', () => {
	let data = [
		['a[0].b', 'x'],
		['a[1].b', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 2);
	assert.equal(result.a[0].b, 'x');
	assert.equal(result.a[1].b, 'y');
});

Test('array indexing duplicate properties', () => {
	let data = [
		['a[0].b', 'x'],
		['a[2].b', 'y'],
	];

	let result = entriesToObject(data);

	assert.equal(result.a.length, 3);
	assert.equal(result.a[0].b, 'x');
	assert.equal(result.a[1], undefined);
	assert.equal(result.a[2].b, 'y');
});
