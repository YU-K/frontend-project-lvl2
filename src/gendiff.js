#!/usr/bin/env node

import { extname } from 'path';
import makeAst from './ast';
import render from './formatters/index';
import { parseYml, parseJson, parseIni } from './parsers';

const gendiff = (file1, file2, format) => {
  let obj1;
  let obj2;

  const fileType = extname(file1);
  if (fileType === '.yml') {
    obj1 = parseYml(file1);
    obj2 = parseYml(file2);
  } else if (fileType === '.json') {
    obj1 = parseJson(file1);
    obj2 = parseJson(file2);
  } else if (fileType === '.ini') {
    obj1 = parseIni(file1);
    obj2 = parseIni(file2);
  }

  const ast = makeAst(obj1, obj2);
  const renderer = render(format);
  return renderer(ast);
};
export default gendiff;
