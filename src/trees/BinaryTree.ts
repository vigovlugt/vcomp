import INode from "./INode";

export function treeToDict(tree: INode<any>) {
  return getTreeRecursive("", tree);
}

function getTreeRecursive(baseCode: string, treePart: INode<string>) {
  let dict: { [char: string]: string } = {};
  if (treePart.data) {
    dict[treePart.data] = baseCode;
  } else {
    if (treePart.right) {
      dict = {
        ...dict,
        ...getTreeRecursive(baseCode + "0", treePart.right)
      };
    }
    if (treePart.left) {
      dict = {
        ...dict,
        ...getTreeRecursive(baseCode + "1", treePart.left)
      };
    }
  }
  return dict;
}
