import tree from './tree';
import plain from './plain';

const render = (format) => {
  if (format === 'tree') {
    return tree;
  }
  if (format === 'plain') {
    return plain;
  }
  return 'Unknown format';
};
export default render;
