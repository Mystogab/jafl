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
