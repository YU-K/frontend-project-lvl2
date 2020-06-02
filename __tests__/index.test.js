import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const correctPlainFormat = readFileSync(getFixturePath('correctPlainOutput.txt'), 'utf8');
const correctTreeFormat = readFileSync(getFixturePath('correctTreeFormat.txt'), 'utf8').trim();
const correctJsonFormat = readFileSync(getFixturePath('correctJsonFormat.txt'), 'utf8').trim();

describe('compare two files', () => {
  const pathToJsonRecursFile2 = getFixturePath('after_r.json');
  const pathToJsonRecursFile1 = getFixturePath('before_r.json');

  test.each([
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctTreeFormat, 'tree'],
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctPlainFormat, 'plain'],
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctJsonFormat, 'json'],
  ])('recursivly', (a, b, expected, format) => {
    const result = gendiff(a, b, format);
    expect(result).toEqual(expected);
  });
});
