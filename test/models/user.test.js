const test = require('ava');
const User = require('../../app/models/user');

let user;
test.beforeEach(t => {
    user = new User({ email: 'test@test.test', password: 's1mpl3', createdOn: new Date(), lastLogin: new Date(), role: 'user' });
});

test('should have an email', t => {
    t.not(user.email, '', ['does not have an email']);
});

test('should have a password', t => {
    t.not(user.password, '', ['does not have an password']);
});

test('should have a createdOn date', t => {
    t.not(user.createdOn, '', ['does not have an createdOn date']);
    t.is(typeof user.createdOn, 'object', ['is not typeof Date']);
});

test('should have a lastLogin date', t => {
    t.not(user.lastLogin, '', ['does not have an lastLogin date']);
    t.is(typeof user.lastLogin, 'object', ['is not typeof Date']);
});

test('should have a role', t => {
    t.not(user.role, '', ['does not have an role']);
});