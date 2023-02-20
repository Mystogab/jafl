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
