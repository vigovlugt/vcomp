import ICompressor from "./ICompressor";
import { generateHuffmanTree, serializeHuffmanTree } from "../huffman/Huffman";

export default class HuffmanCompressor implements ICompressor {
  name: string = "HUFFMAN";

  compress(input: string) {
    const t = generateHuffmanTree(input);
    const s = serializeHuffmanTree(input, t);
    return s;
  }

  decompress(input: string) {
    const lines = input.split("\n");
    const huffmanCode = lines.splice(0, 1)[0];
    const dictLines = lines;
    return input;
  }
}
