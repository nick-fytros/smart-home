const test = require('ava');
const AppError = require('../../app/models/app-error');

let error;
test.beforeEach(t => {
	error = new AppError('test message', 100);
});

test('should have the default Error stack trace property', t => {
	t.not(error.Error, {}, ['does not have the default error stack trace property']);
});

test('should have the custom message and status properties', t => {
	t.not(error.message, '', ['does not have the custom message property']);
	t.not(error.status, 0, ['does not have the custom status property']);
});

test('can be thrown', t => {
	const err = t.throws(() => {
		throw error;
	}, AppError);

	t.is(err.message, error.message);
});