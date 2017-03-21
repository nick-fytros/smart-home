const test = require('ava');
const AppError = require('../../app/models/appError');

let error;
test.beforeEach(t => {
	error = new AppError('test message', 100);
});

test('AppError should have the default Error stack trace property', t => {
	t.not(error.Error, {}, ['does not have the default error stack trace property']);
});

test('AppError should have the custom message and status properties', t => {
	t.not(error.message, '', ['does not have the custom message property']);
	t.not(error.status, 0, ['does not have the custom status property']);
});