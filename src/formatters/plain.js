import _ from 'lodash';

export default (ast) => {
  const stringify = (node) => {
    const valuesWithoutQuotes = [true, false, null];
    if (_.includes(valuesWithoutQuotes, node)) {
      return `${node}`;
    }
    if (_.isObject(node)) {
      return '[complex value]';
    }
    return `'${node}'`;
  };

  const iter = (tree, ancestry) => {
    const nodes = tree.map((node) => {
      const {
        key, value, status, after, before, children,
      } = node;
      const newAncestry = `${ancestry}${key}`;
      if (status === 'updated') {
        return `\nProperty '${newAncestry}' was updated. From ${stringify(before)} to ${stringify(after)}`;
      }
      if (status === 'removed') {
        return `\nProperty '${newAncestry}' was removed`;
      }
      if (status === 'added') {
        return `\nProperty '${newAncestry}' was added with value: ${stringify(value)}`;
      }
      if (!children) {
        return '';
      }
      return iter(children, `${newAncestry}.`);
    });
    return nodes.join('');
  };

  return `${iter(ast, '')}\n`;
};
