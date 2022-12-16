import { _, curry, take } from '../src/index';

describe('using curry', () => {
  test('It should give the same result in any combination', () => {
    const greeter = (premsg: string, msg: string, postmsg: string) => {
      return `${premsg} ${msg} ${postmsg}`;
    };

    const greeterWithCurry = curry(greeter);
    const expectedResult = 'Hello somebody !';

    expect(greeterWithCurry('Hello', 'somebody', '!')).toBe(expectedResult);
    expect(greeterWithCurry('Hello')('somebody', '!')).toBe(expectedResult);
    expect(greeterWithCurry('Hello')('somebody')('!')).toBe(expectedResult);
    expect(greeterWithCurry('Hello', 'somebody')('!')).toBe(expectedResult);
  });

  test('It should give same result using placeholder anywhere', () => {
    const greeter = (premsg: string, msg: string, postmsg: string) => {
      return `${premsg} ${msg} ${postmsg}`;
    };

    const greeterWithCurry = curry(greeter);
    const expectedResult = 'Hello somebody !';

    // with one placeholder
    expect(greeterWithCurry('Hello', 'somebody', _)('!')).toBe(expectedResult);
    expect(greeterWithCurry(_, 'somebody', '!')('Hello')).toBe(expectedResult);
    expect(greeterWithCurry('Hello', _, '!')('somebody')).toBe(expectedResult);

    // with two placeholders
    expect(greeterWithCurry('Hello', _, _)('somebody', '!')).toBe(expectedResult);
    expect(greeterWithCurry(_, 'somebody', _)('Hello', '!')).toBe(expectedResult);
    expect(greeterWithCurry(_, _, '!')('Hello', 'somebody')).toBe(expectedResult);

    // with nested placeholders
    expect(greeterWithCurry('Hello')(_, '!')('somebody')).toBe(expectedResult);
    expect(greeterWithCurry(_, 'somebody', _)(_, '!')('Hello')).toBe(expectedResult);
    expect(greeterWithCurry(_, _, '!')(_, 'somebody')('Hello')).toBe(expectedResult);
  });
});

describe('using take', () => {
  test('it should work properly', () => {
    const obj = {
      name: 'Someone',
      address: {
        number: 1212,
        name: 'fakestreet'
      },
      age: 99,
      some: {
        very: {
          nested: {
            property: 'foo'
          }
        }
      }
    };

    expect(take('address.number', 'some.very.nested.property')(obj))
      .toEqual([ 1212, 'foo']);

    expect(take('name')(obj)).toBe('Someone');

    expect(take('address.name')(obj)).toBe('fakestreet');

    expect(take('address.name', 'age')(obj))
      .toEqual(['fakestreet', 99]);
  });
});
