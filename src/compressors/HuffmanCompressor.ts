import ICompressor from "./ICompressor";
import { generateHuffmanTree, serializeHuffmanTree } from "../huffman/Huffman";

export default class HuffmanCompressor implements ICompressor {
  name: string = "HUFFMAN";

  compress(input: string) {
    const i = "this is an example of a huffman tree";
    const t = generateHuffmanTree(i);
    const s = serializeHuffmanTree(i, t);
    return s;
  }

  decompress(input: string) {
    const lines = input.split("\n");
    const huffmanCode = lines.splice(0, 1)[0];
    const dictLines = lines;
    return input;
  }
}
