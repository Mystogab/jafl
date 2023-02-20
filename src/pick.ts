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
export const pick = (...keys: string[]) => (input: any) => {
  if (!keys) return undefined;

  if (keys.length > 1) return keys.map(_takeSingleProp(input));
  return _takeSingleProp(input)(keys[0]);
};
