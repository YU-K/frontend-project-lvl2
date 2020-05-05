
import path from 'path';
import gendiff from '../src/gendiff';
import { parseYml, parseJson, parseIni } from '../src/parsers';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const json1 = getFixturePath('before.json');
const json2 = getFixturePath('after.json');
const yml1 = getFixturePath('before.yml');
const yml2 = getFixturePath('after.yml');
const ini1 = getFixturePath('before.ini');
const ini2 = getFixturePath('after.ini');

const objFromYml = parseYml(yml1);
const objFromJson = parseJson(json1);
const objFromIni = parseIni(ini1);

const jsonRecursive1 = getFixturePath('before_r.json');
const jsonRecursive2 = getFixturePath('after_r.json');

test('gendiff output of two json files must be a string', () => {
  expect(typeof gendiff(json1, json2, 'tree')).toBe('string');
});

test('gendiff output of two yaml files must be a string', () => {
  expect(typeof gendiff(yml1, yml2, 'tree')).toBe('string');
});

test('gendiff output of two ini files must be a string', () => {
  expect(typeof gendiff(ini1, ini2, 'tree')).toBe('string');
});

test('gendiff output of two files is correct ', () => {
  expect(gendiff(json1, json2, 'tree')).toEqual(`{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`);
});

test('parseYml() returns an object', () => {
  expect(objFromYml.host).toBe('hexlet.io');
});

test('parseJson() returns an object', () => {
  expect(objFromJson.proxy).toBe('123.234.53.22');
});

test('parseIni() returns an object', () => {
  expect(objFromIni.timeout).toBe('50');
});


test('plain format of recursive comparison  ', () => {
  expect(gendiff(jsonRecursive1, jsonRecursive2, 'plain'))
    .toEqual("\nProperty 'common.setting1' was changed from Value 1 to Value 2\n");
});
