import {
  generateHuffmanTree,
  encodeHuffman,
  decodeHuffman
} from "./huffman/Huffman";
import { readFileSync } from "fs";
import { join } from "path";

function main(input: string) {
  console.log("INPUT SIZE:", input.length);
  const t = generateHuffmanTree(input);
  const s = encodeHuffman(input, t);
  console.log("ENCODED SIZE:", Math.ceil(s.binary.length / 8));
  const decoded = decodeHuffman(s.binary, s.dict);
  console.log("VALID:", decoded == input);
}

main(
  readFileSync(join(__dirname, "..", "texts", "huffmanWiki.txt")).toString()
);
