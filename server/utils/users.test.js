const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Mike',
        room: 'Node Course',
      },
      {
        id: '2',
        name: 'Jen',
        room: 'React Course',
      },
      {
        id: '3',
        name: 'Julie',
        room: 'Node Course',
      }
    ]
  })

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

  it('should remove an user', () => {
    var user = users.removeUser('2');

    expect(users.users.length).toBe(2);
    expect(user.id).toBe('2');
  });

  it('should not remove user', () => {
    var user = users.removeUser('5');

    expect(users.users.length).toBe(3);
    expect(user).toNotExist();
  });

  it('should find user', () => {
    const user = users.getUser('1');
    expect(user.id).toBe('1');
  })

  it('should not get user', () => {
    const user = users.getUser('1sdgfds');
    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  })

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  })
})