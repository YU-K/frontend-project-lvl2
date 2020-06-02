import { safeLoad } from 'js-yaml';

import { parse } from 'ini';

export const parseYml = (content) => safeLoad(content);
export const parseJson = (content) => JSON.parse(content);
export const parseIni = (content) => parse(content);
