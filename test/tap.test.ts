import { tap } from '../src/index';

describe('using tap', () => {
  test('It should excecute a function returning the same imput', async () => {
    let someStr: string = '';
    
    // Side effect function:
    const badFunction = (name: string) => {
      someStr = `${someStr}${name}`;
      return `Hey ${name}!, welcome!`;
    };

    const result = await tap(badFunction)('John');

    expect(result).toBe('John');
    expect(someStr).toBe('John');
    const otherResult = await tap(badFunction)('Foo');
    expect(otherResult).toBe('Foo');
    expect(someStr).toBe('JohnFoo');
  });
});
