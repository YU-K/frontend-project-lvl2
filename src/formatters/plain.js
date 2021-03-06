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
        key, value, after, before, children, type,
      } = node;

      const newAncestry = `${ancestry}${key}`;

      switch (type) {
        case 'same':
          return '';
        case 'updated':
          return `Property '${newAncestry}' was updated. From ${stringify(before)} to ${stringify(after)}`;
        case 'removed':
          return `Property '${newAncestry}' was removed`;
        case 'added':
          return `Property '${newAncestry}' was added with value: ${stringify(value)}`;
        case 'nested':
          return iter(children, `${newAncestry}.`);
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return nodes.filter((str) => str !== '').join('\n');
  };

  return `${iter(ast, '')}`;
};
