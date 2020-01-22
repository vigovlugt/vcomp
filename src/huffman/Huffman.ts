import { getFrequencies, getSortedKeys } from "../utils/Frequency";

interface IHuffmanNode {
  data?: string;
  right?: IHuffmanNode;
  left?: IHuffmanNode;
  size: number;
}

export function generateHuffmanTree(input: string) {
  const frequencies = getFrequencies(input);
  const sortedKeys = getSortedKeys(frequencies);

  const nodes: IHuffmanNode[] = [];

  for (let i = 0; i < sortedKeys.length; i++) {
    const char = sortedKeys[i];
    nodes.push({ data: char, size: frequencies[char] });
  }

  while (nodes.length > 1) {
    const right = nodes[nodes.length - 1];
    const left = nodes[nodes.length - 2];
    nodes.splice(nodes.length - 2, 2);

    const newNode = { size: right.size + left.size, left, right };

    let newIndex = 0;
    let foundIndex = false;
    while (!foundIndex && nodes.length <= newIndex) {
      if (nodes[newIndex].size >= newNode.size) {
        newIndex++;
      } else {
        foundIndex = true;
      }
    }

    nodes.splice(newIndex, 0, newNode);
  }

  const tree: IHuffmanNode = createTreeRecursive(nodes) as IHuffmanNode;
  return tree;
}

export function getHuffmanDict(tree: IHuffmanNode) {
  return getHuffmanDictRecursive("", tree);
}

function getHuffmanDictRecursive(baseCode: string, treePart: IHuffmanNode) {
  let dict: { [char: string]: string } = {};
  if (treePart.data) {
    dict[baseCode] = treePart.data;
  } else {
    if (treePart.right) {
      dict = {
        ...dict,
        ...getHuffmanDictRecursive(baseCode + "0", treePart.right)
      };
    }
    if (treePart.left) {
      dict = {
        ...dict,
        ...getHuffmanDictRecursive(baseCode + "1", treePart.left)
      };
    }
  }
  return dict;
}

const t = generateHuffmanTree("this is an example of a huffman tree");

console.log(JSON.stringify(getHuffmanDict(t), null, 2));
