import path from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathToJsonFile1 = getFixturePath('before.json');
const pathToJsonFile2 = getFixturePath('after.json');
const pathToYmlFile1 = getFixturePath('before.yml');
const pathToYmlFile2 = getFixturePath('after.yml');
const pathToIniFile1 = getFixturePath('before.ini');
const pathToIniFile2 = getFixturePath('after.ini');

const pathToJsonRecursFile1 = getFixturePath('before_r.json');
const pathToJsonRecursFile2 = getFixturePath('after_r.json');

const pathToCorrectPretty = getFixturePath('correctPrettyFormat.txt');
const pathToCorrectJsonRecursive = getFixturePath('correctTreeFormat.txt');
const pathToCorrectPlain = getFixturePath('correctPlainOutput.txt');
const pathToCorrectJson = getFixturePath('correctJsonFormat.txt');

const correctPlainFormat = readFileSync(pathToCorrectPlain, 'utf8');
const correctTreeFormat = readFileSync(pathToCorrectJsonRecursive, 'utf8');
const correctPrettyFormat = readFileSync(pathToCorrectPretty, 'utf8');
const correctJsonFormat = readFileSync(pathToCorrectJson, 'utf8');

describe('compare two files', () => {
  test.each([
    [pathToJsonFile1, pathToJsonFile2],
    [pathToYmlFile1, pathToYmlFile2],
    [pathToIniFile1, pathToIniFile2],
  ])('in Pretty format (json, yml, ini)', (a, b) => {
    const result = gendiff(a, b, 'tree');
    expect(result).toEqual(correctPrettyFormat.trim());
  });
  test.each([
    [pathToJsonRecursFile1, pathToJsonRecursFile2],
  ])('recursivly', (a, b) => {
    const result = gendiff(a, b, 'tree');
    expect(result).toEqual(correctTreeFormat.trim());
  });
  test.each([
    [pathToJsonRecursFile1, pathToJsonRecursFile2],
  ])('in plain format', (a, b) => {
    const result = gendiff(a, b, 'plain');
    expect(result).toEqual(correctPlainFormat);
  });
  test.each([
    [pathToJsonRecursFile1, pathToJsonRecursFile2],
  ])('in json format', (a, b) => {
    const result = gendiff(a, b, 'json');
    expect(result).toEqual(correctJsonFormat.trim());
  });
});
