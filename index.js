const _ = require('lodash');

// const buildCallExpression = (j, expression, args) => {
//   const callee = expression.callee;
//   if (callee.property.name === 'bind') {
//     return j.callExpression({ callee: callee.object, arguments: args });
//   }
// };

const buildAwaitExpression = j => (yi) => {
  let argument = yi.value.argument;
  const coroutineYield = _.get(argument, 'callee');
  if (coroutineYield && coroutineYield.callee) {
    const prom = coroutineYield.callee.object;
    const cor = coroutineYield.callee.property;
    if (prom && cor && prom.name === 'Promise' && cor.name === 'coroutine') {
      const coroutined = coroutineYield.arguments[0];
      let memberExpression;
      if (coroutined.callee) {
        const object = coroutined.callee.object;
        const property = coroutined.callee.property;
        if (object.type === 'MemberExpression') {
          if (object.object.type === 'ThisExpression') {
            memberExpression = j.memberExpression(
              j.identifier('this'),
              j.identifier(object.property.name),
            );
          } else if (!object.object.type === 'MemberExpression') {
            memberExpression = j.memberExpression(
              j.identifier(object.object.name),
              j.identifier(object.property.name),
            );
          } else {
            memberExpression = object.object;
          }
        } else if (property.name !== 'bind') {
          memberExpression = j.memberExpression(
            j.identifier(object.name),
            j.identifier(property.name),
          );
        } else {
          memberExpression = j.identifier(object.name);
        }
        argument = j.callExpression(memberExpression, argument.arguments);
      } else if (coroutined.type === 'Identifier') {
        memberExpression = j.identifier(coroutined.name);
      } else {
        const object = coroutined.object;
        const property = coroutined.property;
        if (object.type === 'MemberExpression') {
          memberExpression = j.memberExpression(
            j.identifier(object.object.name),
            j.identifier(object.property.name),
          );
        } else {
          memberExpression = j.memberExpression(
            j.identifier(object.name),
            j.identifier(property.name),
          );
        }
        argument = j.callExpression(memberExpression, argument.arguments);
      }
    }
  }
  const awaitExpression = j.awaitExpression(argument);
  return awaitExpression;
};

const transformToAsyncAwait = j => (p) => {
  j(p)
    .find(j.YieldExpression)
    .forEach((yi) => {
      j(yi).replaceWith(buildAwaitExpression(j));
    });
  p.node.generator = false;
  p.node.async = true;
  return p;
};

const transformToSimpleCall = p => p.node.arguments[0];

module.exports = function(file, api, options) {
    const j = api.jscodeshift;
	const root = j(file.source);
    // remove all "use strict" statements
    // root.find(j.FunctionDeclaration, { kind: 'var' })
	root.find(j.FunctionDeclaration, { generator: true }).forEach(transformToAsyncAwait(j));
    root.find(j.FunctionExpression, { generator: true }).forEach(transformToAsyncAwait(j));
    root.find(j.MethodDefinition, { generator: true }).forEach(transformToAsyncAwait(j));
    root
    .find(j.CallExpression, {
      callee: { object: { name: 'Promise' }, property: { name: 'coroutine' } },
    })
    .replaceWith(transformToSimpleCall);
	return root.toSource();
};