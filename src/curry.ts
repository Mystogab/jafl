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
