import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const correctPlain = readFileSync(getFixturePath('correctPlain.txt'), 'utf8');
const correctStylish = readFileSync(getFixturePath('correctStylish.txt'), 'utf8').trim();
const correctJson = readFileSync(getFixturePath('correctJson.txt'), 'utf8').trim();


describe('compare two files', () => {
  const pathToJsonRecursFile2 = getFixturePath('after_r.json');
  const pathToJsonRecursFile1 = getFixturePath('before_r.json');

  test.each([
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctStylish, 'stylish'],
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctPlain, 'plain'],
    [pathToJsonRecursFile1, pathToJsonRecursFile2, correctJson, 'json'],
  ])('recursivly', (a, b, expected, format) => {
    const result = gendiff(a, b, format);
    expect(result).toEqual(expected);
  });
});
