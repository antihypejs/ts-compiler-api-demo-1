import ts from 'typescript'

export const transformer: ts.TransformerFactory<ts.SourceFile> = (context: ts.TransformationContext) => {
  return (sourceFile) => {
    const visit = (node: ts.Node): ts.Node => {
      if (ts.isVariableDeclaration(node) && node.initializer && ts.isStringLiteral(node.initializer) && node.initializer.text === 'test') {
        return context.factory.updateVariableDeclaration(
          node,
          node.name,
          node.exclamationToken,
          node.type,
          context.factory.createStringLiteral(`${node.initializer.text}_${Math.random()}`)
        )
      }

      return ts.visitEachChild(node, visit, context)
    }

    return ts.visitNode(sourceFile, visit)
  }
}
