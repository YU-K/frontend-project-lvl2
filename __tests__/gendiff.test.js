
import gendiff from '../src/gendiff';

const file1 = `${__dirname}/../__fixtures__/before.json`;
const file2 = `${__dirname}/../__fixtures__/after.json`;

test('gendiff output is a string ', () => {
  expect(typeof gendiff(file1, file2)).toBe('string');
});
test('gendiff', () => {
  expect(gendiff(file1, file2)).toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});
