import ICompressor from "./huffman/compressors/ICompressor";

function testCompressor(compressor: ICompressor) {
  test(compressor.name, () => {
    testInput("abc", "abcdefghijklmnopqrstuvw", compressor);
  });
}

function testInput(testName: string, input: string, compressor: ICompressor) {
  const compressionStart = new Date().getMilliseconds();
  const compressed = compressor.compress(input);
  const compressionTime = new Date().getMilliseconds() - compressionStart;

  const decompressionStart = new Date().getMilliseconds();
  const decompressed = compressor.decompress(compressed);
  const decompressTime = new Date().getMilliseconds() - decompressionStart;

  console.log("Compress: ", compressionTime);
  console.log("Decompress: ", decompressTime);

  expect(decompressed).toBe(input);
}
