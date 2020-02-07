import { getFrequencies, getSortedKeys } from "../utils/Frequency";
import INode from "../trees/INode";
import { treeToDict } from "../trees/BinaryTree";

export function generateHuffmanTree(input: string) {
  const frequencies = getFrequencies(input);
  const sortedKeys = getSortedKeys(frequencies);

  const nodes: INode<string>[] = [];

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

export function encodeHuffman(input: string, tree: INode<string>) {
  let binary = "";

  const dict = treeToDict(tree);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    binary += dict[char];
  }

  return { binary, dict };
}

export function decodeHuffman(
  binary: string,
  codebyChar: { [char: string]: string }
) {
  let decoded = "";

  const charByCode = invertDict(codebyChar);

  while (binary.length > 0) {
    let curCode = "";
    let i = 0;
    do {
      curCode += binary[i];
      i++;
    } while (!(curCode in charByCode));
    binary = binary.slice(i, binary.length);
    decoded += charByCode[curCode];
  }
  return decoded;
}

export function invertDict(dict: any) {
  var ret: any = {};
  for (var key in dict) {
    ret[dict[key]] = key;
  }
  return ret;
}

export function deserializeBinary(serialized: string) {
  let binary = "";
  for (let i = 0; i < serialized.length; i++) {
    const charCode = serialized.charCodeAt(i);
    binary += ("0000000000000000" + charCode.toString(2)).substr(-16);
  }
  return binary;
}

export function deserializeTreeDict(lines: string[]) {
  const dict: { [code: string]: string } = {};
  for (let i = 0; i < lines.length; i++) {
    const [binary, char] = lines[i].split("|");
    dict[binary] = char;
  }
  return dict;
}
