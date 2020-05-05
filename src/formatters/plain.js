// export default (ast) => JSON.stringify(ast, null, 2);
// export default (ast) => JSON.stringify(ast, null, 2);

export default (ast) => {
  const stringify = (node) => {
    if (typeof node === 'object') {
      return '[complex value]';
    }
    return `${node}`;
  };

  const iter = (tree, ancestry) => {
    const nodes = tree.map((node) => {
      const {
        key, value, status, after, before, children,
      } = node;
      const newAncestry = `${ancestry}${key}`;
      if (status === 'updated') {
        return `Property '${newAncestry}' was changed from ${stringify(before)} to ${stringify(after)}\n`;
      }
      if (status === '-') {
        return `Property '${newAncestry}' was deleted\n`;
      }
      if (status === '+') {
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
