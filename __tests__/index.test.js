import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('compare two', () => {
  test.each([
    ['json', 'plain'],
    ['yml', 'json'],
    ['ini', 'stylish'],
  ])('%s files in %s format', (fileType, format) => {
    const filePath1 = getFixturePath(`before_r.${fileType}`);
    const filePath2 = getFixturePath(`after_r.${fileType}`);
    const expected = readFileSync(getFixturePath(`${format}.txt`), 'utf8');
    const result = gendiff(filePath1, filePath2, format);
    expect(result).toEqual(expected);
  });
});
