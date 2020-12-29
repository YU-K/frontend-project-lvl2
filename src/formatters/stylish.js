import _ from 'lodash';

export default (ast) => {
  const doIndent = (depth) => '  '.repeat(depth);

  const stringify = (node, depth) => {
    if (!_.isObject(node)) {
      return `${node}`;
    }
    const pairs = _.toPairs(node);
    const newNode = pairs.map((pair) => {
      const [key, value] = pair;
      if (!_.isObject(value)) {
        return `      ${doIndent(depth)}  ${key}: ${value}`;
      }
      return `      ${doIndent(depth)}  ${key}: ${stringify(value, depth + 2)}`;
    });

    return `{\n${newNode.join('\n')}\n    ${doIndent(depth)}}`;
  };

  const iter = (tree, depth) => {
    const nodes = tree.map((node) => {
      const {
        key, value, after, before, children, type,
      } = node;

      switch (type) {
        case 'updated':
          return `  ${doIndent(depth)}- ${key}: ${stringify(before, depth)}\n  ${doIndent(depth)}+ ${key}: ${stringify(after, depth)}`;
        case 'added':
          return `  ${doIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'removed':
          return `  ${doIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'same':
          return `  ${doIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          return `    ${doIndent(depth)}${key}: {\n${iter(children, depth + 2)}\n    ${doIndent(depth)}}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });

    return nodes.join('\n');
  };

  return `{\n${iter(ast, 0)}\n}`;
};
