import _ from 'lodash';


const makeAst = (data1, data2) => {
  const keys = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.union(keys, keys2).sort();
  const ast = allKeys.map((key) => {
    const data1Value = data1[key];
    const data2Value = data2[key];

    if (!_.has(data1, key)) {
      return {
        key, value: data2Value, status: 'added', type: 'hasNoNested',
      };
    }

    if (!_.has(data2, key)) {
      return {
        key, value: data1Value, status: 'removed', type: 'hasNoNested',
      };
    }

    if (_.isObject(data1Value) && _.isObject(data2Value)) {
      return {
        key,
        children: makeAst(data1Value, data2Value),
        type: 'hasNested',
      };
    }

    if (data1Value !== data2Value) {
      return {
        key, before: data1Value, after: data2Value, status: 'updated', type: 'hasNoNested',
      };
    }
    return {
      key, value: data1Value, status: 'same', type: 'hasNoNested',
    };
  });
  return ast;
};
export default makeAst;
