import _ from 'lodash';

export default (ast) => {
  const doIndent = (depth) => '  '.repeat(depth);

  const stringify = (node, depth = 0) => {
    if (node === '') {
      return '';
    }
    if (_.isObject(node)) {
      const pairs = _.toPairs(node);
      const newNode = pairs.map((pair) => {
        const nodes = [];
        const [key, value] = pair;
        if (!_.isObject(value)) {
          nodes.push(`${doIndent(depth + 2)}  ${key}: ${value}\n`);
        }
        if (_.isObject(value)) {
          nodes.push(`${doIndent(depth + 2)}  ${key}:${stringify(value, depth + 2)}\n`);
        }
        return nodes;
      });
      return ` {\n${newNode.join('')}${doIndent(depth + 1)}}`;
    }
    return ` ${node}`;
  };

  const iter = (tree, depth) => {
    const nodes = tree.map((node) => {
      const {
        key, value, status, after, before, children,
      } = node;

      if (!children) {
        switch (status) {
          case 'updated':
            return `${doIndent(depth)}- ${key}:${stringify(before, depth)}\n${doIndent(depth)}+ ${key}:${stringify(after, depth)}\n`;
          case 'added':
            return `${doIndent(depth)}+ ${key}:${stringify(value, depth)}\n`;
          case 'removed':
            return `${doIndent(depth)}- ${key}:${stringify(value, depth)}\n`;
          default:
            return `${doIndent(depth)}  ${key}:${stringify(value, depth)}\n`;
        }
      }
      return `${doIndent(depth)}  ${key}: {\n${iter(children, depth + 2)}${doIndent(depth + 1)}}\n`;
    });

    return nodes.join('');
  };

  return `{\n${iter(ast, 1)}}\n`;
};
