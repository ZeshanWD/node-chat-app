const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '1234',
      name: 'zeshan',
      room: 'dev',
    }
    var res = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  })
})