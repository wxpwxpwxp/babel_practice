const generator = require('@babel/generator');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const types = require('@babel/types');

function compile(code) {
  const ast = parser.parse(code, {
    sourceType: 'module'
  });

  console.dir(ast, {depth: null});

  traverse.default(ast, {
    CallExpression(path) {
      const { node } = path;
      const {callee} = node;
      const isRefExpression = types.isCallExpression(node)
        && callee.name === 'ref';
      if (isRefExpression) {
        const variableDeclarationParent = path.findParent(p => p.isVariableDeclaration());
        if (variableDeclarationParent.node.kind !== 'const') {
          console.error('should be const');
          variableDeclarationParent.node.kind = 'const';
        }

        if (!/.*Ref$/.test(variableDeclarationParent.node.declarations[0].id.name)) {
          console.error('identifierName should be ends with Ref');
          variableDeclarationParent.node.declarations[0].id.name += 'Ref';
          variableDeclarationParent.node.declarations[0].id.loc.identifierName += 'Ref';
        }
      }
    }
  });

  return generator.default(ast, {}, code);
}

module.exports.compile = compile;
