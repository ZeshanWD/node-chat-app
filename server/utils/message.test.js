const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'zeshan';
    const text = 'This is a message';
    const res = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({ from, text });
  });
})
