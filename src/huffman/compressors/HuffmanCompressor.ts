import ICompressor from "./ICompressor";
import { generateHuffmanTree, encodeHuffman, decodeHuffman } from "../Huffman";

export default class HuffmanCompressor implements ICompressor {
  name: string = "HUFFMAN";

  compress(input: string) {
    const t = generateHuffmanTree(input);
    const s = encodeHuffman(input, t);
    return s.binary;
  }

  decompress(input: string) {
    const lines = input.split("\n");
    const huffmanCode = lines.splice(0, 1)[0];
    const dictLines = lines;
    return input;
  }
}
