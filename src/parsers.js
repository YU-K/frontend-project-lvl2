import { safeLoad } from 'js-yaml';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export const parseYml = (filename) => {
  const pathToFile = resolve(process.cwd(), filename);
  const content = readFileSync(pathToFile, 'utf8');
  return safeLoad(content);
};

export const parseJson = (filename) => {
  const pathToFile = resolve(process.cwd(), filename);
  const content = readFileSync(pathToFile, 'utf8');
  return JSON.parse(content);
};
