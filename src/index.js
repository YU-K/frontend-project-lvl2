#!/usr/bin/env node

import { extname } from 'path';
import { readFileSync } from 'fs';
import makeAst from './ast';
import render from './formatters/index';
import { parseYml, parseJson, parseIni } from './parsers';

const gendiff = (file1, file2, format) => {
  const contentFile1 = readFileSync(file1);
  const contentFile2 = readFileSync(file2);

  let obj1;
  let obj2;

  const fileType = extname(file1);
  if (fileType === '.yml') {
    obj1 = parseYml(contentFile1);
    obj2 = parseYml(contentFile2);
  } else if (fileType === '.json') {
    obj1 = parseJson(contentFile1);
    obj2 = parseJson(contentFile2);
  } else if (fileType === '.ini') {
    obj1 = parseIni(contentFile1);
    obj2 = parseIni(contentFile2);
  }

  const ast = makeAst(obj1, obj2);
  const renderer = render(format);
  return renderer(ast);
};
export default gendiff;
