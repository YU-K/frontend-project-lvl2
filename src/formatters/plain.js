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
        return `Property '${newAncestry}' was updated. From ${stringify(before)} to ${stringify(after)}\n`;
      }
      if (status === 'removed') {
        return `Property '${newAncestry}' was removed\n`;
      }
      if (status === 'added') {
        return `Property '${newAncestry}' was added with value: ${stringify(value)}\n`;
      }
      if (!children) {
        return '';
      }
      return iter(children, `${newAncestry}.`);
    });
    return nodes.join('');
  };

  return `\n${iter(ast, '')}`;
};
