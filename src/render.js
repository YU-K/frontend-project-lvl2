const indent = (depth) => ' '.repeat(depth);

const stringify = (node, depth) => {
  if (typeof node === 'object') {
    const entries = Object.entries(node).flat();
    const [objKey, objVal] = entries;
    return `{\n${indent(depth * 2)}${objKey}: ${objVal}\n${indent(depth)}}`;
  }
  return `${node}`;
};
const render = (ast) => {
  const iter = (tree, depth) => {
    const nodes = tree.map((node) => {
      const {
        key, value, status, after, before, children,
      } = node;
      if (status === 'updated') {
        return `${indent(depth)}- ${key}: ${stringify(before, depth + 2)}\n${indent(depth)}+ ${key}: ${stringify(after, depth + 2)}\n`;
      }
      if (!children) {
        return `${indent(depth)}${status} ${key}: ${stringify(value, depth + 2)}\n`;
      }

      return `${indent(depth)}${status}${key}: {\n${iter(children, depth + 4)}${indent(depth + 2)}}\n`;
    });
    return nodes.join('');
  };

  return iter(ast, 2);
};


export default render;
