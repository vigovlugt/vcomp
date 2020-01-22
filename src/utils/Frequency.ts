export function getFrequencies(input: string) {
  const frequencyDict: { [char: string]: number } = {};

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (frequencyDict[char] !== undefined) {
      frequencyDict[char]++;
    } else {
      frequencyDict[char] = 1;
    }
  }
  return frequencyDict;
}

export function getSortedKeys(frequencies: { [char: string]: number }) {
  const uniques: string[] = [];

  for (const value in frequencies) {
    uniques.push(value);
  }

  const sorted = uniques.sort((a, b) => frequencies[b] - frequencies[a]);
  return sorted;
}
