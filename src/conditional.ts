
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
  