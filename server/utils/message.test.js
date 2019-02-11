const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'zeshan';
    const text = 'This is a message';
    const res = generateMessage(from, text);

    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({ from, text });
  });
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'zeshan';
    const latitude = 1;
    const longitude = 1;
    const url = 'https://www.google.com/maps?q=1,1';

    const res = generateLocationMessage(from, latitude, longitude);
    expect(res.createdAt).toBeA('number');
    expect(res.url).toBe(url);
    expect(res).toInclude({ from, url });
  });
})
