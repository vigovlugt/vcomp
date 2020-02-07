export default interface ICompressor {
  name: string;
  compress(input: string): string;
  decompress(input: string): string;
}
