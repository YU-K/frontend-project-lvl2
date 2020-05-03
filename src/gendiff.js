#!/usr/bin/env node

import { extname } from 'path';
import makeAst from './ast';
import render from './render';
import { parseYml, parseJson, parseIni } from './parsers';

const gendiff = (file1, file2) => {
  let obj1;
  let obj2;

  const format = extname(file1);
  if (format === '.yml') {
    obj1 = parseYml(file1);
    obj2 = parseYml(file2);
  } else if (format === '.json') {
    obj1 = parseJson(file1);
    obj2 = parseJson(file2);
  } else if (format === '.ini') {
    obj1 = parseIni(file1);
    obj2 = parseIni(file2);
  }

  const ast = makeAst(obj1, obj2);
  return `{\n${render(ast)}}`;
};
export default gendiff;

// const ast = makeAst('before_r.json', 'after_r.json');
// const ast = makeAst('before.json', 'after.json');
// const ast = makeAst('before.yml', 'after.yml');
// const ast = makeAst('before.ini', 'after.ini');

// console.log(`{\n${render(ast)}}`);
