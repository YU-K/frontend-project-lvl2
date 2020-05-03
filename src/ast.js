import _ from 'lodash';


const makeAst = (data1, data2) => {
  const keys = Object.keys(data1);
  keys.push(Object.keys(data2));
  const allKeys = _.union(_.flatten(keys));


  const ast = allKeys.map((key) => {
    const data1Value = data1[key];
    const data2Value = data2[key];

    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: data2Value, status: '+' };
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: data1Value, status: '-' };
    }

    if (_.isObject(data1Value) && _.isObject(data2Value)) {
      return {
        key,
        children: makeAst(data1Value, data2Value),
        status: '  ',
      };
    }

    if (_.has(data1, key) && _.has(data2, key)
      && data1Value !== data2Value) {
      return {
        key, before: data1Value, after: data2Value, status: 'updated',
      };
    }

    if (data1Value === data2Value) {
      return { key, value: data1Value, status: ' ' };
    }
  });
  return ast;
};
export default makeAst;
