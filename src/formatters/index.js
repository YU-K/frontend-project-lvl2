import tree from './tree';
import plain from './plain';
import json from './json';

const render = (format) => {
  if (format === 'tree') {
    return tree;
  }
  if (format === 'plain') {
    return plain;
  }
  if (format === 'json') {
    return json;
  }

  return 'Unknown format';
};
export default render;
