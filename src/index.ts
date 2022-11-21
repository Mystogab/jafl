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
