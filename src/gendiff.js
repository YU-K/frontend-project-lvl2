#!/usr/bin/env node

import { extname } from 'path';
import { readFileSync } from 'fs';
import makeAst from './ast';
import getFormatter from './formatters/index';
import { parseYml, parseJson, parseIni } from './parsers';

const gendiff = (filepath1, filepath2, format) => {
  const contentFile1 = readFileSync(filepath1);
  const contentFile2 = readFileSync(filepath2);
  const fileType = extname(filepath1);
  let parse;

  switch (fileType) {
    case '.yml':
      parse = parseYml;
      break;
    case '.json':
      parse = parseJson;
      break;
    case '.ini':
      parse = parseIni;
      break;
    default:
      throw new Error(`Unknown file extension: ${fileType}!`);
  }

  const obj1 = parse(contentFile1);
  const obj2 = parse(contentFile2);

  const ast = makeAst(obj1, obj2);
  const formatter = getFormatter(format);
  const render = () => formatter(ast);
  return render(ast);
};
export default gendiff;
