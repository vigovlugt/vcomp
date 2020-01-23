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
    while (!foundIndex && nodes.length > newIndex) {
      if (nodes[newIndex].size >= newNode.size) {
        newIndex++;
      } else {
        foundIndex = true;
      }
    }

    nodes.splice(newIndex, 0, newNode);
  }

  return nodes[0];
}

export function serializeHuffmanTree(input: string, tree: IHuffmanNode) {
  let serialized = "";

  const dict = getHuffmanDict(tree);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    serialized += dict[char];
  }

  serialized += "\n";
  const entries = Object.entries(dict);

  for (let i = 0; i < entries.length; i++) {
    const [char, code] = entries[i];
    serialized += code + "|" + char;
    if (i !== entries.length - 1) serialized += "\n";
  }

  return serialized;
}

export function getHuffmanDict(tree: IHuffmanNode) {
  return getHuffmanDictRecursive("", tree);
}

function getHuffmanDictRecursive(baseCode: string, treePart: IHuffmanNode) {
  let dict: { [char: string]: string } = {};
  if (treePart.data) {
    dict[treePart.data] = baseCode;
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

const i = "this is an example of a huffman tree";
const t = generateHuffmanTree(i);
const s = serializeHuffmanTree(i, t);

console.log(s);
