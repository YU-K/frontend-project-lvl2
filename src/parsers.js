import { safeLoad } from 'js-yaml';
import { parse as parseIni } from 'ini';

export default (extension) => {
  switch (extension) {
    case '.yml':
      return safeLoad;
    case '.json':
      return JSON.parse;
    case '.ini':
      return parseIni;
    default:
      throw new Error(`Unknown file extension: ${extension}!`);
  }
};
