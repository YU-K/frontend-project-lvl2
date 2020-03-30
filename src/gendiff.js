import _ from 'lodash';
import { extname } from 'path';
import { parseYml, parseJson } from './parsers';

const result = ['{'];

export default (file1, file2) => {
  let obj1 = null;
  let obj2 = null;
  const format = extname(file1);
  if (format === '.yml') {
    obj1 = parseYml(file1);
    obj2 = parseYml(file2);
  } else if (format === '.json') {
    obj1 = parseJson(file1);
    obj2 = parseJson(file2);
  }
  const keys = Object.keys(obj1);
  keys.push(Object.keys(obj2));

  const allKeys = _.flatten(keys);

  const getDiff = (obj) => {
    const iter = (object, acc) => {
      if (acc > allKeys.length - 1) {
        result.push('}');
        return (_.uniq(result).join('\n'));
      }

      const currentKey = allKeys[acc];

      if (_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
        if (obj1[currentKey] === obj2[currentKey]) {
          result.push(`    ${currentKey}: ${obj1[currentKey]}`);
        }
      }
      if (_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
        if (obj1[currentKey] !== obj2[currentKey]) {
          result.push(`  + ${currentKey}: ${obj2[currentKey]}`);
          result.push(`  - ${currentKey}: ${obj1[currentKey]}`);
        }
      }
      if (!_.has(obj1, currentKey) && _.has(obj2, currentKey)) {
        result.push(`  + ${currentKey}: ${obj2[currentKey]}`);
      }
      if (_.has(obj1, currentKey) && !_.has(obj2, currentKey)) {
        result.push(`  - ${currentKey}: ${obj1[currentKey]}`);
      }
      return iter(object, acc + 1);
    };
    return iter(obj, 0);
  };

  return (getDiff(obj1));
};
