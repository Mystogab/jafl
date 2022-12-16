const combine = async (result: any, nextFn: Function) => nextFn(await result);

/**
 * It takes N functions as parameter, and return a single function
 * that when is called will invoke the first function with the input, and then
 * passthrough the output to the next function input, creating a pipe.
 * @param {...Function} fns Open ended arguments of functions to compose
 * @returns {Function} The Async resultant function that pipes data
 */
export const pipe = (...fns: Function[]) => async (input: any) => fns
  .reduce(combine, input);

/**
 * It takes a function (fn), and return and async function that when is invoked with and input
 * will excecute the original function over the input (fn(input)) but instead of returning the function
 * invocation output, returns the original input
 * @param {Function} fn The function that will be wraped
 * @returns {Function} The Async resultant function that excecute original and return the given input
 */
  export const tap = (fn: Function) => async (input: any) => {
  await fn(input);
  return input;
};

/**
 * It takes two functions, a conditionalCheckFn, and a conditionalAppliedFn, and return a
 * new function that takes and input and check if the resulto of apply conditionalCheckFn
 * to input is true, then return conditionalAppliedFn(input), and if it is false, it
 * will return the input without applying any function
 * @param condtionalCheckFn A function that evaluates input and return true or false
 * @param conditionalAppliedFn A function that will be executed over input, if conditionalCheckFn
 * result is true
 * @returns {Function} A function that will return b(input), if a(input) is true
 */
export const conditional = (
  condtionalCheckFn: Function,
  conditionalAppliedFn: Function
  ) => async (input: any) => (await condtionalCheckFn(await input)) ? conditionalAppliedFn(await input) : input;

const _takeSingleProp = (input: any) => (key: string) => {
  if (!key.includes('.')) return input?.[key];

  const propList = key.split('.');
  return propList
    .reduce((p: any, a: any) => (typeof p === 'string') ? input?.[p]?.[a] : p?.[a]);
};

/**
 * It takes a key that could be a string like 'name', or a chained access like: 'address.number'
 * and return a function that takes an object and return the value of that key.
 * In addition it can take multiple of this keys as multiple arguments, and in that case
 * it will return an array with every value in the same order as requested
 * 
 * i.e: 
 * obj = { name: 'Some', address: { number: 33, isReal: false }};
 * 
 * tale('name')(obj) // -> 'Some'
 * 
 * take('adress.number')(obj) // -> 33
 * 
 * take('address.number', 'id', 'name')(obj) // -> [33, undefined, 'Some']
 * @param key The key or the key path that you want to take
 * @returns {Function} A function that takes and object and return the value of the given key
 */
export const take = (...keys: string[]) => (input: any) => {
  if (!keys) return undefined;

  if (keys.length > 1) return keys.map(_takeSingleProp(input));
  return _takeSingleProp(input)(keys[0]);
};

/**
 * Placeholder for curry functions
 */
export const _ = Symbol();

/**
 * It takes a functions and return a curried version of that function
 * see https://en.wikipedia.org/wiki/Currying
 * @param functionToCurry The input function that will be curried
 * @returns {Function} Curried equivalent function
 */
export const curry = (functionToCurry: Function, numberOfArguments = functionToCurry.length) => {
  const waitForArguments = (...attrs: any[]) => {
    const waitForMoreArguments = (...nextAttrs: any[]) => {
      const filledAttrs = attrs.map(attr => {
        // if any of attrs is placeholder _, nextAttrs should first fill that
        return attr === _ && nextAttrs.length ?
          nextAttrs.shift() :
          attr;
      });
      return waitForArguments(...filledAttrs, ...nextAttrs);
    };

    // wait for all arguments to be present and not skipped
    return attrs.filter(arg => arg !== _).length >= numberOfArguments ?
      functionToCurry(...attrs) :
      waitForMoreArguments;
  };

  return waitForArguments;
};

