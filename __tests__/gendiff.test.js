
import gendiff from '../src/gendiff';
import { parseYml, parseJson, parseIni } from '../src/parsers';


const json1 = `${__dirname}/../__fixtures__/before.json`;
const json2 = `${__dirname}/../__fixtures__/after.json`;
const yml1 = `${__dirname}/../__fixtures__/before.yml`;
const yml2 = `${__dirname}/../__fixtures__/after.yml`;
const ini1 = `${__dirname}/../__fixtures__/before.ini`;
const ini2 = `${__dirname}/../__fixtures__/after.ini`;

const objFromYml = parseYml(yml1);
const objFromJson = parseJson(json1);
const objFromIni = parseIni(ini1);

test('gendiff output of two json files must be a string', () => {
  expect(typeof gendiff(json1, json2)).toBe('string');
});

test('gendiff output of two yaml files must be a string', () => {
  expect(typeof gendiff(yml1, yml2)).toBe('string');
});

test('gendiff output of two ini files must be a string', () => {
  expect(typeof gendiff(ini1, ini2)).toBe('string');
});

test('gendiff output of two files is correct ', () => {
  expect(gendiff(json1, json2)).toEqual(`{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
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