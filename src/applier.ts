/**
 * It takes a function (fn) and return a function that receive a list of arguments
 * in an array-like format and call fn with those args as it was a non array receiving function
 * 
 * 
 * @param fn 
 * @param args 
 * @returns {Function}
 */
export const applier = (fn: Function) => (args: any[]) => fn?.apply(null, args);
