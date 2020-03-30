import { resolve } from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const result = ['{'];

export default (file1, file2) => {
  const pathToFile1 = resolve(process.cwd(), file1);
  const pathToFile2 = resolve(process.cwd(), file2);
  const firstFile = readFileSync(pathToFile1, 'utf8');
  const secondFile = readFileSync(pathToFile2, 'utf8');
  const obj1 = JSON.parse(firstFile);
  const obj2 = JSON.parse(secondFile);

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
