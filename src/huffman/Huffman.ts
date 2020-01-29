import { getFrequencies, getSortedKeys } from "../utils/Frequency";
import INode from "../trees/INode";
import { treeToDict } from "../trees/BinaryTree";
import { writeFileSync } from "fs";
import { deserialize } from "v8";

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

export function serializeHuffmanTree(input: string, tree: INode<string>) {
  let binaryString = "";

  const dict = treeToDict(tree);

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    binaryString += dict[char];
  }

  let binaries: string[] = [];

  for (let i = 0; i < binaryString.length; i += 16) {
    binaries.push(binaryString.substr(i, 16));
  }

  let utf8code = "";

  for (let i = 0; i < binaries.length; i++) {
    const binary = binaries[i];
    utf8code += String.fromCharCode(parseInt(binary, 2));
  }

  let serializedDict = "";

  const entries = Object.entries(dict);

  for (let i = 0; i < entries.length; i++) {
    const [char, code] = entries[i];
    serializedDict += code + "|" + char;
    if (i !== entries.length - 1) serializedDict += "\n";
  }

  return utf8code + "\n" + serializedDict;
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

export function deserializeWithCodeAndDict(code: string, dict: string) {
  code;
}
