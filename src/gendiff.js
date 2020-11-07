#!/usr/bin/env node

import { extname } from 'path';
import { readFileSync } from 'fs';
import makeAst from './ast';
import getFormatter from './formatters/index';
import getParser from './parsers';

const gendiff = (filepath1, filepath2, format) => {
  const content1 = readFileSync(filepath1);
  const content2 = readFileSync(filepath2);
  const fileType = extname(filepath1);
  const parse = getParser(fileType);

  const obj1 = parse(content1);
  const obj2 = parse(content2);

  const ast = makeAst(obj1, obj2);
  const render = getFormatter(format);
  return render(ast);
};
export default gendiff;
