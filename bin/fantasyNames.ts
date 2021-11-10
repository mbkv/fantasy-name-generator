import fs from "fs/promises";
import { join } from "path";

function* chunkArray<T>(arr: T[], chunkSize: number) {
  let start = 0;
  while (arr.length > start) {
    yield arr.slice(start, start + chunkSize);
    start += chunkSize;
  }
}

const reverseString = (s: string) => [...s].reverse().join("");

const getDictionaries = async () => {
  const dictStore = "/usr/share/dict";
  const files = await fs.readdir("/usr/share/dict");
  return files
    .filter((el) => !el.toLowerCase().includes("readme"))
    .map((file) => join(dictStore, file));
};

const getWordList = async (filenames: string[], maxLength = 14) => {
  const dictionaryBuffers = await Promise.all(
    filenames.map((dict) => fs.readFile(dict))
  );
  const wordList = ([] as string[]).concat(
    ...dictionaryBuffers.map((buffer) => buffer.toString().split("\n"))
  );
  return new Set(
    wordList
      .filter((word) => word.length < maxLength)
      .map((word) => word.toLowerCase())
      .map((word) => [...word].filter((letter) => letter !== "'").join(""))
  );
};

const main = async (files: string[]) => {
  const list = await getWordList(files.length ? files : (await getDictionaries()));

  for (const chunk of chunkArray([...list], 1000)) {
    const names = [...chunk]
      .map((word) => reverseString(word) + " " + word);
    console.log(names.join("\n"));
  }
};

main(process.argv.slice(2));
